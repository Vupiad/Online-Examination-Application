import api from './api';

const authService = {
  login: async (loginData) => {
    try {
      const response = await api.post('/api/auth/login', loginData);
      // Store user data. If there's a token, store it, otherwise just store user info.
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  register: async (registerData) => {
    try {
      const response = await api.post('/api/auth/register', registerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;
