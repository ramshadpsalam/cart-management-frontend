import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import { productService } from './services/productService';
import { cartService } from './services/cartService';
import { userService } from './services/userService';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar';
import ProductsView from './components/ProductsView';
import CartView from './components/CartView';
import UsersView from './components/UsersView';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = authService.getToken();
    const storedUser = authService.getUser();
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadProducts();
      loadCart();
      if (currentUser?.role === 'superadmin') {
        loadUsers();
      }
    }
  }, [token, currentUser]);

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const data = await authService.login(email, password);
      authService.saveAuth(data.token, data.user);
      setToken(data.token);
      setCurrentUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setToken(null);
    setCart([]);
    setProducts([]);
    setUsers([]);
    setActiveTab('products');
  };

  const loadProducts = async () => {
    try {
      const data = await productService.getAll(token);
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  const loadCart = async () => {
    try {
      const data = await cartService.getCart(token);
      setCart(data);
    } catch (err) {
      console.error('Failed to load cart:', err);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await userService.getAll(token);
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await productService.create(token, productData);
      await loadProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      await productService.update(token, id, productData);
      await loadProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.delete(token, id);
      await loadProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartService.addToCart(token, productId);
      await loadCart();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateCartQuantity = async (cartId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(cartId);
      return;
    }
    try {
      await cartService.updateQuantity(token, cartId, quantity);
      await loadCart();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRemoveFromCart = async (cartId) => {
    try {
      await cartService.removeFromCart(token, cartId);
      await loadCart();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateAdmin = async (userData) => {
    try {
      await authService.createAdmin(token, userData);
      await loadUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        user={currentUser} 
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={cart.length}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'products' && (
          <ProductsView
            products={products}
            onAdd={handleAddProduct}
            onUpdate={handleUpdateProduct}
            onDelete={handleDeleteProduct}
            onAddToCart={handleAddToCart}
            userRole={currentUser.role}
          />
        )}

        {activeTab === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemove={handleRemoveFromCart}
          />
        )}

        {activeTab === 'users' && currentUser.role === 'superadmin' && (
          <UsersView 
            users={users} 
            onCreateAdmin={handleCreateAdmin} 
          />
        )}
      </div>
    </div>
  );
}

export default App;