# ProductCard 组件详细文档

## 📋 组件概述

ProductCard 是 E5DAO 企业官网中最核心的产品展示组件，支持两种产品类型（自研产品和标准产品）的灵活展示，具备双输入模式、多变体设计和智能性能优化特性。

### 核心特性
- **双输入模式**: 支持完整产品对象或逐字段传递
- **产品类型适配**: 自动识别并适配不同产品类型
- **多变体设计**: default（网格）和 solution（列表）两种布局
- **性能优化**: React.memo + useMemo 缓存优化
- **智能URL生成**: 基于分类的动态路由生成
- **响应式设计**: 完全适配移动端和桌面端

## 🏗️ 接口设计

### 组件 Props 接口
```typescript
interface ProductCardProps {
  // ============ 方式1：完整产品对象传递（推荐） ============
  product?: Product;
  
  // ============ 方式2：逐字段传递（向后兼容） ============
  image?: string;                    // 产品图片URL
  alt?: string;                      // 图片替代文本
  model?: string;                    // 产品型号（标准产品）
  title?: string;                    // 产品标题（自研产品）
  description?: string;              // 产品描述
  productType?: 'independent-rd' | 'standard';  // 产品类型
  standardCategory?: string;         // 标准产品分类
  id?: number;                       // 产品ID
  categoryId?: number;               // 分类ID
  
  // ============ 通用控制属性 ============
  className?: string;                // 自定义样式类名
  href?: string;                     // 自定义链接地址
  variant?: 'default' | 'solution'; // 显示变体
}
```

### 产品类型定义
```typescript
// 基础产品接口
interface BaseProduct {
  id: number;
  categoryId: number;
  image: string;
  alt: string;
  productType: 'independent-rd' | 'standard';
  gallery?: string[];
  specifications?: Record<string, string | undefined>;
  details?: ProductDetail[];
}

// 自研产品（Independent R&D Product）
interface IndependentRDProduct extends BaseProduct {
  productType: 'independent-rd';
  title: string;                     // 必填：产品标题
  description: string;               // 必填：产品描述
  model?: string;                    // 可选：技术标识
}

// 标准产品（Standard Product）
interface StandardProduct extends BaseProduct {
  productType: 'standard';
  model: string;                     // 必填：产品型号
  standardCategory: string;          // 必填：标准产品分类
  title?: string;                    // 可选：向后兼容
  description?: string;              // 可选：向后兼容
}

// 产品类型联合
type Product = IndependentRDProduct | StandardProduct;
```

## 🔍 核心实现逻辑

### 1. 智能数据解析系统

#### 1.1 数据源识别与处理
```typescript
function ProductCard(props: ProductCardProps) {
  // 智能解析数据来源，处理可选字段
  const productData = props.product ? {
    // 从完整产品对象中提取数据
    id: props.product.id,
    categoryId: props.product.categoryId,
    image: props.product.image,
    alt: props.product.alt,
    // 使用 'in' 操作符安全检查可选字段
    model: 'model' in props.product ? props.product.model : undefined,
    title: 'title' in props.product ? props.product.title : undefined,
    description: 'description' in props.product ? props.product.description : undefined,
    productType: props.product.productType,
    standardCategory: 'standardCategory' in props.product ? props.product.standardCategory : undefined,
  } : {
    // 逐字段传递的数据处理（向后兼容）
    id: props.id || 0,
    categoryId: props.categoryId || 0,
    image: props.image || '',
    alt: props.alt || '',
    model: props.model,
    title: props.title,
    description: props.description,
    productType: props.productType || 'independent-rd' as const,
    standardCategory: props.standardCategory,
  };
}
```

#### 1.2 数据处理优势
- **类型安全**: 使用 TypeScript 的 `'field' in object` 语法安全检查字段
- **向下兼容**: 支持旧版本的逐字段传递方式
- **默认值处理**: 为必要字段提供合理的默认值
- **字段映射**: 自动处理不同产品类型的字段差异

### 2. 智能URL生成系统

