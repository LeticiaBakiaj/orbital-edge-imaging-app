import React from "react";
import "./Map.css";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Polygon,
  Tooltip,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapView = ({ geojsonData, coordinates, mapCenter, searchResults }) => {
  const fillBlueOptions = { fillColor: "blue" };
  const fillYellowOptions = { fillColor: "yellow" };

  const defaultIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconSize: [8, 12],
    shadowSize: 3,
  });

  return (
    <div className="map">
      <MapContainer center={[0, 0]} zoom={2}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {mapCenter && (
          <Marker position={mapCenter} icon={defaultIcon}>
            <Tooltip>Current Location</Tooltip>
          </Marker>
        )}
        {geojsonData && <GeoJSON data={geojsonData} />}
        {coordinates && (
          <Polygon pathOptions={fillBlueOptions} positions={coordinates}>
            <Tooltip direction="bottom">Result from Upload</Tooltip>
          </Polygon>
        )}
        {searchResults.map((result, index) => {
          return (
            <Polygon
              key={index}
              pathOptions={fillYellowOptions}
              positions={result?.geometry.coordinates[0]}
            >
              <Tooltip direction="bottom">Result from search</Tooltip>
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
