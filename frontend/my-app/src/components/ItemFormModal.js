import React from 'react';
import { Save, X } from 'lucide-react';

const ItemFormModal = ({ 
  showForm, 
  editingItem, 
  formData, 
  setFormData, 
  handleSubmit, 
  resetForm 
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">
          {editingItem ? 'Edit Item' : 'Add New Item'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2"
            >
              <Save size={16} />
              <span>{editingItem ? 'Update' : 'Create'}</span>
            </button>
            
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200 flex items-center justify-center space-x-2"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemFormModal;