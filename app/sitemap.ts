import { MetadataRoute } from 'next'
import contentData from '../lib/content.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'
  
  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/aboutUs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/applications`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ]
  
  // 解决方案页面
  const solutionPages: MetadataRoute.Sitemap = (contentData.pages.solution?.categories || []).map((category: {id: number; title: string; slug: string}) => ({
    url: `${baseUrl}/solution/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))
  
  // 产品分类页面  
  const productCategoryPages: MetadataRoute.Sitemap = ((contentData as Record<string, unknown>).products as {categories: Array<{id: number; title: string; slug: string}>})?.categories?.map((category: {id: number; title: string; slug: string}) => ({
    url: `${baseUrl}/products/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []
  
  // 产品详情页面
  const productPages: MetadataRoute.Sitemap = []
  const products = ((contentData as Record<string, unknown>).products as {items: Array<{id: number; categoryId: number}>})?.items || []
  const categories = ((contentData as Record<string, unknown>).products as {categories: Array<{id: number; title: string; slug: string}>})?.categories || []
  
  products.forEach((product: {id: number; categoryId: number}) => {
    const category = categories.find((cat: {id: number; title: string; slug: string}) => cat.id === product.categoryId)
    if (category) {
      productPages.push({
        url: `${baseUrl}/products/${category.slug}/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    }
  })
  
  // 新闻文章页面
  const newsPages: MetadataRoute.Sitemap = (contentData.pages.news?.articles || []).map((article: {slug: string; publishedDate?: {year: string; month: string; day: string}}) => ({
    url: `${baseUrl}/news/articles/${article.slug}`,
    lastModified: article.publishedDate ? 
      new Date(`${article.publishedDate.year}-${article.publishedDate.month}-${article.publishedDate.day}`) :
      new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))
  
  // 行业应用页面
  const applicationPages: MetadataRoute.Sitemap = (contentData.pages.news?.applications || []).map((app: {slug: string; publishedDate?: {year: string; month: string; day: string}}) => ({
    url: `${baseUrl}/news/applications/${app.slug}`,
    lastModified: app.publishedDate ? 
      new Date(`${app.publishedDate.year}-${app.publishedDate.month}-${app.publishedDate.day}`) :
      new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))
  
  return [
    ...staticPages,
    ...solutionPages,
    ...productCategoryPages,
    ...productPages,
    ...newsPages,
    ...applicationPages
  ]
}