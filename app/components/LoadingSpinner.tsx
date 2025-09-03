'use client';


interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-border-one border-t-text-brand rounded-full animate-spin`}></div>
      </div>
      {text && (
        <p className="mt-4 text-text-display text-sm font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;