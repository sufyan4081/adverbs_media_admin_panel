import axios from "axios";
export const ORIGIN = process.env.REACT_APP_API_PATH;
const BASE_URL = `${ORIGIN}`;
export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
