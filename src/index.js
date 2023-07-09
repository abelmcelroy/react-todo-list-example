import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App.jsx";
import axios from "axios";

axios.defaults.baseURL = API_URL;
console.log(axios.defaults.baseURL, API_URL);

ReactDOM.render(<App />, document.getElementById("root"));