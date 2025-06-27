import ProductList from '../components/ProductList';

export default function HomePage({ onAddToCart }) {
  return <ProductList onAddToCart={onAddToCart} />;
}