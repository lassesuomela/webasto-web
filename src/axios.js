import axios from "axios";

axios.defaults.baseURL = "https://webasto.saunagaming.com";

axios.defaults.headers.common["authorization"] = "Bearer " + localStorage.getItem("token");

export default axios;
