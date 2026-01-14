import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';

function CartView({ cart, onUpdateQuantity, onRemove }) {
  const total = cart.reduce((sum, item) => {
    return sum + (parseFloat(item.price) * item.quantity);
  }, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <p className="text-gray-400 text-sm mt-2">
            Add some products to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-green-600 font-semibold mt-1">
                  ${parseFloat(item.price).toFixed(2)} each
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition-colors font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition-colors font-bold"
                >
                  +
                </button>
              </div>
              
              <div className="w-28 text-right">
                <p className="text-lg font-bold text-gray-800">
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
              
              <button
                onClick={() => onRemove(item.id)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                title="Remove from cart"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Total Items: {cart.length}</p>
                <p className="text-gray-600">
                  Total Quantity: {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Total Amount</p>
                <p className="text-3xl font-bold text-green-600">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartView;