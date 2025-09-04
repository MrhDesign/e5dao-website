# PRD-04 API接口文档

## 1. 接口系统概述

### 1.1 接口架构设计
当前项目采用静态内容管理方式，所有数据通过 `lib/content.json` 集中管理。本文档定义了：
- 当前静态数据访问接口
- 未来 API 系统扩展接口规范
- 数据格式标准和类型定义
- 错误处理和降级策略

### 1.2 数据访问层架构
```
Data Access Layer
├── Static Content (Current)
│   ├── useContent Hook        # 内容访问接口
│   ├── content.json          # 静态数据源
│   └── productUtils          # 产品工具函数
├── Future API Layer
│   ├── RESTful Endpoints     # REST API 接口
│   ├── GraphQL (Optional)    # GraphQL 查询接口
│   └── Real-time Updates     # WebSocket 实时更新
└── Cache Layer
    ├── Browser Cache         # 浏览器缓存
    ├── Memory Cache          # 内存缓存
    └── CDN Cache            # CDN 缓存
```

## 2. 当前内容访问接口

### 2.1 useContent Hook

#### 2.1.1 接口描述
提供统一的内容访问接口，支持点号语法的嵌套数据访问。

#### 2.1.2 接口定义
```typescript
interface UseContentReturn {
  getContent: <T = unknown>(path: string) => T;
}

export const useContent = (): UseContentReturn;
```

#### 2.1.3 使用示例
```typescript
const { getContent } = useContent();

// 基础数据访问
const homeTitle = getContent<string>('navigation.home');

// 复杂数据结构访问
const productsData = getContent<Product[]>('products.items');
const categoriesData = getContent<ProductCategory[]>('products.categories');

// 嵌套数据访问
const commandSystemTitle = getContent<string>('solution.commandSystem.overview.title');
```

#### 2.1.4 错误处理
```typescript
const getContent = <T = unknown>(path: string): T => {
  const keys = path.split('.');
  let result: unknown = (contentData as { pages: unknown }).pages;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      console.warn(`Content path not found: ${path}`);
      return (typeof result === 'string' ? path : null) as T;
    }
  }
  
  return result as T;
};
```

### 2.2 产品工具函数接口

#### 2.2.1 getCategoryByProduct
```typescript
/**
 * 根据产品获取其所属分类
 * @param product - 产品对象
 * @param categories - 分类数组
 * @returns 产品所属分类或 undefined
 */
export function getCategoryByProduct(
  product: Product, 
  categories: ProductCategory[]
): ProductCategory | undefined;

// 使用示例
const category = getCategoryByProduct(product, categoriesData);
```

#### 2.2.2 getCategoryBySlug
```typescript
/**
 * 根据 slug 获取分类
 * @param slug - 分类 slug
 * @param categories - 分类数组
 * @returns 匹配的分类或 undefined
 */
export function getCategoryBySlug(
  slug: string, 
  categories: ProductCategory[]
): ProductCategory | undefined;

// 使用示例
const category = getCategoryBySlug('command-system', categoriesData);
```

#### 2.2.3 getProductsByCategory
```typescript
/**
 * 获取指定分类下的所有产品
 * @param products - 产品数组
 * @param categoryId - 分类ID
 * @returns 该分类下的产品数组
 */
export function getProductsByCategory(
  products: Product[], 
  categoryId: number
): Product[];

// 使用示例
const categoryProducts = getProductsByCategory(productsData, 1);
```

## 3. 数据类型定义接口

### 3.1 产品相关类型

#### 3.1.1 Product 类型
```typescript
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
  model?: string;
}

// 标准产品接口
export interface StandardProduct extends BaseProduct {
  productType: 'standard';
  model: string;
  standardCategory: string;
  title?: string;
  description?: string;
}

// 产品类型联合
export type Product = IndependentRDProduct | StandardProduct;
```

#### 3.1.2 ProductCategory 类型
```typescript
export interface ProductCategory {
  id: number;
  title: string;
  slug: string;
}
```

#### 3.1.3 ProductDetail 类型
```typescript
export interface ProductDetail {
  type: 'heading' | 'paragraph' | 'image' | 'list';
  content: string;
  level?: 1 | 2 | 3 | 4;
  image?: string;
  alt?: string;
  items?: string[];
}
```

### 3.2 新闻相关类型

#### 3.2.1 NewsItem 类型
```typescript
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
```

#### 3.2.2 ApplicationItem 类型
```typescript
// 行业应用接口（与新闻项结构相同）
export type ApplicationItem = NewsItem;
```

### 3.3 分页相关类型

