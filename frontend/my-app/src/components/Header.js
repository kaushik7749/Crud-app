import React from 'react';
import { LogOut, User } from 'lucide-react';

const Header = ({ user, handleLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">My CRUD App</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <User size={20} />
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition duration-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;