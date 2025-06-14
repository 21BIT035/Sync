import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, X } from 'lucide-react';

const Products = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

  const products = [
    { id: 1, name: 'Premium Laptop', category: 'Electronics', price: '$1,299.99', stock: 45 },
    { id: 2, name: 'Wireless Earbuds', category: 'Audio', price: '$89.99', stock: 120 },
    { id: 3, name: 'Smart Watch', category: 'Wearables', price: '$199.99', stock: 78 },
    { id: 4, name: 'Gaming Console', category: 'Electronics', price: '$499.99', stock: 23 },
    { id: 5, name: 'Bluetooth Speaker', category: 'Audio', price: '$59.99', stock: 56 },
    { id: 6, name: 'Tablet Pro', category: 'Electronics', price: '$649.99', stock: 34 },
    { id: 7, name: 'Mechanical Keyboard', category: 'Computer Accessories', price: '$129.99', stock: 89 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Logic to add new product would go here
    setShowAddModal(false);
    setNewProduct({ name: '', category: '', price: '', stock: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <button 
          className="mt-3 sm:mt-0 btn btn-primary flex items-center space-x-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search products..."
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="btn flex items-center space-x-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-10">
                <input type="checkbox" className="rounded" />
              </th>
              <th>PRODUCT NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>STOCK</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td>
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="font-medium">{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock > 50 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 20 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-800 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of <span className="font-medium">7</span> results
        </div>
        
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border bg-primary-500 text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowAddModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Product</h3>
                  <button onClick={() => setShowAddModal(false)}>
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  </button>
                </div>
                
                <form onSubmit={handleAddProduct}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Audio">Audio</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Computer Accessories">Computer Accessories</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={newProduct.price}
                          onChange={handleInputChange}
                          className="block w-full pl-7 pr-12 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none sm:col-start-2 sm:text-sm"
                    >
                      Add Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;