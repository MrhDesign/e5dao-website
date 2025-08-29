'use client';

import { useState, useMemo } from 'react';
import NewCard from '../../components/NewCard';
import Pagination from '../../components/Pagination';
import Breadcrumb from '../../components/Breadcrumb';
import useContent from '../../../lib/useContent';
import Link from 'next/link';

export default function ArticlesList() {
  const { getContent } = useContent();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 每页显示10条新闻
  
  // 获取所有新闻数据
  const allNewsData: any[] = getContent('news.items') || [];

  // 计算分页数据
  const { paginatedData, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allNewsData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allNewsData.length / itemsPerPage);
    
    return { paginatedData, totalPages };
  }, [allNewsData, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 面包屑导航数据
  const breadcrumbItems = [
    { label: 'News', href: '/news', position: 1 },
    { label: 'Articles', position: 2, isCurrentPage: true }
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
      <div className="mb-10">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-[100px] italic font-black py-20 lg:text-left">All Articles</h1>
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, allNewsData.length)} of {allNewsData.length} articles
          </div>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Explore our latest articles covering carbon fiber innovations, technological breakthroughs, 
          research developments, and industry insights.
        </p>
      </div>

      {/* 新闻网格 */}
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-5 gap-y-8 min-h-[600px]">
        {paginatedData.map((news) => (
          <NewCard
            key={news.id}
            image={news.image}
            alt={news.alt}
            year={news.year}
            date={news.date}
            title={news.title}
            description={news.description}
            slug={news.slug}
            className="news-card"
          />
        ))}
      </div>

      {/* 分页组件 */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="justify-center"
        />
      </div>

      {/* 返回链接 */}
      <div className="mt-16 text-center">
        <Link 
          href="/news"
          className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to News Overview
        </Link>
      </div>
    </section>
  );
}