import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateLog = async () => {
  const res = await api.post("/generate-log");
  return res.data;
};

export const getTrafficData = async () => {
  const res = await api.get("/data");
  return res.data;
};

export const detectAttack = async (data) => {
  const res = await api.post("/detect", data);
  return res.data;
};

export const getSecurityReport = async () => {
  const res = await api.get("/report");
  return res.data;
};

export const getNetworkLogs = async () => {
  const res = await api.get("/logs");
  return res.data;
};

export const getIncidents = async () => {
  const res = await api.get("/incidents");
  return res.data;
};

export default api;
