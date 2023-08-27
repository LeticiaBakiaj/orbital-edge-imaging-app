import React, { useCallback, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./InteractiveMap.css";
import qs from "qs";

import MapView from "../../components/map/Map";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../../components/header/Header";
import UploadFile from "../../components/leftSideContainer/UploadFile";
import Filters from "../../components/leftSideContainer/Filters";
import { client_id, client_secret } from "../../components/credentials";
import Footer from "../../components/footer/Footer";
import { toast } from "react-toastify";

const InteractiveMap = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [loginData, setLoginData] = useState("");
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  const handleFileUpload = async (event) => {
    setLoading(true);

    const file = event.target.files[0];
    if (file && file.name.includes(".geojson")) {
      try {
        const fileContent = await file.text();
        const parsedGeojson = JSON.parse(fileContent);

        if (parsedGeojson) {
          toast.success("Congrats! You imported a GeoJson file!");
        }
        setGeojsonData(parsedGeojson);

        const aoiCoordinates =
          parsedGeojson.features[0]?.geometry?.coordinates || [];
        setCoordinates(aoiCoordinates);

        if (!loginData) {
          try {
            const instance = axios.create({
              baseURL: "https://services.sentinel-hub.com",
            });

            const config = {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            };

            const body = qs.stringify({
              client_id,
              client_secret,
              grant_type: "client_credentials",
            });

            const resp = await instance.post("/oauth/token", body, config);
            setLoginData(resp.data.access_token);
          } catch (error) {
            toast.error(error);
          }
        }

        setLoading(false);
      } catch (error) {
        toast.error(
          "Error parsing GeoJSON file. Please check the file format."
        );
        setLoading(false);
      }
    } else {
      toast.error("Invalid file format. Please upload a GeoJSON file.");
      setLoading(false);
    }
  };

  const handleSearch = useCallback(() => {
    if (!coordinates) {
      toast.error("Invalid file format. Please upload a GeoJSON file.");
      return;
    }

    const API_URL =
      "https://services.sentinel-hub.com/api/v1/catalog/1.0.0/search";

    const searchGeoJSON = {
      datetime: "2019-12-10T00:00:00Z/2019-12-11T00:00:00Z",
      collections: ["sentinel-1-grd"],
      limit: 5,
      intersects: {
        type: geojsonData?.features[0]?.geometry.type,
        coordinates: coordinates,
      },
    };

    axios
      .post(API_URL, searchGeoJSON, {
        headers: {
          Authorization: `Bearer ${loginData}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSearchResults(response.data.features);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [coordinates, loginData]);

  return (
    <div className="wrapper">
      <div className="upload-container">
        <Header
          loginData={loginData}
          handleSearch={handleSearch}
          geojsonData={geojsonData}
        />
        {loading && <CircularProgress />}
      </div>
      <div className="app-container">
        <div className="app-leftSide">
          <UploadFile handleFileUpload={handleFileUpload} />
          <Filters searchResults={searchResults} />
        </div>
        <MapView
          geojsonData={geojsonData}
          coordinates={coordinates}
          mapCenter={mapCenter}
          searchResults={searchResults}
        />
      </div>
      <Footer />
    </div>
  );
};
export default InteractiveMap;
