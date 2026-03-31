const PrimaryButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  className = '',
  disabled = false 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-amber-600 text-white hover:bg-amber-700',
    secondary: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
    outline: 'border-2 border-amber-600 text-amber-700 hover:bg-amber-50',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

