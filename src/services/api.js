import axios from 'axios';

const API_BASE = 'https://leaderboard-backend.onrender.com/api'; // change if deployed

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add error handling wrapper
const handleApiCall = async (apiCall) => {
  try {
    return await apiCall();
  } catch (error) {
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      throw new Error('Connection failed. Please check if the backend server is running and CORS is configured properly.');
    }
    throw error;
  }
};

export const fetchUsers = () => handleApiCall(() => axios.get(`${API_BASE}/users`));
export const addUser = (name) => handleApiCall(() => axios.post(`${API_BASE}/users`, { name }));
export const claimPoints = (userId) => handleApiCall(() => axios.post(`${API_BASE}/claim/${userId}`));
export const getHistory = () => handleApiCall(() => axios.get(`${API_BASE}/claim/history`));
