import axios from 'axios';

const api = axios.create({
  baseURL:`${import.meta.env.VITE_LOCAL_API_HOST}${import.meta.env.VITE_LOCAL_API_PATH}`,
});

export default api;
