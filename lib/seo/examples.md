# SEO统一系统使用指南

## 📋 概述

这个统一SEO系统提供了完整的元数据管理、结构化数据生成和组件化的SEO解决方案，大大简化了SEO的配置和维护。

## 🚀 快速开始

### 1. 服务端元数据生成（推荐）

在 Next.js 页面中直接导出metadata：

```typescript
// app/products/[category]/page.tsx
import { SEO } from '@/lib/seo';

// 简单使用 - 产品页面
export const metadata = SEO.metadata.product(
  'Carbon Fiber Mobile COB Display Screen',
  'High-performance mobile display for command centers'
);

// 或者使用类别页面
export const metadata = SEO.metadata.productList('Command System');

// 或者完全自定义
export const metadata = SEO.generate({
  title: 'Custom Page Title',
  description: 'Custom description',
  pageType: SEO.PageType.PRODUCT,
  keywords: ['custom', 'keywords'],
  image: '/custom-image.jpg'
});
```

### 2. 动态元数据生成

对于动态页面（如产品详情页）：

```typescript
// app/products/[category]/[id]/page.tsx
import { SEO } from '@/lib/seo';
import { getProduct } from '@/lib/data';

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  return SEO.metadata.product(
    product.title,
    product.description,
    {
      image: product.image,
      url: `/products/${params.category}/${params.id}`,
      keywords: product.keywords,
      category: product.category
    }
  );
}
```

### 3. 客户端SEO组件（可选增强）

在组件中使用SEO组件来添加结构化数据：

```tsx
// app/products/[category]/[id]/page.tsx
import { ProductSEO } from '@/lib/seo';

export default function ProductDetailPage({ product }) {
  return (
    <div>
      <ProductSEO
        name={product.title}
        description={product.description}
        image={product.image}
        category={product.category}
        url={`/products/${product.categorySlug}/${product.id}`}
      />
      
      {/* 页面内容 */}
    </div>
  );
}
```

## 📚 不同页面类型的使用示例

### 首页
```typescript
// app/page.tsx
import { SEO } from '@/lib/seo';

export const metadata = SEO.metadata.home({
  customTitle: 'E5DAO - Premium Carbon Fiber Solutions Singapore',
  customDescription: 'Leading manufacturer of advanced carbon fiber composite materials...'
});
```

### 产品列表页
```typescript
// app/products/[category]/page.tsx
import { SEO } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const categoryName = getCategoryName(params.category);
  
  return SEO.metadata.productList(categoryName, {
    url: `/products/${params.category}`,
    image: `/images/categories/${params.category}-banner.jpg`
  });
}
```

### 新闻文章页
```typescript
// app/news/articles/[slug]/page.tsx
import { SEO, ArticleSEO } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  
  return SEO.metadata.news(
    article.title,
    article.excerpt,
    {
      url: `/news/articles/${params.slug}`,
      image: article.image,
      author: article.author,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt
    }
  );
}

export default function ArticlePage({ article }) {
  return (
    <div>
      <ArticleSEO
        headline={article.title}
        description={article.excerpt}
        image={article.image}
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
        author={article.author}
        url={`/news/articles/${article.slug}`}
      />
      
      {/* 文章内容 */}
    </div>
  );
}
```

### 解决方案页面
```typescript
// app/solution/command-system/page.tsx
import { SEO } from '@/lib/seo';

export const metadata = SEO.metadata.solution(
  'Carbon Fiber Mobile Command Post System',
  'Advanced tactical command solutions with rapid deployment capabilities',
  {
    url: '/solution/command-system',
    image: '/images/mobile-command-hero.png',
    keywords: ['mobile command post', 'tactical solutions', 'rapid deployment']
  }
);
```

## 🔧 高级使用

### 自定义结构化数据
```tsx
import { SEO, structuredDataGenerator } from '@/lib/seo';

// 生成自定义结构化数据
const customStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom Service',
  provider: structuredDataGenerator.generateOrganization()
};

// 在组件中使用
<SEOClient
  title="Custom Page"
  description="Custom description"
  pageType={SEO.PageType.SOLUTION}
  structuredData={customStructuredData}
/>
```

### 面包屑导航
```tsx
import { SEO } from '@/lib/seo';

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Products', url: '/products' },
  { name: 'Command System', url: '/products/command-system' },
  { name: 'COB Display', url: '/products/command-system/1' }
];

<SEOClient
  title="Product Name"
  description="Product description"
  pageType={SEO.PageType.PRODUCT}
  breadcrumbs={breadcrumbs}
/>
```

### 多语言支持（未来扩展）
```typescript
// 配置文件中已预留多语言支持
const metadata = SEO.generate({
  title: 'Product Name',
  description: 'Product description',
  pageType: SEO.PageType.PRODUCT,
  // 未来可添加语言参数
  // locale: 'zh-CN'
});
```

## 📈 SEO最佳实践

### 1. 标题优化
- 保持在50-60个字符以内
- 包含主要关键词
- 避免关键词堆砌

### 2. 描述优化
- 保持在150-160个字符以内
- 包含行动号召
- 准确描述页面内容

### 3. 图片优化
- 使用高质量图片（1200x630 推荐）
- 包含alt文本
- 优化文件大小

### 4. 结构化数据
- 使用相关的结构化数据类型
- 保持数据准确性
- 定期验证结构化数据

## 🔍 调试和验证

使用以下工具验证SEO配置：

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## 🚀 迁移指南

### 从现有系统迁移

```typescript
// 旧方式
export const metadata: Metadata = generatePageMetadata({
  title: "Product Name",
  description: "Product description",
  type: PageType.PRODUCT,
  url: "/products/1"
});

// 新方式
export const metadata = SEO.metadata.product(
  "Product Name", 
  "Product description",
  { url: "/products/1" }
);
```

这个统一系统大大简化了SEO配置，提高了维护性和一致性。