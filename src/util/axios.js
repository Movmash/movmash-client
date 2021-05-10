import axios from "axios";
import {P_URL,D_URL} from "./baseUrl";

export default axios.create({
  baseURL: P_URL,
});
