import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getRefreshToken, setTokens } from 'utils';

export const queryClient = new QueryClient();

const client = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_API}/api`,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        const { data } = await client.post('/auth/refresh', { refreshToken });

        setTokens(data);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return axios(originalRequest);
      } catch (err) {
        console.error('Refresh token request failed:', err);
        // Handle refresh token failure (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  },
);

export default client;
