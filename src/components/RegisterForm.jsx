import { useState } from 'react';
import api from '../api';

export default function RegisterForm({ onSuccess, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      await api.post('/auth/login', { email, password });
      onSuccess();
    } catch {
      alert('Registration failed');
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✕</button>
        <h2 className="text-lg font-bold mb-4">Register</h2>
        <input className="w-full p-2 border mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 border mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" type="submit">Register</button>
      </form>
    </div>
  );
}
