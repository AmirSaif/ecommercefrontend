export default function Cart({ cartItems }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="border-b py-2 flex justify-between">
            <span>{item.name}</span>
            <span>₹{item.price} x {item.quantity}</span>
          </div>
        ))
      )}
    </div>
  );
}
