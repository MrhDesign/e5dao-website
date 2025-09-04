# PRD-02 技术架构文档

## 1. 整体技术架构

### 1.1 架构设计原则
- **响应式优先**: 移动端优先的响应式设计
- **组件化开发**: 高度可复用的组件系统
- **类型安全**: TypeScript 强类型约束
- **性能优先**: 优化加载速度和运行性能
- **可维护性**: 清晰的代码结构和文档

### 1.2 技术栈选型

#### 1.2.1 核心框架层
```json
{
  "next": "15.5.0",           // React 全栈框架
  "react": "19.1.0",          // UI 库
  "react-dom": "19.1.0",      // DOM 渲染
  "typescript": "^5"          // 类型系统
}
```

#### 1.2.2 样式和UI层
```json
{
  "tailwindcss": "^4",        // CSS 框架
  "@tailwindcss/postcss": "^4", // PostCSS 集成
  "scrollreveal": "^4.0.9",   // 滚动动画
  "swiper": "^11.2.10"        // 轮播组件
}
```

#### 1.2.3 开发工具层
```json
{
  "eslint": "^9",             // 代码检查
  "eslint-config-next": "15.5.0", // Next.js ESLint 配置
  "@types/*": "^19"           // TypeScript 类型定义
}
```

### 1.3 架构图示
```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  React 19.1.0 + Next.js 15.5.0 (App Router)                    │
├─────────────────────────────────────────────────────────────────┤
│  Components System │ Content System │ Routing System            │
├─────────────────────────────────────────────────────────────────┤
│  Tailwind CSS 4 │ ScrollReveal │ Swiper │ Custom Fonts          │
├─────────────────────────────────────────────────────────────────┤
│  TypeScript 5 │ ESLint │ Turbopack                             │
├─────────────────────────────────────────────────────────────────┤
│                    Static Assets & Media                         │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Next.js App Router 架构

### 2.1 路由系统设计

#### 2.1.1 目录结构
```
app/
├── layout.tsx              # 根布局（Header + Footer）
├── page.tsx               # 首页
├── components/            # 共享组件目录
├── products/              # 产品模块
│   ├── page.tsx          # 产品总览页
│   └── [category]/       # 动态分类路由
│       ├── page.tsx      # 分类页面
│       └── [id]/         # 动态产品ID路由
│           └── page.tsx  # 产品详情页
├── news/                  # 新闻模块
│   ├── page.tsx          # 新闻列表页
│   ├── articles/         # 新闻文章
│   │   └── [slug]/       # 动态文章路由
│   │       └── page.tsx
│   └── applications/     # 行业应用
│       └── [slug]/       # 动态应用路由
│           └── page.tsx
├── solution/             # 解决方案模块
│   ├── layout.tsx       # 解决方案布局
│   ├── command-system/  # 指挥所系统
│   └── treatment-system/ # 医疗系统
├── aboutUs/              # 关于我们
├── contact/              # 联系页面
└── favicon.ico
```

#### 2.1.2 动态路由配置
- **产品路由**: `/products/[category]/[id]`
  - 支持分类验证和产品推荐
  - URL 示例: `/products/command-system/1`
  
- **新闻路由**: `/news/articles/[slug]`
  - 基于 slug 的友好 URL
  - URL 示例: `/news/articles/carbon-fiber-advantages`
  
- **应用路由**: `/news/applications/[slug]`
  - 行业应用案例展示
  - URL 示例: `/news/applications/military-command-systems`

### 2.2 布局系统

#### 2.2.1 根布局 (layout.tsx)
```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="lg:pt-20 pt-12 w-screen min-h-[calc(100vh-520px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

#### 2.2.2 嵌套布局 (solution/layout.tsx)
```typescript
export default function SolutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="solution-wrapper">
      {children}
    </div>
  );
}
```

## 3. 组件架构设计

