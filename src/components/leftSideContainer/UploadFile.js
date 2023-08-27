import React from "react";
import Button from "@mui/material/Button";

const UploadFile = ({ handleFileUpload }) => {
  return (
    <div style={{ padding: "5px" }}>
      <input
        type="file"
        accept=".geojson"
        id="file-input"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          component="span"
          startIcon="📁"
          color="primary"
          fullWidth
        >
          Upload File
        </Button>
      </label>
    </div>
  );
};

export default UploadFile;