#### 2.1 URL 构建逻辑
```typescript
// 使用 useMemo 优化产品URL生成，避免重复计算
const productUrl = useMemo(() => {
  // 1. 优先使用自定义 href
  if (href) return href;
  
  // 2. 验证必要参数
  if (!id || !categoryId) return '#';
  
  // 3. 获取分类数据并查找匹配的分类
  const categoriesData = getContent<ProductCategory[]>('products.categories') || [];
  const category = categoriesData.find((cat: ProductCategory) => cat.id === categoryId);
  
  // 4. 错误处理
  if (!category) {
    console.warn(`Category not found for categoryId ${categoryId}`);
    return '#';
  }
  
  // 5. 生成动态路由URL
  return `/products/${category.slug}/${id}`;
}, [href, id, categoryId, getContent]);
```

#### 2.2 URL 生成特点
- **性能优化**: useMemo 缓存计算结果，避免重复计算
- **错误处理**: 优雅处理分类不存在的情况
- **动态路由**: 支持 `/products/[category]/[id]` 格式
- **SEO 友好**: 使用分类 slug 生成可读的 URL

### 3. 多变体渲染系统

#### 3.1 Default 变体（网格布局）
```typescript
const cardContent = (
  <div className="group flex flex-col cursor-pointer rounded-sm overflow-hidden bg-fill-four transition-all duration-300 hover:shadow-xl">
    {/* 产品图片区域 - 正方形布局 */}
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

    {/* 产品信息区域 - 紧凑布局 */}
    <div className="lg:px-5 px-2.5 lg:py-4 py-2 flex flex-col lg:gap-2">
      {/* 根据产品类型显示不同内容 */}
    </div>
  </div>
);
```

**特点**:
- **使用场景**: 产品列表页、首页产品展示网格
- **图片比例**: 1:1 正方形，适合网格布局
- **响应式**: 移动端 2列，桌面端 4列
- **交互效果**: hover 时图片缩放和阴影效果
- **尺寸优化**: 使用 `sizes` 属性优化响应式图片加载

#### 3.2 Solution 变体（列表布局）
```typescript
const solutionCardContent = (
  <div className="group flex lg:flex-row flex-col lg:gap-10 gap-5 cursor-pointer lg:py-5 hover:bg-fill-three border-b border-border-one">
    {/* 产品图片区域 - 4:3 比例 */}
    <div className="flex-1 aspect-[4/3]">
      <Image
        src={image}
        alt={alt}
        width={600}
        height={450}
        className="aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    {/* 产品信息区域 - 扩展信息显示 */}
    <div className="lg:p-5 py-5 flex-2 flex flex-col gap-2.5">
      {/* 更详细的产品信息 */}
      
      {/* 操作按钮区域 */}
      <div className="mt-auto">
        <Button>View Details</Button>
      </div>
    </div>
  </div>
);
```

**特点**:
- **使用场景**: 解决方案页面、产品详情页推荐
- **图片比例**: 4:3 横向布局，更适合详细展示
- **信息容量**: 更大的文本展示空间，支持更多内容
- **操作按钮**: 内置 "View Details" 按钮
- **响应式**: 移动端垂直堆叠，桌面端水平排列

### 4. 产品类型适配渲染

#### 4.1 自研产品渲染逻辑
```typescript
{productType === 'independent-rd' ? (
  <>
    {/* 显示产品标题 */}
    {title && (
      <h3 className="lg:text-3xl text-base font-medium text-text-brand group-hover:text-text-brand-hover transition-colors duration-200 line-clamp-2">
        {title}
      </h3>
    )}
    
    {/* 显示产品描述 */}
    {description && (
      <p className="lg:text-xl text-sm lg:text-text-display font-normal line-clamp-6 leading-relaxed">
        {description}
      </p>
    )}
  </>
) : (
  // 标准产品渲染逻辑
)}
```

**自研产品特点**:
- **主要字段**: `title` + `description`
- **展示重点**: 突出产品创新性和独特价值
- **文字处理**: 标题限制2行，描述限制6行（solution变体）
- **色彩变化**: hover 时标题颜色渐变过渡

#### 4.2 标准产品渲染逻辑
```typescript
{productType === 'standard' ? (
  <>
    {/* 显示产品型号 */}
    {model && (
      <h3 className="lg:text-3xl text-base font-medium text-text-brand group-hover:text-text-brand-hover transition-colors duration-200 line-clamp-2">
        {model}
      </h3>
    )}
    
    {/* 显示产品描述 */}
    {description && (
      <p className="lg:text-xl text-sm lg:text-text-display font-normal line-clamp-6 leading-relaxed">
        {description}
      </p>
    )}
  </>
) : (
  // 自研产品渲染逻辑
)}
```

