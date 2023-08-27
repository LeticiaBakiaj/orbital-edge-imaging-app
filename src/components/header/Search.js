import React from "react";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Search = ({ loginData, handleSearch }) => {
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<SearchIcon />}
        disabled={!loginData}
        onClick={handleSearch}
      >
        {loginData ? "Search on Uploaded File" : "Upload a file to search"}
      </Button>
    </div>
  );
};

export default Search;
