import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

axios.defaults.headers.common["authorization"] = "Bearer " + localStorage.getItem("token");

export default axios;
