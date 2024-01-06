import api from "./apiService.js";

const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
};

const login = async (data) => {
  const response = await api.post("/users/login/", data);
  const { token } = { ...response.data };
  if (token) setToken(token);
};

const register = async (data) => {
  await api.post("/users/register/", data);
  await login(data);
};

export { login, register };
