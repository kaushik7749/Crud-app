import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ItemCard = ({ item, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition duration-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
        <div className="text-xs text-gray-400 mb-4">
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(item)}
            className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition duration-200"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="flex items-center space-x-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition duration-200"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;