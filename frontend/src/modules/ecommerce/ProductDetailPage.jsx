import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import PrimaryButton from '../../components/PrimaryButton';
import { formatCurrency } from '../../utils/helpers';
import { products } from '../../data/dummyData';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Product not found</h2>
          <PrimaryButton onClick={() => navigate('/shop')}>
            Back to Shop
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Show success message (could use a toast library)
    alert(`${quantity} item(s) added to cart!`);
  };

  const images = [product.image, product.image, product.image]; // In real app, use product.images

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 object-cover rounded-lg border-2 ${
                    selectedImage === index
                      ? 'border-amber-600'
                      : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-amber-900 mb-4">{product.name}</h1>
            <div className="text-3xl font-bold text-amber-700 mb-6">
              {formatCurrency(product.price)}
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors font-bold"
                >
                  -
                </button>
                <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {product.stock > 0 ? (
              <div className="space-y-4 mb-6">
                <PrimaryButton onClick={handleAddToCart} className="w-full">
                  Add to Cart
                </PrimaryButton>
                <PrimaryButton
                  variant="outline"
                  onClick={() => navigate('/cart')}
                  className="w-full"
                >
                  View Cart
                </PrimaryButton>
              </div>
            ) : (
              <div className="mb-6">
                <PrimaryButton disabled className="w-full">
                  Out of Stock
                </PrimaryButton>
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Stock:</span>
                  <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Category:</span>
                  <span className="font-semibold text-amber-900 capitalize">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

