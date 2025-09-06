'use client';

import React, { useEffect, useState } from 'react';
import { getViewCount, incrementViewCount, formatViewCount } from '../../lib/viewCounter';

interface ViewCounterProps {
  slug: string;
  className?: string;
  showIcon?: boolean;
  autoIncrement?: boolean; // 是否自动增加浏览量
}

const ViewCounter: React.FC<ViewCounterProps> = ({ 
  slug, 
  className = '',
  showIcon = true,
  autoIncrement = true
}) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 延迟执行，确保组件完全挂载
    const timer = setTimeout(() => {
      if (autoIncrement) {
        // 自动增加浏览量
        const newCount = incrementViewCount(slug);
        setViewCount(newCount);
      } else {
        // 仅获取浏览量，不增加
        const currentCount = getViewCount(slug);
        setViewCount(currentCount);
      }
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [slug, autoIncrement]);

  // 服务端渲染期间显示占位符
  if (!isLoaded) {
    return (
      <div className={`flex items-center ${className}`}>
        {showIcon && (
          <svg 
            className="w-4 h-4 mr-1.5 text-gray-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path 
              fillRule="evenodd" 
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
        <span className="text-gray-400 text-sm">--</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      {showIcon && (
        <svg 
          className="w-4 h-4 mr-1.5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path 
            fillRule="evenodd" 
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
            clipRule="evenodd" 
          />
        </svg>
      )}
      <span className="text-sm" title={`${viewCount} views`}>
        {formatViewCount(viewCount)} {viewCount === 1 ? 'view' : 'views'}
      </span>
    </div>
  );
};

export default ViewCounter;