import axios from 'axios';
import Cookies from 'js-cookie';
const BASE_URL = 'https://localhost:8000';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8000',
});

export default axiosInstance;
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  protocol: 'https',
});

async function refreshAccessToken() {
  try {
    const response = await axios.post('/auth/refresh', {
      withCredentials: true, // Send cookies with the refresh token request
    });

    // Assuming the response sets new cookies, no need to manually set them here.
    return response.data.accessToken;
  } catch (error) {
    // Handle refresh token failure (e.g., redirect to login)
    console.error('Failed to refresh access token:', error);
    throw error;
  }
}

// Request interceptor
axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('jwt'); // Get access token from cookie
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
let isRefreshing = false;
let failedRequestsQueue = [];

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequestsQueue.push(() =>
            resolve(axiosInstance(originalRequest))
          );
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;

        failedRequestsQueue.forEach((callback) => callback());
        failedRequestsQueue = [];

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
