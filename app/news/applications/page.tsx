import NewsListPage, { NewsListConfig } from '../../components/NewsListPage';

const applicationsConfig: NewsListConfig = {
  type: 'applications',
  contentKey: 'news.applications',
  title: 'Industry Applications',
  description: 'Explore how our advanced carbon fiber solutions are transforming industries from military and aerospace to medical and emergency response systems.',
  breadcrumbLabel: 'Industry Applications',
  linkType: 'application',
  gridCols: 'lg:grid-cols-2 grid-cols-1'
};

export default function IndustryApplications() {
  return <NewsListPage config={applicationsConfig} />;
}