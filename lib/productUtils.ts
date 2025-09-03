// 产品数据处理工具函数
import type { Product, ProductCategory } from './types';

/**
 * 根据产品获取对应的分类信息
 * @param product 产品数据
 * @param categories 分类数组
 * @returns 分类信息或 undefined
 */
export const getCategoryByProduct = (product: Product, categories: ProductCategory[]): ProductCategory | undefined => {
  return categories.find(cat => cat.id === product.categoryId);
};

/**
 * 根据分类slug获取分类信息
 * @param slug 分类slug
 * @param categories 分类数组
 * @returns 分类信息或 undefined
 */
export const getCategoryBySlug = (slug: string, categories: ProductCategory[]): ProductCategory | undefined => {
  return categories.find(cat => cat.slug === slug);
};

/**
 * 生成产品详情页URL
 * @param product 产品数据
 * @param categories 分类数组
 * @returns URL字符串
 */
export const getProductUrl = (product: Product, categories: ProductCategory[]): string => {
  const category = getCategoryByProduct(product, categories);
  if (!category) {
    console.warn(`Category not found for product ${product.id}`);
    return `/products/unknown/${product.id}`;
  }
  return `/products/${category.slug}/${product.id}`;
};

/**
 * 根据分类ID筛选产品
 * @param products 产品数组
 * @param categoryId 分类ID
 * @returns 筛选后的产品数组
 */
export const getProductsByCategory = (products: Product[], categoryId: number): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

/**
 * 获取相关产品（同分类，排除当前产品）
 * @param products 产品数组
 * @param currentProduct 当前产品
 * @param limit 限制数量
 * @returns 相关产品数组
 */
export const getRelatedProducts = (products: Product[], currentProduct: Product, limit = 4): Product[] => {
  return products
    .filter(p => p.categoryId === currentProduct.categoryId && p.id !== currentProduct.id)
    .slice(0, limit);
};