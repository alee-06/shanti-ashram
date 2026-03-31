const SectionHeading = ({ title, subtitle, center = false }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 w-24 h-1 bg-amber-600 ${center ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionHeading;

