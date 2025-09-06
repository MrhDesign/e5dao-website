import NewsListPage, { NewsListConfig } from '../../components/NewsListPage';

const articlesConfig: NewsListConfig = {
  type: 'articles',
  contentKey: 'news.articles',
  title: 'All Articles',
  description: 'Explore our latest articles covering carbon fiber innovations, technological breakthroughs, research developments, and industry insights.',
  breadcrumbLabel: 'Articles',
  linkType: 'news',
  gridCols: 'lg:grid-cols-2 grid-cols-1'
};

export default function ArticlesList() {
  return <NewsListPage config={articlesConfig} />;
}