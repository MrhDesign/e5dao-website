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
 * 根据分类ID筛选产品
 * @param products 产品数组
 * @param categoryId 分类ID
 * @returns 筛选后的产品数组
 */
export const getProductsByCategory = (products: Product[], categoryId: number): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};