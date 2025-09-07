// 全局SEO元数据生成器
import { Metadata } from 'next';

// 基础SEO配置
export const seoConfig = {
  siteName: 'E5DAO',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com',
  companyName: 'E5DAO',
  description: 'Leading Singapore-based manufacturer of high-performance carbon fiber composite materials. Specializing in mobile command systems, emergency medical equipment, and aerospace-grade protective solutions.',
  keywords: {
    primary: [
      'carbon fiber',
      'composite materials',
      'Singapore manufacturer',
      'E5DAO'
    ],
    products: [
      'mobile command post',
      'emergency medical system',
      'aerospace materials',
      'defense equipment',
      'tactical solutions',
      'medical device protection'
    ],
    industries: [
      'defense',
      'medical',
      'aerospace',
      'military',
      'emergency response',
      'industrial equipment'
    ]
  },
  social: {
    twitter: '@e5dao',
    linkedin: 'https://linkedin.com/company/e5dao'
  },
  images: {
    logo: '/logo.png',
    ogDefault: '/images/og-default.jpg',
    twitterDefault: '/images/twitter-card-default.jpg'
  }
};

// 页面类型枚举
export enum PageType {
  HOME = 'home',
  PRODUCT = 'product',
  SOLUTION = 'solution',
  NEWS = 'news',
  APPLICATION = 'application',
  ABOUT = 'about',
  CONTACT = 'contact',
  LIST = 'list'
}

// 元数据生成接口
interface MetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: PageType;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

// 生成完整的页面元数据
export function generatePageMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url = '',
    type = PageType.HOME,
    publishedTime,
    modifiedTime,
    author,
    category,
    noIndex = false,
    canonicalUrl
  } = options;

  // 构建完整的URL
  const fullUrl = `${seoConfig.siteUrl}${url}`;
  const imageUrl = image ? `${seoConfig.siteUrl}${image}` : `${seoConfig.siteUrl}${seoConfig.images.ogDefault}`;
  const twitterImageUrl = image ? `${seoConfig.siteUrl}${image}` : `${seoConfig.siteUrl}${seoConfig.images.twitterDefault}`;

  // 合并关键词
  const allKeywords = [
    ...seoConfig.keywords.primary,
    ...keywords,
    ...(type === PageType.PRODUCT ? seoConfig.keywords.products : []),
    ...(category ? [category.toLowerCase()] : [])
  ].filter(Boolean);

  // 基础元数据
  const metadata: Metadata = {
    title,
    description,
    keywords: allKeywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: seoConfig.companyName }],
    creator: seoConfig.companyName,
    publisher: seoConfig.companyName,
    alternates: {
      canonical: canonicalUrl || fullUrl
    },
    openGraph: {
      type: getOpenGraphType(type),
      title,
      description,
      url: fullUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.social.twitter,
      creator: seoConfig.social.twitter,
      title,
      description,
      images: [twitterImageUrl]
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };

  // 添加文章特定的元数据
  if (type === PageType.NEWS || type === PageType.APPLICATION) {
    if (publishedTime) {
      metadata.openGraph!.publishedTime = publishedTime;
    }
    if (modifiedTime) {
      metadata.openGraph!.modifiedTime = modifiedTime;
    }
    if (author) {
      metadata.openGraph!.authors = [author];
    }
    if (category) {
      metadata.openGraph!.section = category;
    }
  }

  // 添加产品特定的元数据
  if (type === PageType.PRODUCT) {
    metadata.openGraph!.type = 'product' as any;
  }

  return metadata;
}

// 获取OpenGraph类型
function getOpenGraphType(pageType: PageType): string {
  switch (pageType) {
    case PageType.NEWS:
    case PageType.APPLICATION:
      return 'article';
    case PageType.PRODUCT:
      return 'product';
    default:
      return 'website';
  }
}

