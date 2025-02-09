import axios from "axios";

const instance = axios.create({
  baseURL: "https://back-end-arispedigree-aq4t.onrender.com",
  timeout: 1000000,
});

export default instance;
