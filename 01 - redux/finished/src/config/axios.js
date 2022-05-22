import axios from 'axios';
import { getAccessToken } from '../services/localStorage';
import { API_URL } from './env';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
  config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;
