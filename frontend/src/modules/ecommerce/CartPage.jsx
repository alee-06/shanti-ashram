import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import PrimaryButton from '../../components/PrimaryButton';
import { formatCurrency } from '../../utils/helpers';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Start adding items to your cart!</p>
          <Link to="/shop">
            <PrimaryButton>Continue Shopping</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-amber-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
            <div className="flex justify-end mt-4">
              <PrimaryButton variant="outline" onClick={clearCart}>
                Clear Cart
              </PrimaryButton>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>
                {subtotal < 500 && (
                  <p className="text-sm text-amber-600">
                    Add {formatCurrency(500 - subtotal)} more for free shipping!
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-amber-900">
                    <span>Total:</span>
                    <span className="text-amber-700">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
              <Link to="/checkout">
                <PrimaryButton className="w-full">Proceed to Checkout</PrimaryButton>
              </Link>
              <Link to="/shop">
                <PrimaryButton variant="outline" className="w-full mt-3">
                  Continue Shopping
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

