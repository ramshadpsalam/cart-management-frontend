import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import ProductForm from './ProductForm';

function ProductsView({ products, onAdd, onUpdate, onDelete, onAddToCart, userRole }) {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = (data) => {
    if (editingProduct) {
      onUpdate(editingProduct.id, data);
    } else {
      onAdd(data);
    }
    handleClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No products available. Add your first product!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-green-600">
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    Stock: {product.stock}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => onAddToCart(product.id)}
                    disabled={product.stock === 0}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    title="Edit Product"
                  >
                    <Edit2 size={16} />
                  </button>
                  
                  {userRole === 'superadmin' && (
                    <button
                      onClick={() => onDelete(product.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsView;