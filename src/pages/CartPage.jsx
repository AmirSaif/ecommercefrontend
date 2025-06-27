import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CartPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const res = await api.post('/secure/checkout', { items: cartItems });
      alert(res.data.message || 'Checkout success!');
      setCartItems([]);
      navigate('/orders');
    } catch (err) {
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between border-b py-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}