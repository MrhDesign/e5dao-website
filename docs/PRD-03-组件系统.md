# PRD-03 组件系统文档

## 1. 组件系统概述

### 1.1 设计原则
- **单一职责**: 每个组件专注于特定功能
- **可复用性**: 组件高度可复用，支持多场景使用
- **类型安全**: 所有组件使用 TypeScript 接口定义
- **响应式设计**: 所有组件支持移动端和桌面端
- **性能优化**: 使用 React.memo 和 hooks 优化

### 1.2 组件分层架构
```
components/
├── 原子组件 (Atomic)        # 最基础的 UI 元素
├── 分子组件 (Molecular)     # 组合原子组件的复合组件
├── 有机体组件 (Organism)    # 复杂的功能模块组件
└── 模板组件 (Template)      # 页面布局模板组件
```

## 2. 原子组件 (Atomic Components)

### 2.1 Button 组件

#### 2.1.1 组件特性
- 支持 4 种视觉变体：primary、secondary、outline、ghost
- 内置加载状态和禁用状态
- 响应式尺寸和交互动画
- 完整的 HTML button 属性支持

#### 2.1.2 接口定义
```typescript
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;      // 按钮变体
  loading?: boolean;            // 加载状态
  children: React.ReactNode;    // 按钮内容
}
```

#### 2.1.3 实现特点
```typescript
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'cursor-pointer transition-all duration-600 ease-in-out lg:text-xl text-sm lg:font-normal font-medium lg:px-6 px-4 lg:py-3 py-2.5 bg-fill-one/90 text-text-black leading-none border border-border-one rounded-full inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:lg:px-8 hover:px-6 hover:bg-fill-black hover:text-text-white';

  // 悬停时的尺寸变化动画
  // 完整的无障碍支持
  // 加载状态的旋转动画
};
```

#### 2.1.4 使用场景
- 主要操作按钮（CTA）
- 表单提交按钮
- 导航链接按钮
- 交互触发器

### 2.2 Icon 组件

#### 2.2.1 组件特性
- 基于自定义图标字体系统
- 支持动态图标名称
- 灵活的样式定制
- 完全响应式

#### 2.2.2 接口定义
```typescript
interface IconProps {
  name: string;           // 图标名称
  className?: string;     // 自定义样式
}
```

#### 2.2.3 图标字体系统
```css
/* iconfont.css */
@font-face {
  font-family: 'iconfont';
  src: url('/fonts/iconfont.woff2') format('woff2'),
       url('/fonts/iconfont.woff') format('woff'),
       url('/fonts/iconfont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### 2.2.4 使用示例
```typescript
// 基础使用
<Icon name="customer-service-2-line" />

// 自定义样式
<Icon name="mail-send-line" className="text-2xl text-blue-500" />
```

### 2.3 LoadingSpinner 组件

#### 2.3.1 组件特性
- SVG 动画实现
- 可配置尺寸和颜色
- 流畅的旋转动画
- 轻量级实现

#### 2.3.2 接口定义
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

## 3. 分子组件 (Molecular Components)

### 3.1 ProductCard 组件

#### 3.1.1 组件特性
- **双输入模式支持**: 完整产品对象 OR 逐字段传递
- **多变体设计**: default 和 solution 两种布局
- **智能数据解析**: 自动识别产品类型和处理可选字段
- **性能优化**: React.memo 和 useMemo 优化
- **响应式设计**: 完全适配移动端和桌面端

#### 3.1.2 接口定义
```typescript
interface ProductCardProps {
  // 方式1：传递完整产品对象
  product?: Product;
  
  // 方式2：逐字段传递（向后兼容）
  image?: string;
  alt?: string;
  model?: string;
  title?: string;
  description?: string;
  productType?: 'independent-rd' | 'standard';
  standardCategory?: string;
  id?: number;
  categoryId?: number;
  
