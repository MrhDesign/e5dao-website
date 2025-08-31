'use client';

import { useState, useMemo } from 'react';
import NewCard from './NewCard';
import Pagination from './Pagination';
import Breadcrumb from './Breadcrumb';
import useContent from '../../lib/useContent';
import Link from 'next/link';

export interface NewsListConfig {
  type: 'articles' | 'applications';
  contentKey: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  linkType?: 'news' | 'application';
  gridCols?: string;
}

interface NewsListPageProps {
  config: NewsListConfig;
}

export default function NewsListPage({ config }: NewsListPageProps) {
  const { getContent } = useContent();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // 获取数据
  const allData: any[] = getContent(config.contentKey) || [];

  // 计算分页数据
  const { paginatedData, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    
    return { paginatedData, totalPages };
  }, [allData, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 面包屑导航数据
  const breadcrumbItems = [
    { label: 'News', href: '/news', position: 1 },
    { label: config.breadcrumbLabel, position: 2, isCurrentPage: true }
  ];

  return (
    <section className='lg:px-30 lg:pb-20 p-2.5 bg-fill-two lg:process-section'>
      {/* 导航面包屑 */}
      <div className="py-5">
        <Breadcrumb 
          items={breadcrumbItems}
          separator="slash"
          enableStructuredData={true}
          className="text-gray-600"
        />
      </div>

      {/* 页面标题和统计 */}
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-[32px] lg:text-[100px]  italic font-black lg:py-10 lg:text-left">{config.title}</h1>
        </div>

      {/* 内容网格 */}
      <div className={`grid ${config.gridCols || 'lg:grid-cols-2 grid-cols-1'} lg:gap-x-5 gap-y-8 min-h-[600px]`}>
        {paginatedData.map((item) => (
          <NewCard
            key={item.id}
            image={item.image}
            alt={item.alt}
            year={item.year}
            date={item.date}
            title={item.title}
            description={item.description}
            slug={item.slug}
            linkType={config.linkType}
            className="news-card"
          />
        ))}
      </div>

      {/* 分页组件 */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* 返回链接 */}
      <div className="text-center mt-16">
        <Link 
          href="/news"
          className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All News
        </Link>
      </div>
    </section>
  );
}