import axios from "axios";
import { getRefreshToken, saveTokens, logout } from "../auth";

const api = axios.create({
  baseURL: "http://192.168.50.81:8002",
});

// 요청마다 access_token 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 시 토큰 만료되면 자동으로 refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = getRefreshToken();
        console.log("refresh : " ,refresh)
        const res = await axios.post("http://192.168.50.81:8002/refresh", { refresh_token: refresh });
        console.log("refresh res : " ,res.data)
        saveTokens(res.data.access_token, res.data.refresh_token);
        return api(originalRequest);
      } catch (err) {
        logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


export default api;
