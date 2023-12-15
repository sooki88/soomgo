import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://rolling-api.vercel.app/2-7/",
  header: {
    "Content-Type": "application/json",
  },
});
