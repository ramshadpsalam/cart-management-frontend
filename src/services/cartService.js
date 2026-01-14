import API_BASE_URL from '../config/api';

export const cartService = {
  async getCart(token) {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async addToCart(token, productId, quantity = 1) {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ product_id: productId, quantity })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add to cart');
    }
    return response.json();
  },

  async updateQuantity(token, cartId, quantity) {
    const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update cart');
    }
    return response.json();
  },

  async removeFromCart(token, cartId) {
    const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to remove from cart');
    }
    return response.json();
  },

  async clearCart(token) {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
  }
};

