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
  separator?: 'chevron' | 'slash';
  className?: string;
  enableStructuredData?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = 'chevron',
  className = '',
  enableStructuredData = false
}) => {
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
                  className="text-text-display hover:text-text-black transition-colors duration-200"
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
                  className={isCurrentPage ? 'text-text-black font-medium' : 'text-text-display'}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  {...(enableStructuredData && { itemProp: "name" })}
                >
                  {item.label}
                </span>
              )}

              {/* Schema.org position meta data */}
              {enableStructuredData && (
                <meta itemProp="position" content={(index + 1).toString()} />
              )}

              {/* Separator */}
              {!isLast && (
                <span className="text-text-display mx-2" aria-hidden="true">
                  {separator === 'slash' ? '/' : <Icon name="right" className="text-sm" />}
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