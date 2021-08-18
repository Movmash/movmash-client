import axios from "axios";
// const URL = "http://localhost:8000";
import baseURL from "./constantConfig";
// const URL = "/";
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: baseURL,
});

// export default axios;