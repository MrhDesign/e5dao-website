import { Suspense } from 'react';
import NewsListPage, { NewsListConfig } from '../components/NewsListPage';

// 将 articles 作为新闻首页的默认内容
const articlesConfig: NewsListConfig = {
  type: 'articles',
  contentKey: 'news.articles',
  title: 'Media Center',
  description: 'Explore our latest articles covering carbon fiber innovations, technological breakthroughs, research developments, and industry insights.',
  breadcrumbLabel: 'News',
  linkType: 'news',
  gridCols: 'lg:grid-cols-2 grid-cols-1'
};

export default function News() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-20">Loading...</div>}>
      <NewsListPage config={articlesConfig} />
    </Suspense>
  );
}