**标准产品特点**:
- **主要字段**: `model` + `description`
- **展示重点**: 突出产品规格和标准化程度
- **型号突出**: 使用产品型号作为主标题
- **统一格式**: 保持与自研产品相同的视觉层次

## 🚀 性能优化策略

### 1. React.memo 优化
```typescript
// 使用 memo 优化性能，避免不必要的重新渲染
export default memo(ProductCard);
```

**优化效果**:
- 仅在 props 发生变化时重新渲染
- 减少大量产品卡片场景下的渲染成本
- 提升列表滚动性能

### 2. useMemo 缓存优化
```typescript
// 缓存 URL 生成结果
const productUrl = useMemo(() => {
  // URL 生成逻辑
}, [href, id, categoryId, getContent]);
```

**优化效果**:
- 避免每次渲染时重复计算 URL
- 减少分类数据的重复查找
- 依赖项精确控制，只在必要时重新计算

### 3. 图片优化策略
```typescript
<Image
  src={image}
  alt={alt}
  fill  // 或指定具体尺寸
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="object-cover transition-transform duration-600 group-hover:scale-110"
  priority={isAboveFold}  // 首屏图片优先加载
/>
```

**优化特点**:
- **响应式图片**: 根据屏幕尺寸加载合适的图片
- **懒加载**: 非首屏图片自动懒加载
- **优先加载**: 首屏图片设置 priority
- **尺寸优化**: 合理的 sizes 属性减少加载量

## 📱 响应式设计

### 1. 断点设计
- **移动端** (`< 1024px`): 紧凑布局，小尺寸字体和间距
- **桌面端** (`>= 1024px`): 宽松布局，大尺寸字体和间距

### 2. 响应式类名模式
```css
/* 字体大小响应式 */
.text-base.lg:text-xl     /* 移动端 16px，桌面端 20px */
.text-sm.lg:text-xl       /* 移动端 14px，桌面端 20px */

/* 内边距响应式 */
.px-2.5.lg:px-5          /* 移动端 10px，桌面端 20px */
.py-2.lg:py-4            /* 移动端 8px，桌面端 16px */

/* 间距响应式 */
.gap-5.lg:gap-10         /* 移动端 20px，桌面端 40px */
```

### 3. 布局适配
- **Default 变体**: 网格布局自适应列数
- **Solution 变体**: 移动端垂直堆叠，桌面端水平排列
- **图片比例**: 不同变体使用不同的图片比例适配布局

## 🎨 样式系统

### 1. 设计令牌
```css
/* 颜色系统 */
.text-text-brand          /* 品牌色文本 */
.text-text-brand-hover    /* hover 状态品牌色 */
.text-text-display        /* 显示文本颜色 */
.bg-fill-four            /* 背景填充色 */
.border-border-one       /* 边框色 */

/* 过渡动画 */
.transition-all.duration-300      /* 通用过渡 */
.transition-colors.duration-200   /* 颜色过渡 */
.transition-transform.duration-600 /* 变换过渡 */
```

### 2. 交互状态
- **默认状态**: 正常显示，图片无缩放
- **Hover 状态**: 
  - Default 变体: 图片放大 110%，添加阴影
  - Solution 变体: 背景变色，图片放大 105%
  - 标题颜色过渡变化
- **Focus 状态**: 键盘导航支持

### 3. 文本截断
```css
.line-clamp-1     /* 单行截断 */
.line-clamp-2     /* 两行截断 */
.line-clamp-6     /* 六行截断（solution 变体） */
```

## 🔗 组件集成

### 1. 与内容系统集成
```typescript
import useContent from '../../lib/useContent';

const { getContent } = useContent();
const categoriesData = getContent<ProductCategory[]>('products.categories') || [];
```

### 2. 与路由系统集成
```typescript
import Link from 'next/link';

// 动态路由生成
const productUrl = `/products/${category.slug}/${id}`;

return (
  <Link href={productUrl}>
    {cardContent}
  </Link>
);
```

### 3. 与图片系统集成
```typescript
import Image from 'next/image';

// Next.js 优化图片组件
<Image
  src={image}
  alt={alt}
  // 其他优化属性
/>
```

## 📖 使用示例

