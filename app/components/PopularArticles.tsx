'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPopularArticles, formatViewCount, ViewData } from '../../lib/viewCounter';
import { getContentData } from '../../lib/metadata-generator';

interface PopularArticlesProps {
  limit?: number;
  className?: string;
  title?: string;
  showViewCount?: boolean;
}

const PopularArticles: React.FC<PopularArticlesProps> = ({ 
  limit = 5,
  className = '',
  title = 'Popular Articles',
  showViewCount = true
}) => {
  const [popularArticles, setPopularArticles] = useState<Array<ViewData & { title: string; publishedDate?: any }>>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const popular = getPopularArticles(limit);
      
      // 获取每篇文章的完整信息
      const articlesWithInfo = popular.map(viewData => {
        const articleInfo = getContentData(viewData.slug, 'news');
        return {
          ...viewData,
          title: articleInfo?.title || 'Unknown Article',
          publishedDate: articleInfo?.publishedDate
        };
      }).filter(article => article.title !== 'Unknown Article'); // 过滤掉找不到的文章
      
      setPopularArticles(articlesWithInfo);
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [limit]);

  if (!isLoaded) {
    return (
      <div className={`${className}`}>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-3">
          {Array.from({ length: Math.min(3, limit) }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (popularArticles.length === 0) {
    return null; // 如果没有热门文章，不显示该组件
  }

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      <div className="space-y-4">
        {popularArticles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/news/articles/${article.slug}`}
            className="group block"
          >
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  {article.publishedDate && (
                    <span className="text-xs text-gray-500">
                      {article.publishedDate.year}/{article.publishedDate.month}/{article.publishedDate.day}
                    </span>
                  )}
                  {showViewCount && (
                    <div className="flex items-center text-xs text-gray-400">
                      <svg 
                        className="w-3 h-3 mr-1" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path 
                          fillRule="evenodd" 
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {formatViewCount(article.views)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularArticles;