import { useEffect, useState } from 'react';
import api from '../api';

export default function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/list/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map(p => (
        <div key={p.id} className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-lg font-bold">{p.name}</h3>
          <p className="text-gray-600">₹{p.price}</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => onAddToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
