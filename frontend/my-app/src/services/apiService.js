const API_BASE = 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };
  
  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

export const authService = {
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  
  getUser: () => apiCall('/auth/me'),
  
  logout: () => {
    localStorage.removeItem('token');
  }
};

export const itemsService = {
  getAll: () => apiCall('/items'),
  
  create: (itemData) => apiCall('/items', {
    method: 'POST',
    body: JSON.stringify(itemData)
  }),
  
  update: (id, itemData) => apiCall(`/items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemData)
  }),
  
  delete: (id) => apiCall(`/items/${id}`, {
    method: 'DELETE'
  })
};