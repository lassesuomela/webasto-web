import axios from "axios";

axios.defaults.baseURL = "https://webasto.lassesuomela.com";

axios.defaults.headers.common["authorization"] = "Bearer " + localStorage.getItem("token");

export default axios;
