// 产品模块类型定义

// 基础产品接口
export interface BaseProduct {
  id: number;
  categoryId: number;
  image: string;
  alt: string;
  productType: 'independent-rd' | 'standard';
  gallery?: string[];
  specifications?: Record<string, string | undefined>;
  details?: ProductDetail[];
}

// 自研产品接口
export interface IndependentRDProduct extends BaseProduct {
  productType: 'independent-rd';
  title: string;
  description: string;
  model?: string; // 技术标识
}

// 标准产品接口
export interface StandardProduct extends BaseProduct {
  productType: 'standard';
  model: string;
  standardCategory: string;
  title?: string; // 向后兼容
  description?: string; // 向后兼容
}

// 产品类型联合
export type Product = IndependentRDProduct | StandardProduct;

// 产品分类接口
export interface ProductCategory {
  id: number;
  title: string;
  slug: string;
}

// 产品详情内容接口
export interface ProductDetail {
  type: 'heading' | 'paragraph' | 'image' | 'list';
  content: string;
  level?: 1 | 2 | 3 | 4;
  image?: string;
  alt?: string;
  items?: string[];
}

// 标准产品测试项目接口
export interface StandardProductOverviewItem {
  title: string;
  image: string;
  alt: string;
}

// 面包屑导航项接口
export interface BreadcrumbItem {
  label: string;
  href: string;
}

// 新闻/应用文章接口
export interface NewsItem {
  id: number;
  slug: string;
  image: string;
  alt: string;
  publishedDate: {
    year: string;
    month: string;
    day: string;
  };
  title: string;
  description: string;
}

// 行业应用接口（与新闻项结构相同）
export type ApplicationItem = NewsItem;

// 内容数据接口
export interface ContentData {
  pages: {
    navigation: Record<string, string>;
    common: Record<string, string>;
    home: {
      hero: {
        button: string;
      };
      about: {
        description: string;
      };
    };
    solution: {
      categories: ProductCategory[];
      mobileCommand: {
        hero: {
          alt: string;
          image: string;
        };
        overview: {
          title: string;
          content: string;
        };
        features: {
          title: string;
          content: string;
          alt: string;
          image: string;
        };
        Components: {
          title: string;
        };
      };
      medicalTreatment: {
        hero: {
          title: string;
          subtitle: string;
          description: string;
          image: string;
        };
        overview: {
          title: string;
          content: string;
        };
        features: Array<{
          title: string;
          description: string;
        }>;
      };
    };
    products: {
      categories: ProductCategory[];
      items: Product[];
      standardProductOverview: StandardProductOverviewItem[];
    };
    aboutUs: {
      features: Array<{
        id: number;
        iconName: string;
        title: string;
        description: string;
      }>;
      industries: Array<{
        id: number;
        title: string;
        subtitle: string;
        backgroundImage: string;
      }>;
      productionLines: Array<{
        id: number;
        title: string;
        backgroundImage: string;
      }>;
    };
    news: {
      articles: NewsItem[];
      applications: ApplicationItem[];
    };
    customization: {
      process: {
        steps: Array<{
          id: number;
          icon: string;
          title: string;
          description: string;
          stepNumber: string;
        }>;
      };
    };
  };
}

// Hook返回类型
export interface UseContentReturn {
  getContent: <T = unknown>(path: string) => T;
}

// 分页数据类型
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}