  // 通用属性
  className?: string;
  href?: string;
  variant?: 'default' | 'solution';
}
```

#### 3.1.3 核心实现逻辑
```typescript
function ProductCard(props: ProductCardProps) {
  // 智能解析数据来源，处理可选字段
  const productData = props.product ? {
    id: props.product.id,
    categoryId: props.product.categoryId,
    image: props.product.image,
    alt: props.product.alt,
    model: 'model' in props.product ? props.product.model : undefined,
    title: 'title' in props.product ? props.product.title : undefined,
    description: 'description' in props.product ? props.product.description : undefined,
    productType: props.product.productType,
    standardCategory: 'standardCategory' in props.product ? props.product.standardCategory : undefined,
  } : {
    // 逐字段传递的数据处理
  };

  // 使用 useMemo 优化产品URL生成
  const productUrl = useMemo(() => {
    if (href) return href;
    if (!id || !categoryId) return '#';
    
    const categoriesData = getContent<ProductCategory[]>('products.categories') || [];
    const category = categoriesData.find((cat: ProductCategory) => cat.id === categoryId);
    
    if (!category) {
      console.warn(`Category not found for categoryId ${categoryId}`);
      return '#';
    }
    
    return `/products/${category.slug}/${id}`;
  }, [href, id, categoryId, getContent]);
}

