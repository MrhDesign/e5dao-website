import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NewCard from './NewCard';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';
import Button from './Button';
import contentData from '../../lib/content.json';

interface DetailPageProps {
  slug: string;
  type: 'news' | 'application';
}


// 通用数据获取函数
export function getContentData(slug: string, type: 'news' | 'application') {
  const isNews = type === 'news';
  const dataSource = isNews
    ? contentData.pages.news?.items || []
    : contentData.pages.industryApplications?.items || [];

  // 查找当前内容
  const content = dataSource.find((item: { slug: string }) => item.slug === slug);

  if (content) {
    // 为content.json中的内容生成详细内容
    return {
      ...content,
      content: generateDetailedContent(content),
      author: isNews ? "E5DAO Research Team" : "E5DAO Application Engineering Team",
      category: (content as { category?: string }).category || (isNews ? "Technology" : "Industrial Applications")
    };
  }

  // 如果找不到内容，返回 null
  return null;
}

// 生成详细内容
function generateDetailedContent(content: { description?: string }) {
  return `<div>${content.description || ''}</div>`;
}

// 生成面包屑导航
function generateBreadcrumbs(type: 'news' | 'application', title: string): BreadcrumbItem[] {
  if (type === 'application') {
    return [
      { label: 'News', href: '/news' },
      { label: 'Industry Applications', href: '/news/applications' },
      { label: title, isCurrentPage: true }
    ];
  } else {
    return [
      { label: 'News', href: '/news' },
      { label: 'Articles', href: '/news/articles' },
      { label: title, isCurrentPage: true }
    ];
  }
}

// 生成Metadata
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

  const fullImageUrl = content.image.startsWith('http')
    ? content.image
    : `${siteUrl}${content.image}`;

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

// 通用详情页组件
export default function DetailPage({ slug, type }: DetailPageProps) {
  const content = getContentData(slug, type);

  // 获取相关内容
  const isNews = type === 'news';
  const allData = isNews
    ? contentData.pages.news?.items || []
    : contentData.pages.industryApplications?.items || [];

  const relatedContent = allData
    .filter((item: { slug: string }) => item.slug !== slug)
    .slice(0, 4);

  if (!content) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs(type, content.title);
  const urlPath = isNews ? `/news/articles/${slug}` : `/news/applications/${slug}`;

  // 生成结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": isNews ? "NewsArticle" : "Article",
    "headline": content.title,
    "description": content.description,
    "image": [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'}${content.image}`
    ],
    "datePublished": isNews
      ? `${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '01'}T09:00:00Z`
      : `${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '15'}T09:00:00Z`,
    "dateModified": isNews
      ? `${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '01'}T09:00:00Z`
      : `${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '15'}T09:00:00Z`,
    "author": {
      "@type": content.author?.includes('Dr.') || content.author?.includes('Prof.') ? "Person" : "Organization",
      "name": content.author || "E5DAO",
      "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'
    },
    "publisher": {
      "@type": "Organization",
      "name": "E5DAO",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'}/logo.png`,
        "width": 600,
        "height": 60
      },
      "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'}${urlPath}`
    },
    "articleSection": content.category || (isNews ? "Technology" : "Industry Applications"),
    "keywords": isNews
      ? `carbon fiber, ${content.category || 'technology'}, materials science, innovation`
      : `carbon fiber applications, industry solutions, ${content.category || 'industrial applications'}, case study`,
    "wordCount": content.content.replace(/<[^>]*>/g, '').split(' ').length,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    ...(relatedContent.length > 0 && {
      "relatedLink": relatedContent.map((related: { slug: string }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'}${isNews ? `/news/articles/${related.slug}` : `/news/applications/${related.slug}`}`
      )
    })
  };

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <article className="min-h-screen bg-fill-one" itemScope itemType="https://schema.org/Article">
        {/* Hero Header */}
        <header className="relative lg:h-86 h-64 overflow-hidden">
          <Image
            src={content.image}
            alt={`${content.alt} - ${content.title} | E5DAO Carbon Fiber Technology`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />

          {/* 背景图遮罩 */}
          <div className="absolute inset-0 bg-black/65" />
          
          <div className="absolute inset-0 flex items-center lg:px-30 px-5">
            <div className="text-white">

              {/* 主标题 */}
              <h1 className="headline2 text-text-white mb-2.5 leading-tight">
                {content.title}
              </h1>

              {/* 时间和分类信息 */}
              <div className="flex  items-center gap-4 mb-6">
                <time
                  className="lg:text-xl text-sm"
                  dateTime={`${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '01'}`}
                >
                  {content.publishedDate?.month && content.publishedDate?.day 
                    ? `${new Date(`${content.publishedDate.year}-${content.publishedDate.month}-${content.publishedDate.day}`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} ${content.publishedDate.year}`
                    : `${content.publishedDate?.year || '2025'}`}
                </time>

                {content.category && (
                  <span className="bg-fill-brand text-white px-4 py-2 rounded-full text-sm font-medium">
                    {content.category}
                  </span>
                )}
              </div>

              {/* 描述文字 */}
              <p className="sr-only">
                {content.description}
              </p>

              {/* 作者信息和阅读时间 */}
              <div className="flex items-center gap-6">
                {content.author && (
                  <div className="flex items-center text-base">
                    <span>By :</span>
                    <span itemProp="author">{content.author}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">
                    {Math.ceil(content.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 面包屑导航 */}
        <div className="hidden lg:block px-30  py-4">
          <Breadcrumb
            items={breadcrumbs}
            separator="slash"
            enableStructuredData={true}
            className="text-text-display"
          />
        </div>

        {/* 内容主体 */}
        <main className="lg:px-30 px-5 py-10">
            <div
              className="text-text-black leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
        </main>

        {/* 应用案例特有的CTA */}
        {!isNews && (
          <div className="mt-16 text-center bg-fill-four p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Interested in This Solution?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team can develop similar solutions tailored to your specific requirements.
              Contact us to discuss how carbon fiber technology can benefit your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
              >
                <Button className="">
                  Contact Our Experts
                </Button>
              </Link>
              <Link
                href="/news/applications"
              >
                <Button className="">
                  View All Applications
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* 相关内容 */}
        {relatedContent.length > 0 && (
          <section className="lg:px-30 px-5 py-10  border-t border-border-one">
            <h2 className="text-3xl font-black mb-8 text-center">
              {isNews ? 'Related Articles' : 'Related Applications'}
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              {relatedContent.map((related: { 
                id: string; 
                image: string; 
                alt: string; 
                publishedDate?: { year?: string; month?: string; day?: string }; 
                title: string; 
                description: string; 
                slug: string;
              }) => (
                <NewCard
                  key={related.id}
                  image={related.image}
                  alt={related.alt}
                  year={related.publishedDate?.year || '2025'}
                  date={related.publishedDate?.month && related.publishedDate?.day 
                    ? new Date(`${related.publishedDate.year}-${related.publishedDate.month}-${related.publishedDate.day}`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
                    : ''}
                  title={related.title}
                  description={related.description}
                  slug={related.slug}
                  linkType={isNews ? 'news' : 'application'}
                />
              ))}
            </div>
          </section>
        )}

      </article>
    </>
  );
}

