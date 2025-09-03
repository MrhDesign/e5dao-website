'use client';

import React from 'react';

interface ProductSkeletonProps {
  variant?: 'default' | 'solution';
  className?: string;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ 
  variant = 'default', 
  className = '' 
}) => {
  if (variant === 'solution') {
    return (
      <div className={`group flex lg:flex-row flex-col lg:gap-10 gap-5 lg:py-5 border-b border-border-one ${className}`}>
        {/* 图片骨架 */}
        <div className="flex-1 aspect-[4/3] bg-fill-three animate-pulse rounded"></div>
        
        {/* 内容骨架 */}
        <div className="lg:p-5 py-5 flex-2 flex flex-col gap-2.5">
          <div className="h-8 bg-fill-three animate-pulse rounded mb-2"></div>
          <div className="h-4 bg-fill-three animate-pulse rounded mb-1"></div>
          <div className="h-4 bg-fill-three animate-pulse rounded mb-1"></div>
          <div className="h-4 bg-fill-three animate-pulse rounded w-3/4"></div>
          
          <div className="mt-auto">
            <div className="h-10 w-32 bg-fill-three animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-fill-four rounded-sm overflow-hidden ${className}`}>
      {/* 图片骨架 */}
      <div className="w-full aspect-square bg-fill-three animate-pulse"></div>
      
      {/* 内容骨架 */}
      <div className="lg:px-5 px-2.5 lg:py-4 py-2 flex flex-col lg:gap-2">
        <div className="h-6 bg-fill-three animate-pulse rounded mb-2"></div>
        <div className="h-4 bg-fill-three animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;