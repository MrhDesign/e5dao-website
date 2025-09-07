// 国际化SEO支持
import { Metadata } from 'next';

// 支持的语言配置
export const supportedLocales = {
  'en': {
    code: 'en',
    name: 'English',
    region: 'US',
    hreflang: 'en',
    dir: 'ltr'
  },
  'zh-CN': {
    code: 'zh-CN', 
    name: '简体中文',
    region: 'CN',
    hreflang: 'zh-CN',
    dir: 'ltr'
  },
  'zh-TW': {
    code: 'zh-TW',
    name: '繁體中文', 
    region: 'TW',
    hreflang: 'zh-TW',
    dir: 'ltr'
  },
  'ms': {
    code: 'ms',
    name: 'Bahasa Malaysia',
    region: 'MY', 
    hreflang: 'ms',
    dir: 'ltr'
  }
} as const;

export type SupportedLocale = keyof typeof supportedLocales;

// 地域SEO配置
export const regionalSEO = {
  'SG': {
    country: 'Singapore',
    currency: 'SGD',
    timezone: 'Asia/Singapore',
    phoneFormat: '+65-XXXX-XXXX',
    businessHours: '9:00-18:00 SGT',
    keywords: ['Singapore manufacturer', 'Singapore composite materials', 'Southeast Asia supplier']
  },
  'MY': {
    country: 'Malaysia', 
    currency: 'MYR',
    timezone: 'Asia/Kuala_Lumpur',
    phoneFormat: '+60-X-XXXX-XXXX',
    businessHours: '9:00-18:00 MYT',
    keywords: ['Malaysia carbon fiber', 'Malaysia defense equipment', 'Kuala Lumpur supplier']
  },
  'TH': {
    country: 'Thailand',
    currency: 'THB', 
    timezone: 'Asia/Bangkok',
    phoneFormat: '+66-X-XXXX-XXXX',
    businessHours: '9:00-18:00 ICT',
    keywords: ['Thailand composite materials', 'Bangkok supplier', 'Thailand defense solutions']
  },
  'ID': {
    country: 'Indonesia',
    currency: 'IDR',
    timezone: 'Asia/Jakarta', 
    phoneFormat: '+62-XXX-XXXX-XXXX',
    businessHours: '9:00-18:00 WIB',
    keywords: ['Indonesia carbon fiber', 'Jakarta supplier', 'Indonesia military equipment']
  }
} as const;

// 生成hreflang标签
export function generateHreflangTags(currentPath: string, baseUrl: string = 'https://e5dao.com'): string[] {
  const hreflangTags: string[] = [];
  
  // 为每个支持的语言生成hreflang
  Object.values(supportedLocales).forEach(locale => {
    const localeUrl = locale.code === 'en' 
      ? `${baseUrl}${currentPath}` 
      : `${baseUrl}/${locale.code}${currentPath}`;
    
    hreflangTags.push(`<link rel="alternate" hreflang="${locale.hreflang}" href="${localeUrl}" />`);
  });
  
  // 添加默认语言标签
  hreflangTags.push(`<link rel="alternate" hreflang="x-default" href="${baseUrl}${currentPath}" />`);
  
  return hreflangTags;
}

// 为特定地区生成SEO元数据
export function generateRegionalMetadata(
  region: keyof typeof regionalSEO,
  baseMetadata: Metadata,
  additionalKeywords: string[] = []
): Metadata {
  const regionConfig = regionalSEO[region];
  const localeCode = getLocaleForRegion(region);
  const locale = supportedLocales[localeCode];
  
  return {
    ...baseMetadata,
    keywords: `${baseMetadata.keywords}, ${regionConfig.keywords.join(', ')}, ${additionalKeywords.join(', ')}`,
    openGraph: {
      ...baseMetadata.openGraph,
      locale: `${locale.code}_${regionConfig.country.substring(0, 2).toUpperCase()}`,
    },
    other: {
      ...baseMetadata.other,
      'geo.region': regionConfig.country.substring(0, 2).toUpperCase(),
      'geo.placename': regionConfig.country,
      'currency': regionConfig.currency,
      'business:contact_data:phone_number': regionConfig.phoneFormat,
      'business:contact_data:hours': regionConfig.businessHours
    }
  };
}

// 根据地区获取对应的语言代码
function getLocaleForRegion(region: keyof typeof regionalSEO): SupportedLocale {
  const regionToLocale: Record<keyof typeof regionalSEO, SupportedLocale> = {
    'SG': 'en',
    'MY': 'ms', 
    'TH': 'en', // 泰语暂未支持，使用英语
    'ID': 'en'  // 印尼语暂未支持，使用英语
  };
  
  return regionToLocale[region];
}

// 生成本地化的联系方式结构化数据
export function generateLocalContactData(region: keyof typeof regionalSEO) {
  const regionConfig = regionalSEO[region];
  
  return {
    '@type': 'ContactPoint',
    '@id': `https://e5dao.com/#contact-${region.toLowerCase()}`,
    contactType: 'customer service',
    areaServed: region,
    availableLanguage: getLocaleForRegion(region),
    telephone: regionConfig.phoneFormat,
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'https://schema.org/Monday',
        'https://schema.org/Tuesday', 
        'https://schema.org/Wednesday',
        'https://schema.org/Thursday',
        'https://schema.org/Friday'
      ],
      opens: regionConfig.businessHours.split('-')[0],
      closes: regionConfig.businessHours.split('-')[1]
    }
  };
}

// 根据用户地理位置获取推荐的地区设置
export function getRecommendedRegion(userRegion?: string): keyof typeof regionalSEO {
  if (!userRegion) return 'SG'; // 默认新加坡
  
  const regionMapping: Record<string, keyof typeof regionalSEO> = {
    'SG': 'SG',
    'MY': 'MY', 
    'TH': 'TH',
    'ID': 'ID',
    // 其他地区默认到新加坡
  };
  
  return regionMapping[userRegion.toUpperCase()] || 'SG';
}

// 生成地区特定的面包屑导航
export function generateRegionalBreadcrumb(
  region: keyof typeof regionalSEO,
  path: Array<{name: string, url: string}>
) {
  const regionConfig = regionalSEO[region];
  
  return [
    { name: 'Home', url: '/' },
    { name: regionConfig.country, url: `/${region.toLowerCase()}` },
    ...path
  ];
}

// 为产品页面生成地区特定的可用性信息
export function generateRegionalAvailability(regions: Array<keyof typeof regionalSEO>) {
  return regions.map(region => {
    const config = regionalSEO[region];
    return {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      areaServed: {
        '@type': 'Country',
        name: config.country
      },
      priceCurrency: config.currency,
      seller: {
        '@type': 'Organization',
        name: 'E5DAO'
      }
    };
  });
}