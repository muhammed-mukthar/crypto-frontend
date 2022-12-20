import "./App.css";
import MyRoutes from "./shared/MyRoutes";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const navigate = useNavigate();

  axios.interceptors.request.use(
    function (config) {
      // console.log("func ran from app.js");
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return (
    <div className="App">
      {/* <Login /> */}
      <MyRoutes />
      <Toaster
        position="top-right"
        reverseOrd
        er={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          error: {
            duration: 3000,
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
