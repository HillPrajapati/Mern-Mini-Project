import axios from 'axios';
import { API_URLS } from '../constant/apiConstants';
import { getItem } from './localStorageHelper';
import { toast } from 'react-toastify'; // Import react-toastify

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: API_URLS.BASE_URL, // You can set your API base URL here
});

// Interceptor to add the Authorization header globally
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItem('authToken'); // Retrieve the token from localStorage
    if (token) {
      // Add the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the response if it's successful
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, show notification and redirect
      toast.error("Your session has expired. Please log in again."); // Show the notification

      // Redirect to logout page or login page after showing the notification
      setTimeout(() => {
        window.location.href = '/logout'; // Or use React Router's history.push('/logout') if needed
      }, 3000);  // Wait for the toast notification to show before redirecting
    }
    return Promise.reject(error); // Reject the error to handle it elsewhere if necessary
  }
);

export default axiosInstance;
