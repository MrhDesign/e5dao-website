// 服务端metadata生成器
import { Metadata } from 'next';
import contentData from './content.json';

// 通用数据获取函数（服务端版本）
export function getContentData(slug: string, type: 'news' | 'application') {
  const isNews = type === 'news';
  const dataSource = isNews
    ? contentData.pages.news?.articles || []
    : contentData.pages.news.applications || [];

  // 查找当前内容
  const content = dataSource.find((item: { slug: string }) => item.slug === slug);

  if (content) {
    // 为content.json中的内容生成详细内容
    return {
      ...content,
      content: generateDetailedContent(content),
      author: "E5DAO Research Team",
      category: (content as { category?: string }).category || (isNews ? "Technology" : "Industrial Applications")
    };
  }

  return null;
}

// 生成详细内容
function generateDetailedContent(content: { description?: string }) {
  return `<div>${content.description || ''}</div>`;
}

// 生成Metadata（服务端版本）
export function generateDetailMetadata(
  slug: string,
  type: 'news' | 'application'
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com';
  const content = getContentData(slug, type);

  if (!content) {
    const notFoundTitle = type === 'news' ? 'Article Not Found - E5DAO' : 'Application Not Found - E5DAO';
    const notFoundDesc = type === 'news'
      ? 'The article you are looking for could not be found.'
      : 'The application case you are looking for could not be found.';

    return {
      title: notFoundTitle,
      description: notFoundDesc,
    };
  }

  const urlPath = type === 'news' ? `/news/articles/${slug}` : `/news/applications/${slug}`;
  const titleSuffix = type === 'news' ? 'E5DAO' : 'E5DAO Industry Applications';
  const keywordsBase = type === 'news'
    ? ['carbon fiber', 'materials science', 'innovation', 'technology']
    : ['carbon fiber applications', 'industry solutions', 'composite materials'];

  const fullImageUrl = `${siteUrl}${contentData.pages.news.defaultImage}`;

  return {
    title: `${content.title} - ${titleSuffix}`,
    description: content.description,
    keywords: [
      ...keywordsBase,
      content.category?.toLowerCase() || (type === 'news' ? 'engineering' : 'industrial'),
      'E5DAO'
    ].join(', '),
    authors: content.author ? [{ name: content.author }] : [{ name: 'E5DAO' }],
    openGraph: {
      type: 'article',
      title: content.title,
      description: content.description,
      url: `${siteUrl}${urlPath}`,
      siteName: 'E5DAO',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
      publishedTime: type === 'news'
        ? `${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '01'}T09:00:00Z`
        : `${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '15'}T09:00:00Z`,
      section: content.category || (type === 'news' ? 'Technology' : 'Industry Applications'),
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: `${siteUrl}${urlPath}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}