#### 3.3.1 PaginatedData 类型
```typescript
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

## 4. 未来 API 系统设计

### 4.1 RESTful API 接口规范

#### 4.1.1 产品相关接口

##### 获取产品列表
```http
GET /api/products
Content-Type: application/json

Query Parameters:
- page: number (default: 1)
- pageSize: number (default: 20)
- category: string (optional)
- productType: 'independent-rd' | 'standard' (optional)

Response:
{
  "success": true,
  "data": {
    "items": Product[],
    "total": number,
    "page": number,
    "pageSize": number,
    "totalPages": number
  }
}
```

##### 获取单个产品
```http
GET /api/products/{id}
Content-Type: application/json

Path Parameters:
- id: number

Response:
{
  "success": true,
  "data": Product
}
```

##### 按分类获取产品
```http
GET /api/products/category/{categorySlug}
Content-Type: application/json

Path Parameters:
- categorySlug: string

Query Parameters:
- page: number (default: 1)
- pageSize: number (default: 20)

Response:
{
  "success": true,
  "data": {
    "category": ProductCategory,
    "items": Product[],
    "total": number,
    "page": number,
    "pageSize": number,
    "totalPages": number
  }
}
```

#### 4.1.2 分类相关接口

##### 获取所有分类
```http
GET /api/categories
Content-Type: application/json

Response:
{
  "success": true,
  "data": ProductCategory[]
}
```

##### 获取单个分类
```http
GET /api/categories/{slug}
Content-Type: application/json

Path Parameters:
- slug: string

Response:
{
  "success": true,
  "data": ProductCategory
}
```

#### 4.1.3 新闻相关接口

##### 获取新闻列表
```http
GET /api/news/articles
Content-Type: application/json

Query Parameters:
- page: number (default: 1)
- pageSize: number (default: 10)

Response:
{
  "success": true,
  "data": {
    "items": NewsItem[],
    "total": number,
    "page": number,
    "pageSize": number,
    "totalPages": number
  }
}
```

##### 获取单篇新闻
```http
GET /api/news/articles/{slug}
Content-Type: application/json

Path Parameters:
- slug: string

Response:
{
  "success": true,
  "data": NewsItem
}
```

#### 4.1.4 行业应用接口

##### 获取行业应用列表
```http
GET /api/news/applications
Content-Type: application/json

Query Parameters:
- page: number (default: 1)
- pageSize: number (default: 10)

Response:
{
  "success": true,
  "data": {
    "items": ApplicationItem[],
    "total": number,
    "page": number,
    "pageSize": number,
    "totalPages": number
  }
}
```

##### 获取单个应用案例
```http
GET /api/news/applications/{slug}
Content-Type: application/json

Path Parameters:
- slug: string

Response:
{
  "success": true,
  "data": ApplicationItem
}
```

### 4.2 联系表单接口

#### 4.2.1 提交联系表单
```http
POST /api/contact
Content-Type: application/json

Request Body:
{
  "name": string,
  "email": string,
  "phone": string,
  "company": string,
  "message": string,
  "productInterest": string
}

Response:
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": string,
    "submittedAt": string
  }
}
```

#### 4.2.2 表单验证规则
```typescript
interface ContactFormValidation {
  name: {
    required: true;
    minLength: 2;
    maxLength: 50;
  };
  email: {
    required: true;
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  };
  phone: {
    required: false;
    pattern: /^[+]?[\d\s\-\(\)]+$/;
  };
  company: {
    required: false;
    maxLength: 100;
  };
  message: {
    required: true;
    minLength: 10;
    maxLength: 1000;
  };
  productInterest: {
    required: false;
    maxLength: 100;
  };
}
```

## 5. 错误处理规范

### 5.1 错误响应格式
```typescript
interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}
```

### 5.2 常见错误代码
```typescript
enum ErrorCodes {
  // 客户端错误
  BAD_REQUEST = 'BAD_REQUEST',           // 400
  UNAUTHORIZED = 'UNAUTHORIZED',         // 401
  FORBIDDEN = 'FORBIDDEN',               // 403
  NOT_FOUND = 'NOT_FOUND',              // 404
  VALIDATION_ERROR = 'VALIDATION_ERROR', // 422
  
  // 服务器错误
  INTERNAL_ERROR = 'INTERNAL_ERROR',     // 500
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE', // 503
  
  // 业务错误
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  INVALID_PRODUCT_TYPE = 'INVALID_PRODUCT_TYPE'
}
```

### 5.3 错误响应示例
```json
// 产品未找到
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 999 not found"
  }
}

// 表单验证错误
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "name": "Name is required",
      "email": "Invalid email format"
    }
  }
}
```

## 6. 数据迁移接口

### 6.1 内容数据迁移

#### 6.1.1 导出当前数据
```http
GET /api/admin/export
Authorization: Bearer {token}
Content-Type: application/json

