import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const signup = (userData) => api.post('/auth/signup', userData);
export const getPGs = () => api.get('/pg');
export const searchPGs = (query) => api.get(`/pg/search?query=${query}`);
export const addPG = (pgData) => api.post('/pg', pgData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const initiatePaytmPayment = (bookingData) => api.post('/payment/paytm', bookingData);
export const getPaymentHistory = (userId) => api.get(`/payment/history/${userId}`);
export const addReview = (pgId, reviewData) => api.post(`/pg/${pgId}/reviews`, reviewData);

export default api;