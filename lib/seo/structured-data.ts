/**
 * 结构化数据生成器 (JSON-LD)
 */
import { seoConfig } from './config';

// 基础结构化数据类型
export interface BaseStructuredData {
  '@context': string;
  '@type': string;
}

// 组织结构化数据
export interface OrganizationData extends BaseStructuredData {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    addressCountry: string;
    addressLocality: string;
  };
  sameAs: string[];
  foundingDate?: string;
  numberOfEmployees?: string;
}

// 产品结构化数据
export interface ProductData extends BaseStructuredData {
  '@type': 'Product';
  name: string;
  description: string;
  image: string[];
  brand: {
    '@type': 'Brand';
    name: string;
  };
  manufacturer: OrganizationData;
  category: string;
  material?: string;
  offers?: {
    '@type': 'Offer';
    availability: string;
    seller: {
      '@type': 'Organization';
      name: string;
    };
  };
}

// 文章结构化数据  
export interface ArticleData extends BaseStructuredData {
  '@type': 'Article';
  headline: string;
  description: string;
  image: string[];
  author: {
    '@type': 'Person' | 'Organization';
    name: string;
  };
  publisher: OrganizationData;
  datePublished: string;
  dateModified?: string;
  articleSection?: string;
  keywords?: string[];
}

// 面包屑结构化数据
export interface BreadcrumbData extends BaseStructuredData {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

// 结构化数据生成器类
export class StructuredDataGenerator {
  private baseUrl: string;

  constructor(baseUrl: string = seoConfig.siteUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * 生成组织结构化数据
   */
  generateOrganization(): OrganizationData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: seoConfig.companyName,
      url: this.baseUrl,
      logo: `${this.baseUrl}${seoConfig.images.logo}`,
      description: seoConfig.description,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'Singapore',
        addressLocality: 'Singapore'
      },
      sameAs: [
        seoConfig.social.linkedin,
        // 可以添加更多社交媒体链接
      ],
      foundingDate: '2020', // 根据实际情况调整
      numberOfEmployees: '11-50' // 根据实际情况调整
    };
  }

  /**
   * 生成产品结构化数据
   */
  generateProduct(options: {
    name: string;
    description: string;
    image: string | string[];
    category: string;
    material?: string;
    availability?: string;
  }): ProductData {
    const images = Array.isArray(options.image) 
      ? options.image.map(img => img.startsWith('http') ? img : `${this.baseUrl}${img}`)
      : [options.image.startsWith('http') ? options.image : `${this.baseUrl}${options.image}`];

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: options.name,
      description: options.description,
      image: images,
      brand: {
        '@type': 'Brand',
        name: seoConfig.siteName
      },
      manufacturer: this.generateOrganization(),
      category: options.category,
      ...(options.material && { material: options.material }),
      offers: {
        '@type': 'Offer',
        availability: options.availability || 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: seoConfig.companyName
        }
      }
    };
  }

  /**
   * 生成文章结构化数据
   */
  generateArticle(options: {
    headline: string;
    description: string;
    image: string | string[];
    author?: string;
    datePublished: string;
    dateModified?: string;
    articleSection?: string;
    keywords?: string[];
  }): ArticleData {
    const images = Array.isArray(options.image)
      ? options.image.map(img => img.startsWith('http') ? img : `${this.baseUrl}${img}`)
      : [options.image.startsWith('http') ? options.image : `${this.baseUrl}${options.image}`];

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: options.headline,
      description: options.description,
      image: images,
      author: {
        '@type': options.author ? 'Person' : 'Organization',
        name: options.author || seoConfig.companyName
      },
      publisher: this.generateOrganization(),
      datePublished: options.datePublished,
      ...(options.dateModified && { dateModified: options.dateModified }),
      ...(options.articleSection && { articleSection: options.articleSection }),
      ...(options.keywords && { keywords: options.keywords })
    };
  }

  /**
   * 生成面包屑结构化数据
   */
  generateBreadcrumb(items: Array<{ name: string; url: string }>): BreadcrumbData {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${this.baseUrl}${item.url}`
      }))
    };
  }

  /**
   * 生成网站搜索框结构化数据
   */
  generateWebsiteSearchBox(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: seoConfig.siteName,
      url: this.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };
  }

  /**
   * 生成FAQ结构化数据
   */
  generateFAQ(faqs: Array<{ question: string; answer: string }>): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }
}

// 全局结构化数据生成器实例
export const structuredDataGenerator = new StructuredDataGenerator();