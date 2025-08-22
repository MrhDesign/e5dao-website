'use client';

import React from 'react';
import Link from 'next/link';
import Icon from './Icon';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: 'chevron' | 'slash' | 'arrow';
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = 'chevron',
  className = ''
}) => {
  const getSeparatorIcon = () => {
    switch (separator) {
      case 'chevron':
        return <Icon name="right" className="text-text-display text-sm mx-2" />;
      case 'slash':
        return <span className="text-text-display mx-2">/</span>;
      case 'arrow':
        return <span className="text-text-display mx-2">→</span>;
      default:
        return <Icon name="right" className="text-text-display text-sm mx-2" />;
    }
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center text-sm ${className}`}
    >
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrentPage = item.isCurrentPage || isLast;

          return (
            <li key={index} className="flex items-center">
              {/* Breadcrumb Item */}
              {item.href && !isCurrentPage ? (
                <Link 
                  href={item.href}
                  className="text-text-display hover:text-text-black transition-colors duration-200 truncate max-w-xs"
                  title={item.label}
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className={`truncate max-w-xs ${
                    isCurrentPage 
                      ? 'text-text-black font-medium' 
                      : 'text-text-display'
                  }`}
                  title={item.label}
                  aria-current={isCurrentPage ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {/* Separator */}
              {!isLast && (
                <span className="flex-shrink-0" aria-hidden="true">
                  {getSeparatorIcon()}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;