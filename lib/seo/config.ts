/**
 * 统一SEO配置文件
 */

// SEO配置接口
export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  companyName: string;
  description: string;
  keywords: {
    primary: string[];
    products: string[];
    industries: string[];
  };
  social: {
    twitter: string;
    linkedin: string;
  };
  images: {
    logo: string;
    ogDefault: string;
    twitterDefault: string;
  };
  locale: string;
  alternateLocales?: string[];
}

// 页面类型枚举
export enum PageType {
  HOME = 'home',
  PRODUCT = 'product',
  PRODUCT_LIST = 'product-list',
  SOLUTION = 'solution',
  NEWS = 'news',
  APPLICATION = 'application',
  ABOUT = 'about',
  CONTACT = 'contact'
}

// SEO全局配置
export const seoConfig: SEOConfig = {
  siteName: 'E5DAO',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com',
  companyName: 'E5DAO Pte. Ltd.',
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
  },
  locale: 'en-US',
  alternateLocales: ['zh-CN', 'zh-SG']
};

// 页面SEO模板
export interface SEOTemplate {
  titleTemplate: string;
  descriptionTemplate?: string;
  keywordsTemplate?: string[];
  imageTemplate?: string;
  structuredDataType?: string;
}

// 不同页面类型的SEO模板
export const seoTemplates: Record<PageType, SEOTemplate> = {
  [PageType.HOME]: {
    titleTemplate: '{title} | Premium Carbon Fiber Solutions',
    descriptionTemplate: '{description} | Leading manufacturer in Singapore.',
    keywordsTemplate: [...seoConfig.keywords.primary, ...seoConfig.keywords.industries],
    imageTemplate: seoConfig.images.ogDefault,
    structuredDataType: 'Organization'
  },
  [PageType.PRODUCT]: {
    titleTemplate: '{title} | High-Performance Carbon Fiber | E5DAO',
    descriptionTemplate: '{description} | Professional-grade composite materials from Singapore.',
    keywordsTemplate: [...seoConfig.keywords.products],
    structuredDataType: 'Product'
  },
  [PageType.PRODUCT_LIST]: {
    titleTemplate: '{category} Products | Carbon Fiber Solutions | E5DAO',
    descriptionTemplate: 'Explore our {category} collection of carbon fiber composite materials and tactical equipment.',
    keywordsTemplate: [...seoConfig.keywords.products, ...seoConfig.keywords.primary],
    structuredDataType: 'CollectionPage'
  },
  [PageType.SOLUTION]: {
    titleTemplate: '{title} | Advanced Defense Solutions | E5DAO',
    descriptionTemplate: '{description} | Military-grade carbon fiber systems.',
    keywordsTemplate: [...seoConfig.keywords.products, 'defense solutions', 'tactical systems'],
    structuredDataType: 'Service'
  },
  [PageType.NEWS]: {
    titleTemplate: '{title} | Industry News | E5DAO',
    descriptionTemplate: '{description} | Latest developments in composite materials.',
    structuredDataType: 'Article'
  },
  [PageType.APPLICATION]: {
    titleTemplate: '{title} | Real-World Applications | E5DAO',
    descriptionTemplate: '{description} | Case studies and practical implementations.',
    structuredDataType: 'Article'
  },
  [PageType.ABOUT]: {
    titleTemplate: 'About E5DAO | Leading Carbon Fiber Manufacturer Singapore',
    descriptionTemplate: 'Learn about E5DAO\'s expertise in advanced composite materials, our Singapore facilities, and commitment to innovation.',
    keywordsTemplate: [...seoConfig.keywords.primary, 'about us', 'company'],
    structuredDataType: 'AboutPage'
  },
  [PageType.CONTACT]: {
    titleTemplate: 'Contact E5DAO | Carbon Fiber Solutions Singapore',
    descriptionTemplate: 'Get in touch with E5DAO for custom carbon fiber solutions. Singapore-based manufacturer with global reach.',
    keywordsTemplate: [...seoConfig.keywords.primary, 'contact', 'Singapore'],
    structuredDataType: 'ContactPage'
  }
};