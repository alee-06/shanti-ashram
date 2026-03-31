import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import { formatDate } from '../../utils/helpers';

const OrderTrackingPage = () => {
  const { orderId: paramOrderId } = useParams();
  const [orderId, setOrderId] = useState(paramOrderId || '');
  const [orderStatus, setOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dummy order statuses - in real app, fetch from API
  const orderStatuses = [
    { status: 'placed', label: 'Order Placed', date: '2024-03-12', completed: true },
    { status: 'payment', label: 'Payment Confirmed', date: '2024-03-12', completed: true },
    { status: 'processing', label: 'Processing', date: '2024-03-13', completed: true },
    { status: 'dispatched', label: 'Dispatched', date: '2024-03-14', completed: false },
    { status: 'completed', label: 'Completed', date: null, completed: false }
  ];

  const handleTrackOrder = async (e) => {
    e?.preventDefault();
    
    if (!orderId.trim()) {
      alert('Please enter an order ID');
      return;
    }

    setIsLoading(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      // Simulate API response
      setOrderStatus({
        orderId,
        currentStatus: 'processing',
        statuses: orderStatuses,
        estimatedDelivery: '2024-03-16'
      });
      setIsLoading(false);
    }, 1000);
  };

  // Auto-track if orderId is in URL
  useEffect(() => {
    if (paramOrderId) {
      setOrderId(paramOrderId);
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOrderStatus({
          orderId: paramOrderId,
          currentStatus: 'processing',
          statuses: orderStatuses,
          estimatedDelivery: '2024-03-16'
        });
        setIsLoading(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramOrderId]);

  return (
    <div className="min-h-screen bg-amber-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">Track Your Order</h1>

        {/* Search Form */}
        {!orderStatus && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
              <FormInput
                label="Order ID"
                name="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
                required
              />
              <PrimaryButton type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Tracking...' : 'Track Order'}
              </PrimaryButton>
            </form>
          </div>
        )}

        {/* Order Status Timeline */}
        {orderStatus && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-2">Order #{orderStatus.orderId}</h2>
              {orderStatus.estimatedDelivery && (
                <p className="text-gray-600">
                  Estimated Delivery: {formatDate(orderStatus.estimatedDelivery)}
                </p>
              )}
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {/* Status Items */}
              <div className="space-y-6">
                {orderStatus.statuses.map((statusItem, index) => {
                  const isCompleted = statusItem.completed;
                  const isCurrent = statusItem.status === orderStatus.currentStatus;
                  
                  return (
                    <div key={statusItem.status} className="relative flex items-start">
                      {/* Status Icon */}
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-amber-600 text-white ring-4 ring-amber-200'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>

                      {/* Status Content */}
                      <div className="ml-6 flex-1">
                        <div className={`font-semibold ${
                          isCompleted || isCurrent
                            ? 'text-amber-900'
                            : 'text-gray-500'
                        }`}>
                          {statusItem.label}
                        </div>
                        {statusItem.date && (
                          <div className="text-sm text-gray-600 mt-1">
                            {formatDate(statusItem.date)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Link to="/shop">
                <PrimaryButton variant="outline" className="w-full">
                  Continue Shopping
                </PrimaryButton>
              </Link>
            </div>
          </div>
        )}

        {/* Track Another Order */}
        {orderStatus && (
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setOrderStatus(null);
                setOrderId('');
              }}
              className="text-amber-700 hover:text-amber-800 font-semibold"
            >
              Track Another Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;

