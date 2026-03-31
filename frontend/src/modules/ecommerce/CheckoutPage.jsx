import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import { formatCurrency, validateEmail, validatePhone, generateOrderId } from '../../utils/helpers';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select payment method';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      const orderId = generateOrderId();
      clearCart();
      setIsProcessing(false);
      navigate(`/order-confirmation/${orderId}`, {
        state: {
          orderData: {
            ...formData,
            items: cartItems,
            subtotal,
            shipping,
            total,
            orderId
          }
        }
      });
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Your cart is empty</h2>
          <PrimaryButton onClick={() => navigate('/shop')}>
            Continue Shopping
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Shipping Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Shipping Details</h2>
                <div className="space-y-4">
                  <FormInput
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={errors.name}
                  />
                  <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={errors.email}
                  />
                  <FormInput
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    error={errors.phone}
                  />
                  <FormInput
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    error={errors.address}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      error={errors.city}
                    />
                    <FormInput
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      error={errors.state}
                    />
                  </div>
                  <FormInput
                    label="Pincode"
                    type="tel"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    error={errors.pincode}
                    maxLength={6}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
                    { id: 'upi', name: 'UPI', icon: '📱' },
                    { id: 'card', name: 'Credit/Debit Card', icon: '💳' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, paymentMethod: method.id }));
                        if (errors.paymentMethod) {
                          setErrors(prev => ({ ...prev, paymentMethod: '' }));
                        }
                      }}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-semibold text-amber-900">{method.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.paymentMethod && (
                  <p className="mt-2 text-sm text-red-600">{errors.paymentMethod}</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2 mb-4">
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
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-amber-900">
                      <span>Total:</span>
                      <span className="text-amber-700">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
                <PrimaryButton
                  type="submit"
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : `Place Order - ${formatCurrency(total)}`}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

