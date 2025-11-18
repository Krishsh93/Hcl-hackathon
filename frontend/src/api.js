import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('hw_token', token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem('hw_token');
  }
}

export function getSavedToken() {
  return localStorage.getItem('hw_token');
}

export default api;
