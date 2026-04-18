import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// In React Native, 'localhost' points to the mobile device itself.
// 10.0.2.2 is the special alias to your host loopback interface if using Android Emulator.
// If testing on a physical device, change this to your computer's local IP (e.g., 192.168.1.x)
const API_BASE_URL = 'http://10.0.2.2:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
