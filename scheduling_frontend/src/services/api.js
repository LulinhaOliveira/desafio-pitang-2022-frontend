import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4044/scheduling",
  timeout: 500,
});

export default api;
