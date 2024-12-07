// src/Services/UserService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const UserService = {
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("There was an error creating the user:", error);
      throw error;
    }
  },
  signIn: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("There was an error signing in the user:", error);
      throw error;
    }
  },
};

export default UserService;
