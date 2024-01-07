import axios from "axios";

const addTokenToHeaders = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  }
};

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export default api;
export { addTokenToHeaders };
