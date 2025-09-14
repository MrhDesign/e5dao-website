'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NewCard from './NewCard';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';
import Button from './Button';
import RichContentRenderer from './RichContentRenderer';
import ShareButtons from './ShareButtons';
import ViewCounter from './ViewCounter';
import { SEOContentOptimizer } from '../../lib/seo-optimizer';
import { getContentData } from '../../lib/metadata-generator';
import contentData from '../../lib/content.json';

interface DetailPageProps {
  slug: string;
  type: 'news' | 'application';
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
      // { label: 'Articles', href: '/news/articles' },
      { label: title, isCurrentPage: true }
    ];
  }
}


// 通用详情页组件
export default function DetailPage({ slug, type }: DetailPageProps) {
  const content = getContentData(slug, type);

  // 获取相关内容
  const isNews = type === 'news';
  const allData = isNews
    ? contentData.pages.news?.articles || []
    : contentData.pages.news?.applications || [];

  // 按发布日期排序并获取相关内容
  const relatedContent = allData
    .filter((item: { slug: string }) => item.slug !== slug)
    .sort((a: { publishedDate: { year: string; month: string; day: string }}, 
           b: { publishedDate: { year: string; month: string; day: string }}) => {
      const dateA = new Date(`${a.publishedDate.year}-${a.publishedDate.month}-${a.publishedDate.day}`);
      const dateB = new Date(`${b.publishedDate.year}-${b.publishedDate.month}-${b.publishedDate.day}`);
      return dateB.getTime() - dateA.getTime(); // 降序排列 (最新在前)
    })
    .slice(0, 4);

  if (!content) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs(type, content.title);
  const urlPath = isNews ? `/news/articles/${slug}` : `/news/applications/${slug}`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com';
  const currentUrl = `${baseUrl}${urlPath}`;

  // 使用SEO优化器生成结构化数据
  const seoOptimizer = new SEOContentOptimizer();
  const structuredData = seoOptimizer.generateStructuredData({
    title: content.title,
    description: content.description,
    keywords: ['carbon fiber', 'technology', 'materials science'],
    content: content.content,
    publishDate: `${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '01'}T09:00:00Z`,
    modifiedDate: `${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '01'}T09:00:00Z`,
    author: content.author || 'E5DAO Research Team',
    imageUrl: contentData.pages.news.defaultImage
  }, baseUrl);

  return (
    <>
      {/* 增强的结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />

      <article className="min-h-screen bg-fill-one" itemScope itemType="https://schema.org/Article">
        {/* Hero Header - 恢复原来的设计 */}
        <header className="relative lg:h-86 h-64 overflow-hidden">
          <Image
            src={contentData.pages.news.defaultImage}
            alt={`${content.alt} - ${content.title} | E5DAO Carbon Fiber`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={75}
          />

          {/* 背景图遮罩 */}
          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute inset-0 flex items-center lg:px-30 px-5">
            <div className="text-white">
              {/* 主标题 */}
              <h1 className="headline1 text-text-white mb-2.5 leading-tight" itemProp="headline">
                {content.title}
              </h1>

              {/* 时间和分类信息 */}
              <div className="flex items-center gap-4 lg:mb-5 mb-2.5">
                <time
                  className="lg:text-xl text-sm"
                  dateTime={`${content.publishedDate?.year || '2025'}-${content.publishedDate?.month || '06'}-${content.publishedDate?.day || '01'}`}
                  itemProp="datePublished"
                >
                  {content.publishedDate?.month && content.publishedDate?.day
                    ? `${content.publishedDate.year}/${content.publishedDate.month}/${content.publishedDate.day}`
                    : `${content.publishedDate?.year || '2025'}`}
                </time>

                {content.category && (
                  <span className="bg-fill-brand text-white px-2 py-1 rounded-full lg:text-base text-sm font-medium">
                    {content.category}
                  </span>
                )}
              </div>

              {/* 描述文字 */}
              <p className="sr-only" itemProp="description">
                {content.description}
              </p>

              {/* 作者信息和阅读时间 */}
              <div className="flex lg:flex-row flex-col lg:items-center lg:gap-6 gap-2.5">
                {content.author && (
                  <div className="flex items-center text-base">
                    <span>By :</span>
                    <span itemProp="author">{content.author}</span>
                  </div>
                )}
                <div className='flex items-center gap-6'>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">
                      {Math.ceil(content.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read
                    </span>
                  </div>
                  <ViewCounter
                    slug={content.slug}
                    className="text-white"
                    autoIncrement={true}
                  />
                </div>

              </div>
            </div>
          </div>
        </header>

        {/* 面包屑导航 - 恢复原来的位置 */}
        <div className="hidden lg:block px-30 py-4">
          <Breadcrumb
            items={breadcrumbs}
            separator="slash"
            enableStructuredData={true}
            className="text-text-display"
          />
        </div>

        {/* 内容主体 - 恢复原来的布局但使用WangEditor渲染器 */}
        <main className="lg:px-30 px-5 py-10">
          <div className="flex justify-center lg:gap-10 gap-5">
            {/* 主内容区域 */}
            <div className="flex-1 lg:max-w-[1240px] w-full overflow-hidden" itemProp="articleBody">
              <RichContentRenderer
                content={content.content}
                className="mb-8"
                enhanceContent={true}
                generateTOC={true}
              />

              {/* 分享按钮 - 简化版本 */}
              <div className="pt-8 border-t border-gray-200">
                <ShareButtons
                  url={currentUrl}
                  title={content.title}
                  description={content.description}
                  className=""
                />
              </div>
            </div>
          </div>
        </main>

        {/* 应用案例特有的CTA - 恢复原来的样式 */}
        {!isNews && (
          <div className="lg:mx-30 mx-5 mb-10 text-center bg-fill-four p-12 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Interested in This Solution?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team can develop similar solutions tailored to your specific requirements.
              Contact us to discuss how carbon fiber technology can benefit your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button>Contact Our Experts</Button>
              </Link>
            </div>
          </div>
        )}

        {/* 相关内容 - 恢复原来的布局 */}
        {relatedContent.length > 0 && (
          <section className="lg:px-30 px-5 py-10 border-t border-border-one">
            <h2 className="text-3xl font-semibold mb-8">
              {isNews ? 'Related Articles' : 'Related Applications'}
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              {relatedContent.map((related: {
                id: number;
                image: string;
                alt: string;
                publishedDate: { year: string; month: string; day: string };
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
                    ? `${related.publishedDate.month}/${related.publishedDate.day}`
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

