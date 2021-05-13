import axios from "axios";
const URL = "http://localhost:8000";
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: URL,
});
