'use client';

import React from 'react';
import Link from 'next/link';
import Icon from './Icon';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
  position?: number;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: 'chevron' | 'slash' | 'arrow';
  className?: string;
  enableStructuredData?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = 'chevron',
  className = '',
  enableStructuredData = false
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
      {...(enableStructuredData && {
        itemScope: true,
        itemType: "https://schema.org/BreadcrumbList"
      })}
    >
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrentPage = item.isCurrentPage || isLast;
          const position = item.position || index + 1;

          return (
            <li 
              key={index} 
              className="flex items-center"
              {...(enableStructuredData && {
                itemProp: "itemListElement",
                itemScope: true,
                itemType: "https://schema.org/ListItem"
              })}
            >
              {/* Breadcrumb Item */}
              {item.href && !isCurrentPage ? (
                <Link 
                  href={item.href}
                  className="text-text-display hover:text-text-black transition-colors duration-200 truncate max-w-xs"
                  title={item.label}
                  {...(enableStructuredData && {
                    itemProp: "item"
                  })}
                >
                  <span {...(enableStructuredData && { itemProp: "name" })}>
                    {item.label}
                  </span>
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
                  {...(enableStructuredData && { itemProp: "name" })}
                >
                  {item.label}
                </span>
              )}

              {/* Schema.org position meta data */}
              {enableStructuredData && (
                <meta itemProp="position" content={position.toString()} />
              )}

              {/* Separator */}
              {!isLast && (
                <span className="flex-shrink-0 text-gray-400" aria-hidden="true">
                  {separator === 'slash' ? ' / ' : getSeparatorIcon()}
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