// 使用 memo 优化性能，避免不必要的重新渲染
export default memo(ProductCard);
```

#### 3.1.4 变体设计

##### Default 变体（网格布局）
```typescript
// 标准卡片样式，适用于产品列表和网格展示
const cardContent = (
  <div className="group flex flex-col cursor-pointer rounded-sm overflow-hidden bg-fill-four transition-all duration-300 hover:shadow-xl">
    {/* 产品图片区域 */}
    <div className="w-full h-full overflow-hidden relative z-0">
      <div className="w-full relative aspect-square bg-fill-one overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-600 group-hover:scale-110"
        />
      </div>
    </div>
    {/* 产品信息区域 */}
  </div>
);
```

##### Solution 变体（列表布局）
```typescript
// 解决方案专用变体，水平布局，更大的信息展示空间
const solutionCardContent = (
  <div className="group flex lg:flex-row flex-col lg:gap-10 gap-5 cursor-pointer lg:py-5 hover:bg-fill-three border-b border-border-one">
    {/* 产品图片区域 - 解决方案变体 */}
    <div className="flex-1 aspect-[4/3]">
      <Image
        src={image}
        alt={alt}
        width={600}
        height={450}
        className="aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    {/* 产品信息区域 - 解决方案变体 */}
    <div className="lg:p-5 py-5 flex-2 flex flex-col gap-2.5">
      {/* 根据产品类型显示不同内容 */}
    </div>
  </div>
);
```

#### 3.1.5 产品类型适配
```typescript
// 自研产品显示逻辑
{productType === 'independent-rd' ? (
  <>
    {title && (
      <h3 className="lg:text-3xl text-base font-medium text-text-brand group-hover:text-text-brand-hover transition-colors duration-200 line-clamp-2">
        {title}
      </h3>
    )}
    {description && (
      <p className="lg:text-xl text-sm lg:text-text-display font-normal line-clamp-6 leading-relaxed">
        {description}
      </p>
    )}
  </>
) : (
  <>
    {/* 标准产品显示 model + description */}
    {model && (
      <h3 className="lg:text-3xl text-base font-medium text-text-brand group-hover:text-text-brand-hover transition-colors duration-200 line-clamp-2">
        {model}
      </h3>
    )}
    {description && (
      <p className="lg:text-xl text-sm lg:text-text-display font-normal line-clamp-6 leading-relaxed">
        {description}
      </p>
    )}
  </>
)}
```

### 3.2 NewCard 组件

#### 3.2.1 组件特性
- 新闻和行业应用的统一卡片组件
- 支持两种链接类型：article 和 application
- 日期格式化显示
- 响应式图片和文本布局

#### 3.2.2 接口定义
```typescript
interface NewCardProps {
  image: string;
  alt: string;
  year: string;
  date: string;              // MM/DD 格式
  title: string;
  description: string;
  slug: string;
  linkType: 'article' | 'application';
  className?: string;
}
```

#### 3.2.3 链接路由逻辑
```typescript
const NewCard: React.FC<NewCardProps> = ({ linkType, slug, ...props }) => {
  const linkHref = linkType === 'article' 
    ? `/news/articles/${slug}` 
    : `/news/applications/${slug}`;

  return (
    <Link href={linkHref}>
      {/* 卡片内容 */}
    </Link>
  );
};
```

### 3.3 ContactForm 组件

#### 3.3.1 组件特性
- 多字段客户信息收集
- 表单验证和错误处理
- 提交状态管理
- 响应式表单布局

#### 3.3.2 接口定义
```typescript
interface ContactFormProps {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  productInterest: string;
}
```

#### 3.3.3 表单状态管理
```typescript
const ContactForm: React.FC<ContactFormProps> = ({ className, onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    productInterest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    // ... 更多验证逻辑
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
};
```

## 4. 有机体组件 (Organism Components)

### 4.1 Header 组件

#### 4.1.1 组件特性
- 响应式导航栏设计
- 移动端汉堡菜单
- 多级导航支持
- 滚动状态适配

#### 4.1.2 导航结构
```typescript
interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'Products', 
    href: '/products',
    children: [
      { label: 'Command Systems', href: '/products/command-system' },
      { label: 'Medical Systems', href: '/products/treatment-system' },
      { label: 'Universal Gear', href: '/products/universal-gear' }
    ]
  },
  // ...更多导航项
];
```

### 4.2 Footer 组件

#### 4.2.1 组件特性
- 多栏布局设计
- 社交媒体链接
- 版权信息展示
- 响应式适配

#### 4.2.2 布局结构
```typescript
const Footer = () => {
  return (
    <footer className="bg-fill-black text-text-white">
      <div className="container mx-auto px-30 py-20">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-10">
          {/* 公司信息栏 */}
          <div>
            <h3 className="text-xl font-medium mb-5">E5DAO</h3>
            <p className="text-sm leading-relaxed">
              专注于高端复合材料技术的研发与生产
            </p>
          </div>
          
          {/* 产品链接栏 */}
          <div>
            <h4 className="text-lg font-medium mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/products/command-system">Command Systems</Link></li>
              <li><Link href="/products/treatment-system">Medical Systems</Link></li>
            </ul>
          </div>
          
          {/* 更多栏位... */}
        </div>
        
        {/* 版权信息 */}
        <div className="border-t border-border-one mt-10 pt-10">
          <p className="text-center text-sm">
            © 2025 E5DAO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
```

### 4.3 ProductImageGallery 组件

#### 4.3.1 组件特性
- 主图和缩略图展示
- 图片切换动画
- 响应式布局适配
- 触控手势支持

#### 4.3.2 接口定义
```typescript
interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}
```

#### 4.3.3 图片状态管理
```typescript
const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  className
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageChange = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentImageIndex(index);
    }
  }, [images.length]);

  return (
    <div className={`product-gallery ${className}`}>
      {/* 主图显示区域 */}
      <div className="main-image">
        <Image
          src={images[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      
      {/* 缩略图导航 */}
      <div className="thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
          >
            <Image src={image} alt={`Thumbnail ${index + 1}`} fill />
          </button>
        ))}
      </div>
    </div>
  );
};
```

## 5. 模板组件 (Template Components)

### 5.1 DetailPage 组件

#### 5.1.1 组件特性
- 统一的详情页布局模板
- 面包屑导航集成
- 侧边栏支持
- 内容区域灵活布局

#### 5.1.2 接口定义
```typescript
interface DetailPageProps {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}
```

### 5.2 NewsListPage 组件

#### 5.2.1 组件特性
- 新闻列表页面模板
- 分页功能集成
- 筛选和搜索支持
- 响应式网格布局

#### 5.2.2 接口定义
```typescript
interface NewsListPageProps {
  items: NewsItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  title: string;
  className?: string;
}
```

## 6. 功能性组件 (Functional Components)

### 6.1 ContentRenderer 组件

#### 6.1.1 组件特性
- 动态内容渲染器
- 支持多种内容类型
- 可扩展的内容格式
- 安全的内容渲染

#### 6.1.2 支持的内容类型
```typescript
export interface ProductDetail {
  type: 'heading' | 'paragraph' | 'image' | 'list';
  content: string;
  level?: 1 | 2 | 3 | 4;        // heading 专用
  image?: string;               // image 专用
  alt?: string;                 // image 专用
  items?: string[];             // list 专用
}
```

#### 6.1.3 渲染逻辑
```typescript
const ContentRenderer: React.FC<{ sections: ProductDetail[] }> = ({ sections }) => {
  return (
    <div className="content-renderer">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'heading':
            const HeadingTag = `h${section.level || 2}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag key={index} className={`heading-${section.level || 2}`}>
                {section.content}
              </HeadingTag>
            );
            
          case 'paragraph':
            return (
              <p key={index} className="paragraph">
                {section.content}
              </p>
            );
            
          case 'list':
            return (
              <div key={index}>
                <p className="list-title">{section.content}</p>
                <ul className="list-items">
                  {section.items?.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            );
            
          case 'image':
            return (
              <div key={index} className="image-container">
                <Image
                  src={section.image || ''}
                  alt={section.alt || ''}
                  width={800}
                  height={600}
                  className="content-image"
                />
              </div>
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
};
```

### 6.2 Pagination 组件

#### 6.2.1 组件特性
- 数字分页导航
- 上一页/下一页导航
- 页码跳转支持
- 可配置显示范围

#### 6.2.2 接口定义
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  showNavigation?: boolean;
  maxPageNumbers?: number;
  className?: string;
}
```

### 6.3 ProcessFlow 组件

#### 6.3.1 组件特性
- 步骤流程展示
- 图标和文字结合
- 响应式步骤布局
- 动画过渡效果

#### 6.3.2 流程数据结构
```typescript
interface ProcessStep {
  id: number;
  icon: string;
  title: string;
  description: string;
  stepNumber: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    icon: "customer-service-2-line",
    title: "Customer Inquiry",
    description: "Contact our team to discuss requirements.",
    stepNumber: "1"
  },
  // ... 更多步骤
];
```

## 7. 组件性能优化策略

### 7.1 React.memo 优化
```typescript
// 对复杂组件使用 memo 优化
export default memo(ProductCard);
export default memo(NewCard);
export default memo(ProductImageGallery);
```

### 7.2 useMemo 优化
```typescript
// 缓存计算结果
const productUrl = useMemo(() => {
  if (href) return href;
  // ... 计算逻辑
}, [href, id, categoryId, getContent]);

