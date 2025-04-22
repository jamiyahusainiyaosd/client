import axios from "axios";
import { baseUrl } from "../constants/env.constants";

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
