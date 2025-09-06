'use client';

// 浏览量数据类型
export interface ViewData {
  slug: string;
  views: number;
  lastViewed: string;
}

// 本地存储key
const STORAGE_KEY = 'e5dao_article_views';
const VIEW_SESSION_KEY = 'e5dao_current_session';

// 获取所有浏览量数据
export function getAllViewData(): Record<string, ViewData> {
  if (typeof window === 'undefined') return {};
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

// 保存浏览量数据
function saveViewData(data: Record<string, ViewData>): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 忽略存储错误
  }
}

// 获取特定文章的浏览量
export function getViewCount(slug: string): number {
  const allData = getAllViewData();
  return allData[slug]?.views || 0;
}

// 检查当前会话是否已经查看过该文章
function hasViewedInCurrentSession(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const sessionData = sessionStorage.getItem(VIEW_SESSION_KEY);
    const viewedSlugs = sessionData ? JSON.parse(sessionData) : [];
    return viewedSlugs.includes(slug);
  } catch {
    return false;
  }
}

// 标记当前会话已查看该文章
function markViewedInCurrentSession(slug: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const sessionData = sessionStorage.getItem(VIEW_SESSION_KEY);
    const viewedSlugs = sessionData ? JSON.parse(sessionData) : [];
    
    if (!viewedSlugs.includes(slug)) {
      viewedSlugs.push(slug);
      sessionStorage.setItem(VIEW_SESSION_KEY, JSON.stringify(viewedSlugs));
    }
  } catch {
    // 忽略存储错误
  }
}

// 增加浏览量
export function incrementViewCount(slug: string): number {
  if (typeof window === 'undefined') return 0;
  
  // 检查当前会话是否已经查看过，避免刷新页面重复计数
  if (hasViewedInCurrentSession(slug)) {
    return getViewCount(slug);
  }
  
  const allData = getAllViewData();
  const currentData = allData[slug] || { slug, views: 0, lastViewed: '' };
  
  // 增加浏览量
  currentData.views += 1;
  currentData.lastViewed = new Date().toISOString();
  
  // 保存数据
  allData[slug] = currentData;
  saveViewData(allData);
  
  // 标记当前会话已查看
  markViewedInCurrentSession(slug);
  
  return currentData.views;
}

// 获取热门文章（按浏览量排序）
export function getPopularArticles(limit: number = 5): ViewData[] {
  const allData = getAllViewData();
  return Object.values(allData)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

// 格式化浏览量显示
export function formatViewCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  } else if (count < 10000) {
    return (count / 1000).toFixed(1) + 'K';
  } else if (count < 1000000) {
    return Math.floor(count / 1000) + 'K';
  } else {
    return (count / 1000000).toFixed(1) + 'M';
  }
}

// 获取浏览量统计
export function getViewStatistics() {
  const allData = getAllViewData();
  const articles = Object.values(allData);
  
  return {
    totalArticles: articles.length,
    totalViews: articles.reduce((sum, article) => sum + article.views, 0),
    averageViews: articles.length > 0 
      ? Math.round(articles.reduce((sum, article) => sum + article.views, 0) / articles.length)
      : 0,
    mostPopular: articles.sort((a, b) => b.views - a.views)[0] || null
  };
}