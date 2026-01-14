import API_BASE_URL from '../config/api';

export const productService = {
  async getAll(token) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getById(token, id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async create(token, productData) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create product');
    }
    return response.json();
  },

  async update(token, id, productData) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update product');
    }
    return response.json();
  },

  async delete(token, id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete product');
    }
    return response.json();
  }
};
