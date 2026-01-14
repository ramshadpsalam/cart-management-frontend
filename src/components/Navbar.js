import React from 'react';
import { ShoppingCart, LogOut, Users, Package } from 'lucide-react';

function Navbar({ user, onLogout, activeTab, onTabChange, cartCount }) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.name} 
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {user.role}
              </span>
            </span>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => onTabChange('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              activeTab === 'products' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package size={18} />
            Products
          </button>
          
          <button
            onClick={() => onTabChange('cart')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors relative ${
              activeTab === 'cart' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShoppingCart size={18} />
            My Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          {user.role === 'superadmin' && (
            <button
              onClick={() => onTabChange('users')}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                activeTab === 'users' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users size={18} />
              Users
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;