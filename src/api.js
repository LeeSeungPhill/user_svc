import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.50.81:8000", // FastAPI 주소
});

export default api;
