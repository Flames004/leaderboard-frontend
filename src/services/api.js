import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; // change if deployed

export const fetchUsers = () => axios.get(`${API_BASE}/users`);
export const addUser = (name) => axios.post(`${API_BASE}/users`, { name });
export const claimPoints = (userId) => axios.post(`${API_BASE}/claim/${userId}`);
export const getHistory = () => axios.get(`${API_BASE}/claim/history`);
