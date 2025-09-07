/**
 * SEO React 组件
 */
'use client';

import { useEffect } from 'react';
import { seoConfig, PageType } from './config';
import { SEOOptions } from './generator';
import { structuredDataGenerator, BaseStructuredData } from './structured-data';

// SEO组件属性接口
export interface SEOProps extends Omit<SEOOptions, 'pageType'> {
  pageType: PageType;
  structuredData?: BaseStructuredData | BaseStructuredData[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

// 结构化数据组件
export function StructuredDataScript({ data }: { data: (BaseStructuredData | Record<string, unknown>) | (BaseStructuredData | Record<string, unknown>)[] }) {
  const jsonLd = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 2)
          }}
        />
      ))}
    </>
  );
}

// 主SEO组件 - 客户端组件，用于动态SEO处理
export function SEOClient({
  pageType,
  title,
  description,
  image,
  structuredData,
  breadcrumbs,
  ...options
}: SEOProps) {
  useEffect(() => {
    // 动态更新页面标题（如果需要）
    if (title && typeof document !== 'undefined') {
      const template = seoConfig.siteName;
      const finalTitle = `${title} | ${template}`;
      
      if (document.title !== finalTitle) {
        document.title = finalTitle;
      }
    }

    // 动态更新meta描述（如果需要）
    if (description && typeof document !== 'undefined') {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [title, description]);

  // 自动生成结构化数据
  const autoStructuredData: (BaseStructuredData | Record<string, unknown>)[] = [];

  // 添加组织数据（始终包含）
  autoStructuredData.push(structuredDataGenerator.generateOrganization());

  // 根据页面类型添加相应的结构化数据
  switch (pageType) {
    case PageType.PRODUCT:
      if (title && description) {
        autoStructuredData.push(structuredDataGenerator.generateProduct({
          name: title,
          description,
          image: image || seoConfig.images.ogDefault,
          category: options.category || 'Composite Materials',
          material: 'Carbon Fiber Composite'
        }));
      }
      break;

    case PageType.NEWS:
    case PageType.APPLICATION:
      if (title && description && options.publishedTime) {
        autoStructuredData.push(structuredDataGenerator.generateArticle({
          headline: title,
          description,
          image: image || seoConfig.images.ogDefault,
          author: options.author,
          datePublished: options.publishedTime,
          dateModified: options.modifiedTime,
          articleSection: options.category,
          keywords: options.keywords
        }));
      }
      break;

    case PageType.HOME:
      // 添加网站搜索框数据
      autoStructuredData.push(structuredDataGenerator.generateWebsiteSearchBox());
      break;
  }

  // 添加面包屑数据
  if (breadcrumbs && breadcrumbs.length > 0) {
    autoStructuredData.push(structuredDataGenerator.generateBreadcrumb(breadcrumbs));
  }

  // 合并自定义结构化数据
  const finalStructuredData = [
    ...autoStructuredData,
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [])
  ];

  return (
    <>
      <StructuredDataScript data={finalStructuredData} />
    </>
  );
}

// 简化的产品SEO组件
export function ProductSEO({
  name,
  description,
  image,
  category,
  url,
  ...options
}: {
  name: string;
  description: string;
  image?: string;
  category?: string;
  url?: string;
} & Partial<SEOOptions>) {
  return (
    <SEOClient
      title={name}
      description={description}
      image={image}
      category={category}
      url={url}
      pageType={PageType.PRODUCT}
      {...options}
    />
  );
}

// 简化的文章SEO组件
export function ArticleSEO({
  headline,
  description,
  image,
  publishedTime,
  modifiedTime,
  author,
  category,
  url,
  ...options
}: {
  headline: string;
  description: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  url?: string;
} & Partial<SEOOptions>) {
  return (
    <SEOClient
      title={headline}
      description={description}
      image={image}
      publishedTime={publishedTime}
      modifiedTime={modifiedTime}
      author={author}
      category={category}
      url={url}
      pageType={PageType.NEWS}
      {...options}
    />
  );
}

// 通用页面SEO Hook（服务端使用）
export function usePageSEO() {
  return {
    generateBreadcrumbs: (items: Array<{ name: string; url: string }>) =>
      structuredDataGenerator.generateBreadcrumb(items),
    
    generateProductData: (options: Parameters<typeof structuredDataGenerator.generateProduct>[0]) =>
      structuredDataGenerator.generateProduct(options),
    
    generateArticleData: (options: Parameters<typeof structuredDataGenerator.generateArticle>[0]) =>
      structuredDataGenerator.generateArticle(options),
    
    generateOrganizationData: () =>
      structuredDataGenerator.generateOrganization()
  };
}