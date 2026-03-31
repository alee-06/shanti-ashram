import { useParams, useLocation, Link } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton';
import { formatCurrency, formatDate } from '../../utils/helpers';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Order not found</h2>
          <Link to="/shop">
            <PrimaryButton>Back to Shop</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadReceipt = () => {
    // TODO: Implement receipt download functionality
    alert('Receipt download functionality will be implemented with backend integration');
  };

  return (
    <div className="min-h-screen bg-amber-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Order Details</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Order ID:</span>
              <span className="font-semibold text-amber-900 font-mono">{orderData.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Order Date:</span>
              <span className="font-semibold text-amber-900">{formatDate(new Date().toISOString())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Payment Method:</span>
              <span className="font-semibold text-amber-900 capitalize">{orderData.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Items Ordered</h2>
          <div className="space-y-3">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold text-amber-900">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold text-amber-700">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(orderData.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span className="font-semibold">
                {orderData.shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  formatCurrency(orderData.shipping)
                )}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-amber-900 pt-2 border-t">
              <span>Total:</span>
              <span className="text-amber-700">{formatCurrency(orderData.total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Shipping Address</h2>
          <div className="text-gray-700">
            <p className="font-semibold">{orderData.name}</p>
            <p>{orderData.address}</p>
            <p>{orderData.city}, {orderData.state} - {orderData.pincode}</p>
            <p className="mt-2">Phone: {orderData.phone}</p>
            <p>Email: {orderData.email}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <PrimaryButton onClick={handleDownloadReceipt} className="flex-1">
            Download Receipt
          </PrimaryButton>
          <Link to={`/track-order/${orderData.orderId}`} className="flex-1">
            <PrimaryButton variant="outline" className="w-full">
              Track Order
            </PrimaryButton>
          </Link>
          <Link to="/shop" className="flex-1">
            <PrimaryButton variant="secondary" className="w-full">
              Continue Shopping
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