### 1. 基础使用（推荐方式）
```typescript
import ProductCard from '@/components/ProductCard';

// 使用完整产品对象
const MyComponent = () => {
  const productsData = getContent<Product[]>('products.items');
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-10">
      {productsData.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="w-full"
        />
      ))}
    </div>
  );
};
```

### 2. 解决方案变体使用
```typescript
// Solution 变体，适用于列表布局
const SolutionPage = () => {
  return (
    <div className="space-y-5">
      {solutionProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant="solution"
          className="w-full"
        />
      ))}
    </div>
  );
};
```

### 3. 逐字段传递（向后兼容）
```typescript
// 逐字段传递方式（不推荐，但支持向后兼容）
<ProductCard
  image="/images/product.jpg"
  alt="Product Image"
  title="Carbon Fiber Display"
  description="High-quality carbon fiber display system"
  productType="independent-rd"
  id={1}
  categoryId={1}
  className="w-full"
/>
```

### 4. 自定义链接
```typescript
// 使用自定义链接地址
<ProductCard
  product={productData}
  href="/custom-product-page"
  className="w-full"
/>
```

## 🐛 错误处理

### 1. 数据缺失处理
```typescript
// 图片缺失处理
const image = productData.image || '/images/placeholder.jpg';

// 分类不存在处理
if (!category) {
  console.warn(`Category not found for categoryId ${categoryId}`);
  return '#';
}
```

### 2. 条件渲染
```typescript
// 安全的条件渲染
{title && (
  <h3 className="...">
    {title}
  </h3>
)}

{description && (
  <p className="...">
    {description}
  </p>
)}
```

### 3. 链接降级
```typescript
// 当无法生成有效链接时的降级处理
return (
  <>
    {(href || id) ? (
      <Link href={productUrl}>
        {cardContent}
      </Link>
    ) : (
      cardContent  // 无链接时直接显示内容
    )}
  </>
);
```

## 🔧 自定义和扩展

### 1. 样式自定义
```typescript
// 通过 className 自定义样式
<ProductCard
  product={productData}
  className="shadow-lg rounded-lg border-2 border-blue-500"
/>
```

### 2. 变体扩展
如需添加新的显示变体，可以扩展 variant 属性：

```typescript
interface ProductCardProps {
  variant?: 'default' | 'solution' | 'compact' | 'featured';
}

// 在组件中添加新变体的处理逻辑
if (variant === 'compact') {
  // 紧凑变体的渲染逻辑
}
```

### 3. 事件处理扩展
```typescript
interface ProductCardProps {
  onClick?: (product: Product) => void;
  onHover?: (product: Product) => void;
}
```

## 🧪 测试建议

### 1. 单元测试
```typescript
describe('ProductCard Component', () => {
  it('renders independent R&D product correctly', () => {
    const independentProduct: IndependentRDProduct = {
      id: 1,
      categoryId: 1,
      productType: 'independent-rd',
      title: 'Test Product',
      description: 'Test Description',
      image: '/test-image.jpg',
      alt: 'Test Alt'
    };

    render(<ProductCard product={independentProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders standard product correctly', () => {
    const standardProduct: StandardProduct = {
      id: 2,
      categoryId: 1,
      productType: 'standard',
      model: 'TEST-001',
      standardCategory: 'Test Category',
      image: '/test-image.jpg',
      alt: 'Test Alt'
    };

    render(<ProductCard product={standardProduct} />);
    
    expect(screen.getByText('TEST-001')).toBeInTheDocument();
  });
});
```

### 2. 集成测试
```typescript
it('generates correct product URL', () => {
  const mockGetContent = jest.fn().mockReturnValue([
    { id: 1, slug: 'test-category', title: 'Test Category' }
  ]);

  render(
    <ProductCard 
      product={testProduct}
      useContent={{ getContent: mockGetContent }}
    />
  );

  const linkElement = screen.getByRole('link');
  expect(linkElement).toHaveAttribute('href', '/products/test-category/1');
});
```

### 3. 性能测试
```typescript
it('does not re-render when props do not change', () => {
  const renderSpy = jest.fn();
  const TestProductCard = memo(() => {
    renderSpy();
    return <ProductCard product={testProduct} />;
  });

  const { rerender } = render(<TestProductCard />);
  rerender(<TestProductCard />);

  expect(renderSpy).toHaveBeenCalledTimes(1);
});
```

---

*文档版本: v1.0*
*最后更新: 2025-09-04*
*维护者: Claude Code*