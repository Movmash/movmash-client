import axios from "axios";
// const URL = "http://localhost:8000";

const URL = "/";
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: URL,
});
