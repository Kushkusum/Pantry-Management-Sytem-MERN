// src/services/api.js
import Cookies from 'js-cookie';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An unknown error occurred');
  }
  return response.json();
};

const apiRequest = async (url, method, data) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // If there's a token, add it to the request headers
  const token = localStorage.getItem('token') || Cookies.get('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(url, options);
  return handleResponse(response);
};

export const API = {
  addPantryItem: (itemData) => apiRequest('/api/pantry', 'POST', itemData),

  getPantryItems: (userId) => apiRequest(`/api/pantry/${userId}`, 'GET'),

  deletePantryItem: (id) => apiRequest(`/api/pantry/${id}`, 'DELETE'),

  signInUser: (userData) => {
    return apiRequest('/api/users/login', 'POST', userData)
      .then((data) => {
        // Save token to localStorage or cookies
        const token = data.token;
        if (token) {
          localStorage.setItem('token', token); // You can also store it in cookies
          Cookies.set('token', token, { expires: 1 }); // Store token in cookies for 1 day
        }
        return data;
      });
  },
  
  signUpUser: (userData) => apiRequest('/api/users/signup', 'POST', userData),
};

