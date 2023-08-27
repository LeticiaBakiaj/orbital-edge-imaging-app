import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = {
  show: (text) => {
    ToastContainer.show({
      text1: "Info!",
      text2: text,
      type: "info",
      position: "top-center",
      autoClose: 2000,
    });
  },
  error: (text) => {
    ToastContainer.show({
      text1: "Something went wrong!",
      text2: text,
      type: "error",
      position: "top-center",
      autoClose: 2000,
    });
  },
  success: (text) => {
    ToastContainer.show({
      text1: "Success!",
      text2: text,
      type: "success",
      position: "top-center",
      autoClose: 2000,
    });
  },
};

export default Toast;