### 3.1 组件分层结构
```
components/
├── 基础组件 (Basic Components)
│   ├── Button.tsx          # 按钮组件
│   ├── Icon.tsx           # 图标组件
│   └── LoadingSpinner.tsx # 加载动画
├── 表单组件 (Form Components)
│   └── ContactForm.tsx    # 联系表单
├── 导航组件 (Navigation Components)
│   ├── Header.tsx         # 页头导航
│   ├── Footer.tsx         # 页脚导航
│   └── Breadcrumb.tsx     # 面包屑导航
├── 内容组件 (Content Components)
│   ├── ProductCard.tsx    # 产品卡片
│   ├── NewCard.tsx        # 新闻卡片
│   ├── FeatureCard.tsx    # 特性卡片
│   └── IndustryCard.tsx   # 行业卡片
├── 布局组件 (Layout Components)
│   ├── ProductImageGallery.tsx # 产品图片画廊
│   ├── ContentRenderer.tsx     # 内容渲染器
│   └── DetailPage.tsx         # 详情页面模板
└── 功能组件 (Functional Components)
    ├── ProcessFlow.tsx    # 流程展示
    ├── Pagination.tsx     # 分页组件
    └── ErrorBoundary.tsx  # 错误边界
```

### 3.2 组件设计模式

#### 3.2.1 组件接口设计
```typescript
// 基础按钮组件
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  loading?: boolean;
  children: React.ReactNode;
}

// 产品卡片组件
interface ProductCardProps {
  // 支持完整产品对象或逐字段传递
  product?: Product;
  image?: string;
  alt?: string;
  model?: string;
  title?: string;
  // ...更多可选字段
  variant?: 'default' | 'solution';
}
```

#### 3.2.2 性能优化模式
```typescript
// React.memo 性能优化
export default memo(ProductCard);

// useMemo 缓存计算结果
const productUrl = useMemo(() => {
  if (href) return href;
  if (!id || !categoryId) return '#';
  
  const category = categoriesData.find((cat) => cat.id === categoryId);
  return `/products/${category.slug}/${id}`;
}, [href, id, categoryId, getContent]);
```

## 4. 内容管理架构

### 4.1 内容数据结构

#### 4.1.1 集中化内容管理
```
lib/
├── content.json           # 集中内容数据
├── types.ts              # TypeScript 类型定义
├── useContent.ts         # 内容访问 Hook
├── useScrollReveal.ts    # 动画 Hook
└── productUtils.ts       # 产品工具函数
```

#### 4.1.2 内容访问模式
```typescript
// useContent Hook 实现
export const useContent = (): UseContentReturn => {
  const getContent = useMemo(() => {
    return <T = unknown>(path: string): T => {
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
  }, []);

  return { getContent };
};

// 使用示例
const { getContent } = useContent();
const navigationTitle = getContent<string>('navigation.home');
const productsData = getContent<Product[]>('products.items');
```

### 4.2 数据类型系统

#### 4.2.1 产品类型定义
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

#### 4.2.2 内容数据接口
```typescript
export interface ContentData {
  pages: {
    navigation: Record<string, string>;
    common: Record<string, string>;
    products: {
      categories: ProductCategory[];
      items: Product[];
      standardProductOverview: StandardProductOverviewItem[];
    };
    news: {
      items: NewsItem[];
    };
    industryApplications: {
      items: ApplicationItem[];
    };
    // ...其他模块
  };
}
```

## 5. 样式系统架构

### 5.1 Tailwind CSS 配置

#### 5.1.1 自定义设计系统
```css
/* globals.css - CSS 变量定义 */
:root {
  /* 颜色系统 */
  --color-text-brand: #1a1a1a;
  --color-text-display: #4a4a4a;
  --color-fill-one: #f5f5f5;
  --color-fill-two: #ffffff;
  --color-border-one: #e0e0e0;
  
  /* 字体系统 */
  --font-family-sans: 'TikTokSans', system-ui, sans-serif;
  
  /* 断点系统 */
  --breakpoint-lg: 1024px;
}
```

#### 5.1.2 响应式设计原则
```typescript
// 移动端优先的类名结构
const responsiveClasses = [
  'text-sm lg:text-xl',      // 字体大小
  'px-4 lg:px-8',            // 内边距
  'flex flex-col lg:flex-row', // 布局方向
  'gap-2.5 lg:gap-10'        // 间距
];
```

### 5.2 图标字体系统

#### 5.2.1 自定义图标字体
```
public/fonts/
├── iconfont.ttf           # TrueType 字体
├── iconfont.woff          # WOFF 字体
├── iconfont.woff2         # WOFF2 字体
└── iconfont.js            # 图标 Unicode 映射
```

#### 5.2.2 图标组件实现
```typescript
interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  return (
    <i className={`iconfont icon-${name} ${className}`} />
  );
};
```

## 6. 动画系统架构

### 6.1 ScrollReveal 集成

