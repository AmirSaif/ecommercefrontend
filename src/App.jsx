import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import api from './api';

function AppContent() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (!isLoggedIn) return setShowLogin(true);
    const index = cartItems.findIndex(i => i.id === product.id);
    if (index !== -1) {
      const updated = [...cartItems];
      updated[index].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleLogout = async () => {
    await api.get('/auth/logout');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>🛍️ My Store</h1>
        <div className="space-x-3 flex items-center">
          {isLoggedIn ? (
            <>
            <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
            <button onClick={() => navigate('/orders')} className="text-indigo-600">Orders</button>
            </>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)} className="text-blue-600">Login</button>
              <button onClick={() => setShowRegister(true)} className="text-green-600">Register</button>
            </>
          )}
          <button onClick={() => navigate('/cart')} className="bg-blue-600 text-white px-3 py-1 rounded">
            Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>

      {showLogin && <LoginForm onSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} openRegistration={() => setShowRegister(true)} />}
      {showRegister && <RegisterForm onSuccess={handleLoginSuccess} onClose={() => setShowRegister(false)} />}
      
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}