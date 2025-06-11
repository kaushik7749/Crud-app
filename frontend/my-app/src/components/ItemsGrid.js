import React from 'react';
import { Plus } from 'lucide-react';
import ItemCard from './ItemCard';

const ItemsGrid = ({ items, loading, handleEdit, handleDelete, setShowForm }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <Plus size={48} className="mx-auto" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No items yet</h3>
        <p className="text-gray-600 mb-6">Get started by creating your first item</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add First Item
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ItemsGrid;