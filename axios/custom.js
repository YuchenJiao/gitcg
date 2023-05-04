import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = "/api";
instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;