// 缓存组件配置
const scrollRevealConfig = useMemo(() => [
  // ... 配置数组
], []);
```

### 7.3 useCallback 优化
```typescript
// 缓存事件处理函数
const handleImageChange = useCallback((index: number) => {
  if (index >= 0 && index < images.length) {
    setCurrentImageIndex(index);
  }
}, [images.length]);
```

### 7.4 动态导入优化
```typescript
// 延迟加载重型组件
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />
});
```

## 8. 组件测试策略

### 8.1 单元测试
```typescript
// 组件基础功能测试
describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 8.2 集成测试
```typescript
// 组件交互测试
describe('ProductCard Component', () => {
  it('navigates to product detail on click', () => {
    const mockProduct = { /* ... */ };
    render(<ProductCard product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('link'));
    expect(mockRouter.push).toHaveBeenCalledWith(`/products/${mockProduct.categorySlug}/${mockProduct.id}`);
  });
});
```

## 9. 组件文档规范

### 9.1 组件文档结构
```typescript
/**
 * ProductCard 组件 - 产品展示卡片
 * 
 * @description 支持双输入模式的产品卡片组件，可以传递完整产品对象或逐字段传递
 * @example
 * ```tsx
 * // 使用完整产品对象
 * <ProductCard product={productData} />
 * 
 * // 逐字段传递
 * <ProductCard
 *   image="/images/product.jpg"
 *   title="Product Title"
 *   description="Product description"
 * />
 * ```
 */
```

### 9.2 Props 文档化
```typescript
interface ProductCardProps {
  /** 完整产品对象，优先使用此方式 */
  product?: Product;
  
  /** 产品图片URL（当不传递product时使用） */
  image?: string;
  
  /** 卡片显示变体，default用于网格布局，solution用于列表布局 */
  variant?: 'default' | 'solution';
}
```

---

*文档版本: v1.0*
*最后更新: 2025-09-04*
*维护者: Claude Code*