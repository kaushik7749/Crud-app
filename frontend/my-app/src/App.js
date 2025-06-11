import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';
import ItemFormModal from './components/ItemFormModal';
import ItemsGrid from './components/ItemsGrid';
import { authService, itemsService } from './services/apiService';

const App = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
      fetchItems();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const data = await authService.getUser();
      setUser(data);
    } catch (error) {
      authService.logout();
      setError('Session expired');
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await itemsService.getAll();
      setItems(data);
    } catch (error) {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const data = isLogin 
        ? await authService.login(authForm)
        : await authService.register(authForm);
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setAuthForm({ email: '', password: '', name: '' });
      fetchItems();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setItems([]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      if (editingItem) {
        const data = await itemsService.update(editingItem._id, formData);
        setItems(items.map(item => item._id === editingItem._id ? data : item));
        setEditingItem(null);
      } else {
        const data = await itemsService.create(formData);
        setItems([...items, data]);
      }
      setFormData({ title: '', description: '' });
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ title: item.title, description: item.description });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await itemsService.delete(id);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '' });
    setEditingItem(null);
    setShowForm(false);
  };

  if (!user) {
    return (
      <AuthForm
        authForm={authForm}
        setAuthForm={setAuthForm}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        handleAuth={handleAuth}
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} handleLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage error={error} />

        {/* Add Item Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2 font-medium"
          >
            <Plus size={20} />
            <span>Add New Item</span>
          </button>
        </div>

        <ItemFormModal
          showForm={showForm}
          editingItem={editingItem}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
        />

        <ItemsGrid
          items={items}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setShowForm={setShowForm}
        />
      </main>
    </div>
  );
};

export default App;