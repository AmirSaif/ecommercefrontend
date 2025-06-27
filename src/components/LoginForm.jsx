import { useState } from 'react';
import api from '../api';

export default function LoginForm({ onSuccess, onClose, openRegistration }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await api.post('/auth/login', { email, password });
      onSuccess();
    } catch (err) {
      alert('Login failed');
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✕</button>
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <input className="w-full p-2 border mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 border mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">Login</button>
        <p className="text-sm mt-2">New user? <span className="text-blue-600 cursor-pointer" onClick={() => { onClose(); openRegistration(); }}>Register here</span></p>
      </form>
    </div>
  );
}
