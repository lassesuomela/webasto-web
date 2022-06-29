import axios from "axios";

axios.defaults.baseURL = "https://webasto.saunagaming.com/api";

axios.defaults.headers.common["authorization"] = "Bearer " + process.env.VUE_APP_APIKEY;

export default axios;
