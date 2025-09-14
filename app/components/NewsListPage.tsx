'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NewCard from './NewCard';
import Pagination from './Pagination';
// import Breadcrumb from './Breadcrumb';
import useContent from '../../lib/useContent';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemsPerPage = 10;
  
  // 从URL参数获取当前页面，默认为第1页
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
  });

  // 监听URL参数变化
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const urlPage = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, [searchParams, currentPage]);

  // 计算分页数据
  const { paginatedData, totalPages, validCurrentPage } = useMemo(() => {
    // 获取数据
    const allData: Array<{
      id: number;
      image: string;
      alt: string;
      publishedDate: { year: string; month: string; day: string };
      title: string;
      description: string;
      slug: string;
    }> = getContent(config.contentKey) || [];
    
    // 按发布日期排序 (最新的在前)
    const sortedData = [...allData].sort((a, b) => {
      const dateA = new Date(`${a.publishedDate.year}-${a.publishedDate.month}-${a.publishedDate.day}`);
      const dateB = new Date(`${b.publishedDate.year}-${b.publishedDate.month}-${b.publishedDate.day}`);
      return dateB.getTime() - dateA.getTime(); // 降序排列 (最新在前)
    });
    
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    
    // 确保当前页面在有效范围内
    const validCurrentPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));
    
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return { paginatedData, totalPages, validCurrentPage };
  }, [getContent, config.contentKey, currentPage, itemsPerPage]);

  // 如果当前页面超出范围，自动修正
  useEffect(() => {
    if (validCurrentPage !== currentPage && totalPages > 0) {
      const currentParams = new URLSearchParams(searchParams.toString());
      if (validCurrentPage === 1) {
        currentParams.delete('page');
      } else {
        currentParams.set('page', validCurrentPage.toString());
      }
      
      const newUrl = currentParams.toString() 
        ? `${window.location.pathname}?${currentParams.toString()}`
        : window.location.pathname;
      
      router.replace(newUrl);
      setCurrentPage(validCurrentPage);
    }
  }, [validCurrentPage, currentPage, totalPages, searchParams, router]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // 更新URL参数
    const currentParams = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      // 如果是第一页，移除page参数保持URL简洁
      currentParams.delete('page');
    } else {
      currentParams.set('page', page.toString());
    }
    
    const newUrl = currentParams.toString() 
      ? `${window.location.pathname}?${currentParams.toString()}`
      : window.location.pathname;
    
    // 使用replace而不是push，避免在浏览器历史中创建过多条目
    router.replace(newUrl);
    
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 面包屑导航数据
  // const breadcrumbItems = [
  //   { label: 'News', href: '/news', position: 1 },
  //   { label: config.breadcrumbLabel, position: 2, isCurrentPage: true }
  // ];

  return (
    <section className='lg:px-30 lg:pb-20 p-5 bg-fill-two lg:process-section'>
      {/* 导航面包屑 */}
      {/* <div className="hidden lg:block py-5">
        <Breadcrumb
          items={breadcrumbItems}
          separator="slash"
          enableStructuredData={true}
          className="text-gray-600"
        />
      </div> */}

      {/* 页面标题和统计 */}

      <div className='flex justify-between items-end'>
        <h1 className="text-[32px] lg:text-[100px] italic font-black lg:py-10 py-5">{config.title}</h1>
      </div>

      {/* 内容网格 */}
      <div className={`grid ${config.gridCols || 'lg:grid-cols-2 grid-cols-1'} lg:gap-x-5 gap-y-2.5`}>
        {paginatedData.map((item) => (
          <NewCard
            key={item.id}
            image={item.image}
            alt={item.alt}
            year={item.publishedDate.year}
            date={`${item.publishedDate.month}/${item.publishedDate.day}`}
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
            currentPage={validCurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}