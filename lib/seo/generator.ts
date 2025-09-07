/**
 * 统一SEO元数据生成器
 */
import { Metadata } from 'next';
import { seoConfig, seoTemplates, PageType, SEOTemplate } from './config';

// SEO选项接口
export interface SEOOptions {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  pageType: PageType;
  
  // 动态内容
  category?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  
  // 控制选项
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
  
  // 自定义覆盖
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
}

/**
 * 模板字符串替换
 */
function replaceTemplate(template: string, data: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return data[key] || match;
  });
}

/**
 * 生成完整的页面元数据
 */
export function generateSEOMetadata(options: SEOOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url = '',
    pageType,
    category,
    author,
    publishedTime,
    modifiedTime,
    noIndex = false,
    noFollow = false,
    canonicalUrl,
    customTitle,
    customDescription,
    customImage
  } = options;

  // 获取页面类型对应的SEO模板
  const template: SEOTemplate = seoTemplates[pageType];
  
  // 构建模板数据
  const templateData = {
    title,
    description: description || '',
    category: category || '',
    siteName: seoConfig.siteName,
    companyName: seoConfig.companyName
  };

  // 生成最终标题
  const finalTitle = customTitle || replaceTemplate(template.titleTemplate, templateData);
  
  // 生成最终描述
  const finalDescription = customDescription || 
    (description && template.descriptionTemplate 
      ? replaceTemplate(template.descriptionTemplate, templateData)
      : description || seoConfig.description);

  // 合并关键词
  const allKeywords = [
    ...keywords,
    ...(template.keywordsTemplate || []),
    ...seoConfig.keywords.primary
  ].filter((keyword, index, array) => array.indexOf(keyword) === index); // 去重

  // 生成图片URL
  const ogImage = customImage || image || template.imageTemplate || seoConfig.images.ogDefault;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${seoConfig.siteUrl}${ogImage}`;
  
  // 生成完整URL
  const fullUrl = url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl;

  // 构建metadata对象
  const metadata: Metadata = {
    title: finalTitle,
    description: finalDescription,
    keywords: allKeywords.join(', '),
    
    // Open Graph
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: fullUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle
        }
      ],
      locale: seoConfig.locale,
      type: pageType === PageType.NEWS || pageType === PageType.APPLICATION ? 'article' : 'website',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && pageType === PageType.NEWS && { 
        authors: [author] 
      })
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.social.twitter,
      creator: author ? `@${author}` : seoConfig.social.twitter,
      title: finalTitle,
      description: finalDescription,
      images: [fullImageUrl]
    },

    // 其他元标签
    ...(canonicalUrl && { 
      alternates: { 
        canonical: canonicalUrl.startsWith('http') ? canonicalUrl : `${seoConfig.siteUrl}${canonicalUrl}`
      }
    }),

    // robots控制
    ...(noIndex || noFollow) && {
      robots: {
        index: !noIndex,
        follow: !noFollow,
        googleBot: {
          index: !noIndex,
          follow: !noFollow
        }
      }
    },

    // 结构化数据会通过单独的组件处理
    ...(author || publishedTime || modifiedTime || category) && {
      other: {
        ...(author && { 'article:author': author }),
        ...(publishedTime && { 'article:published_time': publishedTime }),
        ...(modifiedTime && { 'article:modified_time': modifiedTime }),
        ...(category && { 'article:section': category })
      }
    }
  };

  // 清理undefined值
  return JSON.parse(JSON.stringify(metadata));
}

/**
 * 快速生成常用页面类型的SEO
 */
export const seoUtils = {
  // 首页SEO
  home: (options: Partial<SEOOptions> = {}) => generateSEOMetadata({
    title: 'E5DAO',
    description: seoConfig.description,
    pageType: PageType.HOME,
    url: '/',
    ...options
  }),

  // 产品SEO
  product: (title: string, description: string, options: Partial<SEOOptions> = {}) => 
    generateSEOMetadata({
      title,
      description,
      pageType: PageType.PRODUCT,
      ...options
    }),

  // 产品列表SEO
  productList: (category: string, options: Partial<SEOOptions> = {}) =>
    generateSEOMetadata({
      title: `${category} Products`,
      category,
      pageType: PageType.PRODUCT_LIST,
      ...options
    }),

  // 解决方案SEO
  solution: (title: string, description: string, options: Partial<SEOOptions> = {}) =>
    generateSEOMetadata({
      title,
      description,
      pageType: PageType.SOLUTION,
      ...options
    }),

  // 新闻文章SEO
  news: (title: string, description: string, options: Partial<SEOOptions> = {}) =>
    generateSEOMetadata({
      title,
      description,
      pageType: PageType.NEWS,
      author: 'E5DAO Editorial Team',
      ...options
    }),

  // 应用案例SEO
  application: (title: string, description: string, options: Partial<SEOOptions> = {}) =>
    generateSEOMetadata({
      title,
      description,
      pageType: PageType.APPLICATION,
      ...options
    })
};