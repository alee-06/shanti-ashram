import { formatCurrency } from '../utils/helpers';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-amber-100">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-amber-900">{item.name}</h3>
        <p className="text-amber-700 font-bold">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="w-12 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
        >
          +
        </button>
      </div>
      <div className="text-right">
        <p className="font-bold text-amber-900">{formatCurrency(item.price * item.quantity)}</p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-700 text-sm mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

