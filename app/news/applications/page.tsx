'use client';

import { useState, useMemo } from 'react';
import NewCard from '../../components/NewCard';
import Pagination from '../../components/Pagination';
import Breadcrumb from '../../components/Breadcrumb';
import useContent from '../../../lib/useContent';
import Link from 'next/link';

export default function IndustryApplications() {
  const { getContent } = useContent();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 每页显示10个应用案例
  
  // 获取所有行业应用案例数据
  const allApplicationsData: any[] = getContent('industryApplications.items') || [];

  // 计算分页数据
  const { paginatedData, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allApplicationsData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allApplicationsData.length / itemsPerPage);
    
    return { paginatedData, totalPages };
  }, [allApplicationsData, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 面包屑导航数据
  const breadcrumbItems = [
    { label: 'News', href: '/news', position: 1 },
    { label: 'Industry Applications', position: 2, isCurrentPage: true }
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
          <h1 className="text-[100px] italic font-black py-20 lg:text-left">Industry Applications</h1>
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, allApplicationsData.length)} of {allApplicationsData.length} applications
          </div>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Explore how our advanced carbon fiber solutions are transforming industries from military 
          and aerospace to medical and emergency response systems.
        </p>
      </div>

      {/* 应用案例分类说明 */}
      <div className="mb-12 grid lg:grid-cols-3 grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Military & Defense</h3>
          <p className="text-gray-600 text-sm">Mobile command posts, tactical equipment, and defense applications</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Aerospace & Transportation</h3>
          <p className="text-gray-600 text-sm">Aircraft components, transportation containers, and mobility solutions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Medical & Emergency</h3>
          <p className="text-gray-600 text-sm">Medical equipment cases, rescue systems, and emergency response tools</p>
        </div>
      </div>

      {/* 应用案例网格 */}
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-5 gap-y-8 min-h-[600px]">
        {paginatedData.map((application) => (
          <NewCard
            key={application.id}
            image={application.image}
            alt={application.alt}
            year={application.year}
            date={application.date}
            title={application.title}
            description={application.description}
            slug={application.slug}
            linkType="application"
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

      {/* 联系我们区域 */}
      <div className="mt-16 text-center bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team can develop tailored carbon fiber solutions for your specific industry requirements. 
          Contact us to discuss your project needs.
        </p>
        <Link 
          href="/contact"
          className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
        >
          Contact Our Experts
        </Link>
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