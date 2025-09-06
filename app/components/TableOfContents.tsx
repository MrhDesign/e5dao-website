'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface TOCItem {
  id: string;
  level: number;
  title: string;
  anchor: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
  maxLevel?: number; // 最大显示层级，默认为3
  sticky?: boolean;  // 是否固定定位
}

export default function TableOfContents({
  items,
  className = '',
  maxLevel = 3,
  sticky = true
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  
  // 过滤显示层级
  const filteredItems = items.filter(item => item.level <= maxLevel);
  
  // 监听滚动，高亮当前章节
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
      }
    );

    // 观察所有标题元素
    filteredItems.forEach(item => {
      const element = document.getElementById(item.anchor);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [filteredItems]);

  if (filteredItems.length === 0) return null;

  return (
    <div className={`toc-container ${sticky ? 'sticky top-8' : ''} ${className}`}>
      <div className="toc-wrapper bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Table of Contents
        </h3>
        
        <nav className="toc-nav">
          <ul className="space-y-1">
            {filteredItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.anchor}`}
                  className={`
                    block py-2 px-3 text-sm rounded-md transition-all duration-200
                    hover:bg-blue-50 hover:text-blue-700
                    ${activeId === item.anchor 
                      ? 'bg-blue-100 text-blue-700 font-medium border-l-2 border-blue-500' 
                      : 'text-gray-600'
                    }
                  `}
                  style={{
                    paddingLeft: `${(item.level - 1) * 16 + 12}px`
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.anchor)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}