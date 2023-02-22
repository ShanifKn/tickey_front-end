import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
