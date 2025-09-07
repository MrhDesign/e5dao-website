/**
 * 统一SEO系统入口
 * 
 * 使用方式：
 * 
 * 1. 服务端元数据生成：
 *    export const metadata = seoUtils.product('产品名称', '产品描述');
 * 
 * 2. 客户端SEO组件：
 *    <ProductSEO name="产品名称" description="产品描述" />
 * 
 * 3. 自定义SEO：
 *    export const metadata = generateSEOMetadata({
 *      title: '页面标题',
 *      description: '页面描述',
 *      pageType: PageType.PRODUCT
 *    });
 */

// 配置和类型
export { seoConfig, seoTemplates, PageType } from './config';
export type { SEOConfig, SEOTemplate } from './config';

// 元数据生成
export { generateSEOMetadata, seoUtils } from './generator';
export type { SEOOptions } from './generator';

// 结构化数据
export { 
  structuredDataGenerator,
  StructuredDataGenerator 
} from './structured-data';
export type {
  BaseStructuredData,
  OrganizationData,
  ProductData,
  ArticleData,
  BreadcrumbData
} from './structured-data';

// React组件
export {
  SEOClient,
  ProductSEO,
  ArticleSEO,
  StructuredDataScript,
  usePageSEO
} from './components';
export type { SEOProps } from './components';

// 导入用于创建便捷导出
import { seoConfig, PageType } from './config';
import { generateSEOMetadata, seoUtils } from './generator';
import { structuredDataGenerator } from './structured-data';

// 便捷导出 - 最常用的功能
export const SEO = {
  // 服务端元数据生成
  metadata: seoUtils,
  
  // 页面类型
  PageType,
  
  // 自定义生成器
  generate: generateSEOMetadata,
  
  // 结构化数据
  structuredData: structuredDataGenerator,
  
  // 配置
  config: seoConfig
} as const;