// 生成结构化数据
export function generateStructuredData(options: {
  type: 'Organization' | 'Product' | 'Article' | 'BreadcrumbList' | 'WebSite';
  data: any;
}) {
  const { type, data } = options;
  const baseUrl = seoConfig.siteUrl;

  const commonContext = {
    '@context': 'https://schema.org'
  };

  switch (type) {
    case 'Organization':
      return {
        ...commonContext,
        '@type': 'Organization',
        name: seoConfig.companyName,
        alternateName: 'E5DAO New Material',
        url: baseUrl,
        logo: `${baseUrl}${seoConfig.images.logo}`,
        foundingDate: '2020',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'SG',
          addressLocality: 'Singapore'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          areaServed: ['SG', 'MY', 'TH', 'ID', 'VN', 'PH'],
          availableLanguage: ['English', 'Chinese']
        },
        sameAs: [
          seoConfig.social.linkedin,
          `https://twitter.com/${seoConfig.social.twitter.replace('@', '')}`
        ],
        ...data
      };

    case 'WebSite':
      return {
        ...commonContext,
        '@type': 'WebSite',
        name: seoConfig.siteName,
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        },
        ...data
      };

    case 'Product':
      return {
        ...commonContext,
        '@type': 'Product',
        brand: {
          '@type': 'Brand',
          name: seoConfig.companyName
        },
        manufacturer: {
          '@type': 'Organization',
          name: seoConfig.companyName
        },
        ...data
      };

    case 'Article':
      return {
        ...commonContext,
        '@type': 'TechArticle',
        publisher: {
          '@type': 'Organization',
          name: seoConfig.companyName,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}${seoConfig.images.logo}`
          }
        },
        ...data
      };

    case 'BreadcrumbList':
      return {
        ...commonContext,
        '@type': 'BreadcrumbList',
        itemListElement: data.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url ? `${baseUrl}${item.url}` : undefined
        }))
      };

    default:
      return { ...commonContext, '@type': type, ...data };
  }
}

// 为特定页面类型生成SEO标题
export function generateSEOTitle(baseName: string, pageType: PageType, category?: string): string {
  const suffix = 'E5DAO';
  
  switch (pageType) {
    case PageType.HOME:
      return `${baseName} | ${suffix}`;
    case PageType.PRODUCT:
      return `${baseName} - Carbon Fiber ${category || 'Solutions'} | ${suffix}`;
    case PageType.SOLUTION:
      return `${baseName} - Professional Solutions | ${suffix}`;
    case PageType.NEWS:
      return `${baseName} - Technology Insights | ${suffix}`;
    case PageType.APPLICATION:
      return `${baseName} - Industry Applications | ${suffix}`;
    case PageType.ABOUT:
      return `${baseName} | About ${suffix}`;
    case PageType.CONTACT:
      return `${baseName} | Contact ${suffix}`;
    case PageType.LIST:
      return `${baseName} | ${suffix}`;
    default:
      return `${baseName} | ${suffix}`;
  }
}

// 生成SEO友好的描述
export function generateSEODescription(
  baseName: string, 
  content: string, 
  pageType: PageType,
  maxLength: number = 160
): string {
  let description = '';
  
  switch (pageType) {
    case PageType.PRODUCT:
      description = `${baseName}: ${content} Professional-grade carbon fiber solutions from E5DAO, Singapore's leading composite materials manufacturer.`;
      break;
    case PageType.SOLUTION:
      description = `${baseName}: ${content} Advanced composite material solutions designed for defense, medical, and aerospace applications.`;
      break;
    case PageType.NEWS:
      description = `${content} Latest insights from E5DAO's technical team on carbon fiber innovations and industry developments.`;
      break;
    case PageType.APPLICATION:
      description = `${baseName}: ${content} Real-world applications of E5DAO's carbon fiber composite solutions.`;
      break;
    default:
      description = content;
  }

  // 截断到指定长度
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3).trim() + '...';
  }

  return description;
}