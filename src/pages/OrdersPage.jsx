import { useEffect, useState } from 'react';
import api from '../api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/secure/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to fetch orders", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order, idx) => (
            <li key={idx} className="p-4 bg-white shadow rounded">
              <strong>Order #{idx + 1}</strong>
              <ul className="text-sm mt-1">
                {order.items.map(item => (
                  <li key={item.id}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}