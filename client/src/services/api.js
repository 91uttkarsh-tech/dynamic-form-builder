import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE || '';
const instance = axios.create({ baseURL: BASE, headers: {'Content-Type':'application/json'} });
const api = {
  get: (url, opts) => instance.get(url, opts),
  post: (url, data, opts) => instance.post(url, data, opts),
  put: (url, data, opts) => instance.put(url, data, opts),
  delete: (url, opts) => instance.delete(url, opts),
  setToken: (token) => {
    if (token) instance.defaults.headers.common['x-admin-token'] = token;
    else delete instance.defaults.headers.common['x-admin-token'];
  }
};
export default api;
