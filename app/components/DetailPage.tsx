import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NewCard from './NewCard';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';
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
  const content = dataSource.find((item: any) => item.slug === slug);
  
  if (content) {
    // 为content.json中的内容生成详细内容
    return {
      ...content,
      content: generateDetailedContent(content, type),
      author: isNews ? "E5DAO Research Team" : "E5DAO Application Engineering Team",
      category: (content as any).category || (isNews ? "Technology" : "Industrial Applications")
    };
  }
  
  // 如果找不到内容，返回 null
  return null;
}

// 生成详细内容
function generateDetailedContent(content: any, type: 'news' | 'application') {
  if (type === 'news') {
    return `
      <p>${content.description}</p>
      
      <h2>Key Advantages and Applications</h2>
      <p>Our advanced carbon fiber technology represents a significant breakthrough in materials science, 
      offering unprecedented strength-to-weight ratios that are transforming industries worldwide.</p>
      
      <h3>Technical Specifications</h3>
      <ul>
        <li>Superior tensile strength compared to steel</li>
        <li>Lightweight construction reducing overall weight by up to 60%</li>
        <li>Excellent corrosion resistance in harsh environments</li>
        <li>Low thermal expansion for dimensional stability</li>
        <li>Customizable fiber orientation for specific load requirements</li>
      </ul>
      
      <h3>Industry Impact</h3>
      <p>The adoption of carbon fiber technology across multiple sectors demonstrates its versatility 
      and effectiveness. From aerospace applications to medical equipment, carbon fiber continues 
      to set new standards for performance.</p>
      
      <blockquote>
        <p>"Carbon fiber technology is not just about creating lighter products; it's about reimagining 
        what's possible in engineering and design."</p>
        <footer>— E5DAO Research Team</footer>
      </blockquote>
    `;
  } else {
    return `
      <p>${content.description}</p>
      
      <h2>Solution Overview</h2>
      <p>This innovative carbon fiber solution addresses critical industry challenges while providing superior performance characteristics that traditional materials cannot match.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Exceptional strength-to-weight ratio</li>
        <li>Superior durability and longevity</li>
        <li>Resistance to environmental factors</li>
        <li>Customizable design flexibility</li>
        <li>Reduced maintenance requirements</li>
      </ul>
      
      <h3>Technical Specifications</h3>
      <p>Our engineering team has optimized every aspect of this solution to meet the demanding requirements of professional applications while maintaining cost-effectiveness.</p>
      
      <h3>Implementation Process</h3>
      <p>We work closely with clients throughout the implementation process, from initial consultation and design through manufacturing, testing, and deployment.</p>
      
      <blockquote>
        <p>"This solution has exceeded our expectations in both performance and reliability, setting new standards for our industry."</p>
        <footer>— Industry Partner</footer>
      </blockquote>
      
      <h3>Future Developments</h3>
      <p>Ongoing research and development efforts continue to enhance these solutions, incorporating the latest advances in materials science and manufacturing technology.</p>
    `;
  }
}

// 生成面包屑导航
function generateBreadcrumbs(type: 'news' | 'application', title: string): BreadcrumbItem[] {
  if (type === 'application') {
    return [
      { label: 'News', href: '/news', position: 1 },
      { label: 'Industry Applications', href: '/news/applications', position: 2 },
      { label: title, position: 3, isCurrentPage: true }
    ];
  } else {
    return [
      { label: 'News', href: '/news', position: 1 },
      { label: 'Articles', href: '/news/articles', position: 2 },
      { label: title, position: 3, isCurrentPage: true }
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
        ? `${content.year}-06-${content.date.split(' ')[1].padStart(2, '0')}T09:00:00Z`
        : '2025-06-01T09:00:00Z',
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
    .filter((item: any) => item.slug !== slug)
    .slice(0, 3);

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
      ? `${content.year}-06-${content.date.split(' ')[1].padStart(2, '0')}T09:00:00Z`
      : '2025-06-01T09:00:00Z',
    "dateModified": isNews 
      ? `${content.year}-06-${content.date.split(' ')[1].padStart(2, '0')}T09:00:00Z`
      : '2025-06-01T09:00:00Z',
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
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'}${urlPath}`
    },
    "articleSection": content.category || (isNews ? "Technology" : "Industry Applications"),
    "keywords": isNews 
      ? `carbon fiber, ${content.category || 'technology'}, materials science, innovation`
      : `carbon fiber applications, industry solutions, ${content.category || 'industrial applications'}, case study`
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

      <article className="lg:px-30 lg:py-20 p-5 bg-fill-two">
        {/* 面包屑导航 */}
        <div className="mb-8">
          <Breadcrumb 
            items={breadcrumbs}
            separator="slash"
            enableStructuredData={true}
            className="text-gray-600"
          />
        </div>

        {/* 内容头部 */}
        <header className="mb-12">
          <div className="mb-6">
            {isNews ? (
              <time 
                className="text-sm text-gray-500 font-medium"
                dateTime={`${content.year}-06-${content.date.split(' ')[1].padStart(2, '0')}`}
              >
                {content.year} {content.date}
              </time>
            ) : (
              <span className="text-sm text-gray-500 font-medium">Case Study</span>
            )}
            
            {content.category && (
              <span className={`ml-4 px-3 py-1 rounded-full text-sm ${
                isNews ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {content.category}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-black leading-tight text-gray-900 mb-6">
            {content.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
            {content.description}
          </p>

          {content.author && (
            <div className="mt-6 flex items-center text-gray-600">
              <span>By</span>
              <span className="ml-2 font-medium text-gray-900">{content.author}</span>
            </div>
          )}
        </header>

        {/* 主图片 */}
        <div className="mb-12">
          <div className="relative w-full h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src={content.image}
              alt={content.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>
        </div>

        {/* 内容主体 */}
        <div className="prose prose-lg max-w-4xl mx-auto mb-16">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </div>

        {/* 相关内容 */}
        {relatedContent.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-black mb-8 text-center">
              {isNews ? 'Related Articles' : 'Related Applications'}
            </h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {relatedContent.map((related: any) => (
                <NewCard
                  key={related.id}
                  image={related.image}
                  alt={related.alt}
                  year={related.year}
                  date={related.date}
                  title={related.title}
                  description={related.description}
                  slug={related.slug}
                  linkType={isNews ? 'news' : 'application'}
                  className="news-card"
                />
              ))}
            </div>
          </section>
        )}

        {/* 应用案例特有的CTA */}
        {!isNews && (
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-green-50 p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Interested in This Solution?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team can develop similar solutions tailored to your specific requirements. 
              Contact us to discuss how carbon fiber technology can benefit your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors font-semibold"
              >
                Contact Our Experts
              </Link>
              <Link 
                href="/news/applications"
                className="inline-flex items-center px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors font-semibold"
              >
                View All Applications
              </Link>
            </div>
          </div>
        )}

        {/* 返回链接 */}
        <div className="text-center mt-16">
          <Link 
            href={isNews ? "/news" : "/news/applications"}
            className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isNews ? 'Back to All News' : 'Back to All Applications'}
          </Link>
        </div>
      </article>
    </>
  );
}