Response:
{
  "success": true,
  "data": {
    "products": Product[],
    "categories": ProductCategory[],
    "news": NewsItem[],
    "applications": ApplicationItem[],
    "exportedAt": string
  }
}
```

#### 6.1.2 导入数据
```http
POST /api/admin/import
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "products": Product[],
  "categories": ProductCategory[],
  "news": NewsItem[],
  "applications": ApplicationItem[]
}

Response:
{
  "success": true,
  "message": "Data imported successfully",
  "data": {
    "imported": {
      "products": number,
      "categories": number,
      "news": number,
      "applications": number
    },
    "importedAt": string
  }
}
```

## 7. 搜索接口设计

### 7.1 全文搜索
```http
GET /api/search
Content-Type: application/json

Query Parameters:
- q: string (search query)
- type: 'products' | 'news' | 'applications' | 'all' (default: 'all')
- page: number (default: 1)
- pageSize: number (default: 10)

Response:
{
  "success": true,
  "data": {
    "query": string,
    "results": {
      "products": Product[],
      "news": NewsItem[],
      "applications": ApplicationItem[]
    },
    "total": number,
    "page": number,
    "pageSize": number,
    "totalPages": number
  }
}
```

### 7.2 产品搜索过滤
```http
GET /api/products/search
Content-Type: application/json

Query Parameters:
- q: string (search term)
- category: string (category slug)
- productType: 'independent-rd' | 'standard'
- minPrice: number (future use)
- maxPrice: number (future use)
- page: number (default: 1)
- pageSize: number (default: 20)

Response:
{
  "success": true,
  "data": {
    "items": Product[],
    "filters": {
      "categories": { slug: string, title: string, count: number }[],
      "productTypes": { type: string, count: number }[]
    },
    "total": number,
    "page": number,
    "pageSize": number,
    "totalPages": number
  }
}
```

## 8. 缓存策略接口

### 8.1 缓存控制头
```http
Cache-Control: public, max-age=3600, s-maxage=3600
ETag: "version-hash"
Last-Modified: Wed, 21 Oct 2025 07:28:00 GMT
```

### 8.2 缓存失效接口
```http
POST /api/admin/cache/invalidate
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "keys": string[] | "all"
}

Response:
{
  "success": true,
  "message": "Cache invalidated successfully",
  "data": {
    "invalidatedKeys": string[],
    "invalidatedAt": string
  }
}
```

## 9. 实时更新接口

### 9.1 WebSocket 连接
```typescript
// 连接到实时更新服务
const ws = new WebSocket('wss://api.yourdomain.com/ws');

// 订阅产品更新
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'products'
}));

// 接收更新消息
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'product_updated':
      // 处理产品更新
      break;
    case 'product_created':
      // 处理新产品
      break;
    case 'product_deleted':
      // 处理产品删除
      break;
  }
};
```

### 9.2 更新消息格式
```typescript
interface WebSocketMessage {
  type: 'product_updated' | 'product_created' | 'product_deleted' | 'news_updated';
  data: {
    id: number;
    payload?: Product | NewsItem;
    timestamp: string;
  };
}
```

## 10. API 版本管理

### 10.1 版本控制策略
```http
# URL 版本控制
GET /api/v1/products
GET /api/v2/products

# Header 版本控制
GET /api/products
API-Version: v1

# Content-Type 版本控制
GET /api/products
Accept: application/vnd.api+json;version=1
```

### 10.2 向后兼容性
```typescript
interface APIVersionConfig {
  v1: {
    deprecated: false;
    supportUntil: '2026-12-31';
  };
  v2: {
    deprecated: false;
    features: ['enhanced-search', 'real-time-updates'];
  };
}
```

## 11. API 监控和分析

### 11.1 性能监控接口
```http
GET /api/health
Content-Type: application/json

Response:
{
  "status": "healthy",
  "timestamp": "2025-09-04T10:30:00Z",
  "version": "1.0.0",
  "services": {
    "database": "healthy",
    "cache": "healthy",
    "storage": "healthy"
  }
}
```

### 11.2 使用统计接口
```http
GET /api/admin/analytics
Authorization: Bearer {token}
Content-Type: application/json

Response:
{
  "success": true,
  "data": {
    "requests": {
      "total": number,
      "byEndpoint": Record<string, number>,
      "byStatus": Record<string, number>
    },
    "performance": {
      "averageResponseTime": number,
      "p95ResponseTime": number,
      "errorRate": number
    },
    "period": {
      "start": string,
      "end": string
    }
  }
}
```

---

*文档版本: v1.0*
*最后更新: 2025-09-04*
*维护者: Claude Code*