import API_BASE_URL from '../config/api';

export const userService = {
  async getAll(token) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getAllCarts(token) {
    const response = await fetch(`${API_BASE_URL}/users/carts`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error('Failed to fetch carts');
    return response.json();
  }
};