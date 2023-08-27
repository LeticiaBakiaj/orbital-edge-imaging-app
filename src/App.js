import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InteractiveMap from "./containers/interactiveMap/InteractiveMap";

function App() {
  return (
    <>
      <InteractiveMap />
      <ToastContainer
        hideProgressBar
        autoClose={2000}
        toastStyle={{ backgroundColor: "white" }}
      />
    </>
  );
}

export default App;