#### 6.1.1 动画配置系统
```typescript
// useScrollReveal.ts
export const useScrollRevealMultiple = (configs: ScrollRevealConfig[]) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then(({ default: ScrollReveal }) => {
        const sr = ScrollReveal({
          distance: '30px',
          duration: 600,
          easing: 'ease-in-out',
          mobile: true,
          reset: false
        });

        configs.forEach(({ selector, config }) => {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            sr.reveal(selector, config);
          }
        });
      });
    }
  }, [configs]);
};
```

#### 6.1.2 多模块动画配置
```typescript
// 首页动画配置示例
const scrollRevealConfig = useMemo(() => [
  {
    selector: '.hero-section',
    config: {
      origin: 'top' as const,
      distance: '50px',
      duration: 800,
      delay: 100
    }
  },
  {
    selector: '.product-card',
    config: {
      origin: 'bottom' as const,
      distance: '40px',
      duration: 700,
      delay: 200,
      interval: 100  // 交错动画
    }
  }
], []);
```

## 7. 性能优化架构

### 7.1 图片优化策略

#### 7.1.1 Next.js Image 组件
```typescript
// 响应式图片加载
<Image
  src={product.image}
  alt={product.alt}
  fill
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="object-cover transition-transform duration-600 group-hover:scale-110"
  priority={isAboveFold} // 首屏图片优先加载
/>
```

#### 7.1.2 图片资源管理
```
public/images/
├── hero.png               # 英雄区域图片
├── products.png          # 产品图片
├── COB-Display/          # 产品系列图片
├── operationdesk/        # 产品系列图片
└── PDetailsOverview/     # 产品详情图片
```

### 7.2 代码分割策略

#### 7.2.1 动态导入
```typescript
// 组件级别的代码分割
const ContactForm = dynamic(() => import('./components/ContactForm'), {
  loading: () => <LoadingSpinner />
});

// 第三方库的动态导入
useEffect(() => {
  if (typeof window !== 'undefined') {
    import('scrollreveal').then(({ default: ScrollReveal }) => {
      // ScrollReveal 初始化
    });
  }
}, []);
```

#### 7.2.2 Turbopack 优化
```json
{
  "scripts": {
    "dev": "next dev --turbopack",      // 开发模式使用 Turbopack
    "build": "next build --turbopack"   // 构建模式使用 Turbopack
  }
}
```

### 7.3 缓存策略

#### 7.3.1 静态资源缓存
```typescript
// useMemo 缓存计算结果
const homeProductsData = useMemo(() => {
  const productsData = getContent<Product[]>('products.items') || [];
  return productsData.slice(0, 8);
}, [getContent]);

// useCallback 缓存函数引用
const toggleMute = useCallback(() => {
  if (videoRef.current) {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  }
}, []);
```

## 8. 错误处理架构

### 8.1 错误边界系统

#### 8.1.1 ErrorBoundary 组件
```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error?.message}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 8.2 数据验证和降级

#### 8.2.1 内容数据验证
```typescript
// 安全的内容访问
const getContent = <T = unknown>(path: string): T => {
  try {
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
  } catch (error) {
    console.error('Content access error:', error);
    return null as T;
  }
};
```

#### 8.2.2 组件降级处理
```typescript
// 产品数据安全访问
const product = productsData.find(p => p.id === productId);

if (!product) {
  return <div>Product not found</div>;  // 降级 UI
}

// 可选数据的安全渲染
{product.specifications && (
  <div>
    {Object.entries(product.specifications).map(([key, value]) => (
      <div key={key}>
        <span>{key}:</span>
        <span>{value || 'N/A'}</span>  // 空值处理
      </div>
    ))}
  </div>
)}
```

## 9. 构建和部署架构

### 9.1 构建配置

#### 9.1.1 Next.js 配置
```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['localhost'],  // 允许的图片域名
    formats: ['image/webp', 'image/avif'],  // 支持的图片格式
  },
  experimental: {
    turbopack: true  // 启用 Turbopack
  }
};

export default nextConfig;
```

#### 9.1.2 TypeScript 配置
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 9.2 部署策略

#### 9.2.1 静态导出配置
```typescript
// 静态站点导出配置
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true  // 静态导出时禁用图片优化
  }
};
```

#### 9.2.2 环境配置
```bash
# 开发环境
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000

# 生产环境
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

---

*文档版本: v1.0*
*最后更新: 2025-09-04*
*维护者: Claude Code*