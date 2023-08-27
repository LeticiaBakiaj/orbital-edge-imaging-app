import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Select,
  FormControl,
  MenuItem,
  CardMedia,
  CircularProgress,
  Card,
  InputLabel,
} from "@material-ui/core";
import ImageCarousel from "./ImageCarousel";
import { noPhoto } from "../../assets";
import "./Filters.css";
import { toast } from "react-toastify";

const Filters = ({ searchResults }) => {
  const bbox = searchResults[0]?.bbox?.join(",");

  const apiUrl = "https://services.sentinel-hub.com/ogc";
  const options = [
    { label: "WMS", value: "wms", color: "NATURAL-COLOR" },
    { label: "WCS", value: "wcs", color: "NATURAL-COLOR" },
    { label: "WMTS", value: "wmts", color: "FALSE-COLOR" },
  ];
  const instance = "b80ef64d-73d2-466d-82a0-a1878ba729d5";

  const [selectedItem, setSelectedItem] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImageData(selectedItem);
  }, [selectedItem]);

  const fetchImageData = async (selectedOption) => {
    if (!selectedOption.value) {
      return; // Don't fetch if selectedOption is empty
    }

    setLoading(true);
    try {
      let response;
      if (selectedOption.value === "wms") {
        response = await axios.get(
          `${apiUrl}/${selectedOption.value}/${instance}?REQUEST=GetMap&BBOX=${bbox}&LAYERS=${selectedOption.color}&MAXCC=20&WIDTH=320&HEIGHT=320&FORMAT=image/jpeg&TIME=2018-03-29/2018-05-29`
        );
      } else if (selectedOption.value === "wcs") {
        response = await axios.get(
          `${apiUrl}/${selectedOption.value}/${instance}?SERVICE=WCS&REQUEST=GetCoverage&COVERAGE=${selectedOption.color}&BBOX=${bbox}&MAXCC=20&WIDTH=320&HEIGHT=320&FORMAT=image/jpeg&TIME=2019-03-29/2019-05-29`
        );
      } else if (selectedOption.value === "wmts") {
        response = await axios.get(
          `${apiUrl}/${selectedOption.value}/${instance}?REQUEST=GetTile&BBOX=${bbox}&RESOLUTION=10&TILEMATRIXSET=PopularWebMercator512&LAYER=${selectedOption.color}&MAXCC=20&TILEMATRIX=14&TILEROW=3065&TILECOL=4758&TIME=2018-03-29/2018-05-29`
        );
      }
      setImageUrl(response.config.url);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching data, please upload a GeoJson file first");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value; // Get the selected value
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      setSelectedItem(selectedOption);
    } // Update the selected option in state
  };

  return (
    <Container style={{ padding: "5px", marginTop: "10px", width: "300px" }}>
      <Card
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography className="fade-in-heading" gutterBottom>
          Filter and Display Image
        </Typography>
        <FormControl variant="outlined" style={{ minWidth: "100%" }}>
          <InputLabel id="wms-select-label">Select Request</InputLabel>
          <Select
            labelId="wms-select-label"
            id="wms-select"
            value={selectedItem.value}
            onChange={handleOptionChange}
            label="Select Request"
            style={{ marginBottom: "5px" }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          {loading ? (
            <div className="loading">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <>
              {imageUrl ? (
                <CardMedia
                  component="img"
                  alt="Fetched Image"
                  style={{
                    borderRadius: "5px",
                    height: "100%",
                  }}
                  image={imageUrl}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <img
                    src={noPhoto}
                    width={20}
                    style={{ marginRight: "5px" }}
                  />
                  <Typography variant="caption" className="fade-in-heading">
                    No image available
                  </Typography>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
      {searchResults.length > 0 && (
        <Card
          style={{
            marginTop: "20px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom>Images from search</Typography>
          <ImageCarousel images={searchResults} />
        </Card>
      )}
    </Container>
  );
};

export default Filters;
