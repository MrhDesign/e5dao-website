# PRD-05 产品管理系统文档

## 1. 产品管理系统概述

### 1.1 系统设计理念
产品管理系统是整个网站的核心功能模块，负责管理和展示 E5DAO 公司的复合材料产品。系统设计遵循以下原则：

- **双产品类型支持**: 同时支持自研产品和标准产品
- **灵活数据结构**: 可扩展的产品信息架构
- **智能分类管理**: 基于业务场景的产品分类
- **用户体验优先**: 直观的产品浏览和搜索体验
- **性能优化**: 高效的数据加载和缓存策略

### 1.2 业务价值
- 提供专业的产品展示平台
- 支持客户快速找到所需产品
- 展示技术实力和产品优势
- 促进商务合作和询价转化

## 2. 产品数据架构

### 2.1 产品类型系统

#### 2.1.1 产品类型分类
```typescript
enum ProductType {
  INDEPENDENT_RD = 'independent-rd',  // 自研产品
  STANDARD = 'standard'               // 标准产品
}
```

#### 2.1.2 自研产品 (Independent R&D Product)
**特点**: 公司自主研发的创新产品，具有独特技术优势
**主要字段**: `title` + `description`
**应用场景**: 展示公司核心技术实力和创新能力

```typescript
interface IndependentRDProduct extends BaseProduct {
  productType: 'independent-rd';
  title: string;           // 产品完整标题
  description: string;     // 产品详细描述
  model?: string;          // 可选的技术标识
}
```

**数据示例**:
```json
{
  "id": 1,
  "categoryId": 1,
  "productType": "independent-rd",
  "image": "/images/COB-Display/COB-Display01.png",
  "alt": "Carbon Fiber Mobile COB Display Screen",
  "title": "Carbon Fiber Mobile COB Display Screen",
  "description": "Applicable to high-end command and control environments, typically deployed in government agencies, security departments, traffic regulation authorities, command and dispatch centers, and military information command centers.",
  "gallery": ["/images/COB-Display/COB-Display02.png"],
  "specifications": { /* 详细规格参数 */ }
}
```

#### 2.1.3 标准产品 (Standard Product)
**特点**: 标准化的产品系列，有统一的质量保证体系
**主要字段**: `model` + `description`
**应用场景**: 展示产品线的广度和标准化程度

```typescript
interface StandardProduct extends BaseProduct {
  productType: 'standard';
  model: string;           // 产品型号
  standardCategory: string;// 标准产品分类
  title?: string;          // 向后兼容字段
  description?: string;    // 向后兼容字段
}
```

**数据示例**:
```json
{
  "id": 14,
  "categoryId": 1,
  "productType": "standard",
  "image": "/images/fields-1.png",
  "alt": "MC-2580CMD-02 Tactical Command Unit",
  "model": "MC-2580CMD-02",
  "standardCategory": "Command & Control Systems",
  "specifications": { /* 标准规格参数 */ }
}
```

### 2.2 产品分类系统

#### 2.2.1 分类数据结构
```typescript
interface ProductCategory {
  id: number;
  title: string;    // 分类显示名称
  slug: string;     // URL 友好的标识符
}
```

#### 2.2.2 当前分类体系
```json
{
  "categories": [
    {
      "id": 1,
      "title": "Carbon Fiber Modular Mobile Command Post System",
      "slug": "command-system"
    },
    {
      "id": 2,
      "title": "Modular Containerized Medical Treatment System", 
      "slug": "treatment-system"
    },
    {
      "id": 3,
      "title": "Carbon Fiber Universal Gear Series",
      "slug": "universal-gear"
    }
  ]
}
```

#### 2.2.3 分类管理规则
- 每个产品必须归属于一个分类 (`categoryId`)
- 分类 slug 用于生成友好的 URL 路径
- 支持分类级别的产品筛选和展示
- 分类信息用于面包屑导航和 SEO

### 2.3 产品详情内容系统

#### 2.3.1 ContentRenderer 支持的内容类型
```typescript
interface ProductDetail {
  type: 'heading' | 'paragraph' | 'image' | 'list';
  content: string;
  level?: 1 | 2 | 3 | 4;        // heading 专用
  image?: string;               // image 专用
  alt?: string;                 // image 专用
  items?: string[];             // list 专用
}
```

#### 2.3.2 内容类型示例
```json
{
  "details": [
    {
      "type": "heading",
      "content": "Product Features",
      "level": 3
    },
    {
      "type": "paragraph", 
      "content": "Composed of modular LED display units, an adjustable support structure, and a mobile base."
    },
    {
      "type": "list",
      "content": "Seat Structure: Constructed with carbon fiber and aluminum alloy:",
      "items": [
        "Deployed dimensions: >=710mm (H) x 780mm (L) x 500mm (W)",
        "Folded dimensions: <=200mm (H) x 600mm (L) x 500mm (W)",
        "Total weight: <=14.5kg"
      ]
    }
  ]
}
```

## 3. 产品展示组件系统

### 3.1 ProductCard 组件架构

#### 3.1.1 双输入模式设计
```typescript
interface ProductCardProps {
  // 方式1：传递完整产品对象（推荐）
  product?: Product;
  
  // 方式2：逐字段传递（向后兼容）
  image?: string;
  alt?: string;
  model?: string;
  title?: string;
  description?: string;
  productType?: 'independent-rd' | 'standard';
  // ...更多字段
  
  // 变体控制
  variant?: 'default' | 'solution';
}
```

#### 3.1.2 智能数据解析逻辑
```typescript
const productData = props.product ? {
  // 从完整对象中提取数据，处理可选字段
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
```

#### 3.1.3 变体系统设计

##### Default 变体 - 网格布局
- **使用场景**: 产品列表页、首页产品展示
- **布局特点**: 正方形图片、垂直信息排列
- **响应式**: 2列（移动端）/ 4列（桌面端）

```typescript
const cardContent = (
  <div className="group flex flex-col cursor-pointer rounded-sm overflow-hidden bg-fill-four transition-all duration-300 hover:shadow-xl">
    {/* 正方形产品图片 */}
    <div className="w-full relative aspect-square bg-fill-one overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-600 group-hover:scale-110"
      />
    </div>
    
    {/* 产品信息 */}
    <div className="lg:px-5 px-2.5 lg:py-4 py-2 flex flex-col lg:gap-2">
      {/* 根据产品类型显示标题 */}
    </div>
  </div>
);
```

##### Solution 变体 - 列表布局
- **使用场景**: 解决方案页面、产品详情页
- **布局特点**: 横向布局、更大信息展示空间
- **响应式**: 垂直堆叠（移动端）/ 水平排列（桌面端）

```typescript
const solutionCardContent = (
  <div className="group flex lg:flex-row flex-col lg:gap-10 gap-5 cursor-pointer lg:py-5 hover:bg-fill-three border-b border-border-one">
    {/* 4:3 比例产品图片 */}
    <div className="flex-1 aspect-[4/3]">
      <Image
        src={image}
        alt={alt}
        width={600}
        height={450}
        className="aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    
    {/* 扩展信息区域 */}
    <div className="lg:p-5 py-5 flex-2 flex flex-col gap-2.5">
      {/* 更详细的产品信息展示 */}
      <div className="mt-auto">
        <Button>View Details</Button>
      </div>
    </div>
  </div>
);
```

### 3.2 产品类型适配渲染

#### 3.2.1 自研产品渲染逻辑
```typescript
{productType === 'independent-rd' ? (
  <>
    {title && (
      <h3 className="lg:text-xl text-base text-text-brand">
        <span className="line-clamp-1">{title}</span>
      </h3>
    )}
    {description && (
      <p className="text-display line-clamp-1">
        {description}
      </p>
    )}
  </>
) : (
  // 标准产品渲染逻辑
)}
```

#### 3.2.2 标准产品渲染逻辑
```typescript
{productType === 'standard' ? (
  <>
    {model && (
      <h3 className="lg:text-xl text-base text-text-brand">
        <span className="line-clamp-1">{model}</span>
      </h3>
    )}
    {description && (
      <p className="text-display line-clamp-1">
        {description}
      </p>
    )}
  </>
) : (
  // 自研产品渲染逻辑
)}
```

## 4. 产品详情页系统

### 4.1 URL 路由设计
```
/products/[category]/[id]
```
- **category**: 分类 slug（如：command-system）
- **id**: 产品 ID（数字）
- **示例**: `/products/command-system/1`

### 4.2 页面架构设计

#### 4.2.1 布局结构
```typescript
// 产品详情页布局
<div className="bg-fill-two">
  {/* 面包屑导航 */}
  <div className="hidden lg:block px-30 pt-5">
    <Breadcrumb items={breadcrumbItems} />
  </div>

  {/* 产品主体内容 */}
  <div className="lg:px-30 lg:py-20">
    <div className="lg:grid lg:grid-cols-[600px_1fr] flex flex-col lg:gap-10">
      {/* 左侧：产品图片画廊 */}
      <ProductImageGallery
        images={productImages}
        productName={productName}
      />
      
      {/* 右侧：产品信息和推荐 */}
      <div className="lg:p-0 px-5 pt-5 flex flex-col">
        {/* 产品基本信息 */}
        {/* 产品推荐区域 */}
      </div>
    </div>
  </div>

  {/* 详细信息区域 */}
  <section className="lg:px-30 lg:py-0 p-5">
    {/* 产品详情和技术参数 */}
  </section>
</div>
```

#### 4.2.2 分类验证机制
```typescript
// 验证 URL 中的分类是否与产品实际分类匹配
const category = getCategoryByProduct(product, categoriesData);
const currentCategory = getCategoryBySlug(categorySlug, categoriesData);

if (!category || !currentCategory || category.id !== currentCategory.id) {
  return <div>Product not found</div>;
}
```

### 4.3 产品图片系统

#### 4.3.1 ProductImageGallery 组件
```typescript
interface ProductImageGalleryProps {
  images: string[];        // 图片URL数组（主图+画廊）
  productName: string;     // 产品名称（用于alt文本）
  className?: string;
}
```

#### 4.3.2 图片数据组织
```typescript
// 产品图片（主图 + 图库）
const productImages = [
  product.image,              // 主图
  ...(product.gallery || [])  // 画廊图片
];
```

#### 4.3.3 图片展示逻辑
- **主图显示**: 大尺寸展示当前选中图片
- **缩略图导航**: 显示所有图片的小缩略图
- **切换动画**: 平滑的图片切换效果
- **响应式适配**: 移动端和桌面端不同布局

### 4.4 智能产品推荐

#### 4.4.1 推荐算法逻辑
```typescript
// 获取当前分类下的所有产品
const categoryProducts = getProductsByCategory(productsData, product.categoryId);

// 获取当前产品在数组中的索引
const currentIndex = categoryProducts.findIndex(p => p.id === product.id);

// 构建展示产品数组：前一个产品 + 后面的产品（排除当前产品）
const displayProducts: Product[] = [];
const maxProducts = 6; // 设置最大推荐产品数量

// 添加前一个产品（如果存在）
if (currentIndex > 0) {
  displayProducts.push(categoryProducts[currentIndex - 1]);
}

// 添加后面的产品，但不超过最大数量
for (let i = currentIndex + 1; i < categoryProducts.length && displayProducts.length < maxProducts; i++) {
  displayProducts.push(categoryProducts[i]);
}

// 如果还有剩余空间，从前面补充更多产品
if (displayProducts.length < maxProducts) {
  for (let i = currentIndex - 2; i >= 0 && displayProducts.length < maxProducts; i--) {
    displayProducts.unshift(categoryProducts[i]); // 添加到数组开头，保持顺序
  }
}
```

#### 4.4.2 推荐展示设计
```typescript
// 产品推荐区域
<div className="w-full lg:h-[150px] grid lg:grid-cols-[repeat(auto-fit,200px)] lg:gap-y-0 grid-cols-[repeat(3,1fr)] gap-x-2.5 gap-y-2.5 grid-rows-1 overflow-hidden">
  {displayProducts.map((relatedProduct) => {
    const productUrl = `/products/${categorySlug}/${relatedProduct.id}`;
    return (
      <Link key={relatedProduct.id} href={productUrl}>
        <div className="aspect-[4/3] bg-fill-white border border-border-one overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer">
          <Image
            src={relatedProduct.image}
            alt={relatedProduct.alt}
            width={200}
            height={150}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
    );
  })}
</div>
```

## 5. 产品信息展示系统

### 5.1 产品基本信息展示

#### 5.1.1 自研产品信息展示
```typescript
{product.productType === 'independent-rd' ? (
  <>
    <div>
      <h1 className="headline1 text-text-brand mb-2">
        {'title' in product ? product.title : 'Product Title'}
      </h1>
      <div className="text-display">
        <p>{'description' in product ? product.description : 'Product description not available'}</p>
      </div>
    </div>
  </>
) : (
  // 标准产品信息展示
)}
```

#### 5.1.2 标准产品信息展示
```typescript
{product.productType === 'standard' ? (
  <>
    <h1 className="headline1 text-text-brand mb-2">
      {'model' in product ? product.model : 'Product Model'}
    </h1>
    <div className="text-display">
      <p>{'description' in product ? product.description : ''}</p>
    </div>

    {/* 标准产品快速规格信息 */}
    {product.specifications && (
      <div className="">
        {Object.entries(product.specifications).map(([key, value]) => (
          <div key={key} className="grid grid-cols-[30%_1fr] items-center py-2 border-b border-border-one lg:text-base text-sm font-medium">
            <span className="text-text-display">{key}:</span>
            <span className="text-text-title">{value || ''}</span>
          </div>
        ))}
      </div>
    )}
  </>
) : (
  // 自研产品信息展示
)}
```

### 5.2 技术参数表格系统

#### 5.2.1 规格参数表格
```typescript
// 产品详细参数表格
{product.specifications ? (
  <table className="w-full border-collapse bg-fill-four overflow-hidden border border-border-one">
    <tbody className="w-full text-sm">
      {Object.entries(product.specifications).map(([key, value], index) => (
        <tr key={key} className={index % 2 === 0 ? 'bg-fill-two' : 'bg-fill-white'}>
          <td className="lg:px-4 lg:py-2 p-2 font-medium w-1/3 border-b border-r border-border-one">
            {key}
          </td>
          <td className="lg:px-4 lg:py-2 p-2 text-text-black border-b border-border-one">
            {value}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="text-text-secondary">No technical specifications available.</p>
)}
```

#### 5.2.2 规格数据示例
```json
{
  "specifications": {
    "ScreenSize": "2400 x 1350 mm (108\")",
    "ModuleSize": "150 x 168.75 mm",
    "OverallResolution": "1920 x 1680",
    "Brightness": "450-1200 cd/m²",
    "ContrastRatio": "20,000:1",
    "ViewingAngle": "Horizontal: 0°-175° / Vertical: 0°-170°",
    "PowerInput": "100-240 VAC, 50/60 Hz",
    "WorkingHeight": "Adjustable, screen bottom 950-1100 mm above ground"
  }
}
```

### 5.3 标准产品通用详情系统

#### 5.3.1 标准产品测试项目
```typescript
// 从 content.json 获取标准产品通用详情数据
const standardProductOverview = getContent<StandardProductOverviewItem[]>('products.standardProductOverview') || [];

interface StandardProductOverviewItem {
  title: string;
  image: string;
  alt: string;
}
```

#### 5.3.2 测试项目数据
```json
{
  "standardProductOverview": [
    {
      "title": "Impact Resistance Test",
      "image": "/images/PDetailsOverview/PDO-1.png",
      "alt": "Advanced composite materials showcase"
    },
    {
      "title": "Scratch & Abrasion Resistance Test", 
      "image": "/images/PDetailsOverview/PDO-2.png",
      "alt": "Quality control and testing procedures"
    },
    {
      "title": "Immersion Test",
      "image": "/images/PDetailsOverview/PDO-3.png", 
      "alt": "State-of-the-art manufacturing facility"
    },
    {
      "title": "High-Altitude Adaptability Test",
      "image": "/images/PDetailsOverview/PDO-4.png",
      "alt": "State-of-the-art manufacturing facility"
    },
    {
      "title": "Shock & Vibration Test",
      "image": "/images/PDetailsOverview/PDO-5.png",
      "alt": "State-of-the-art manufacturing facility"
    },
    {
      "title": "Fire Retardant Test",
      "image": "/images/PDetailsOverview/PDO-6.png",
      "alt": "State-of-the-art manufacturing facility"
    }
  ]
}
```

#### 5.3.3 测试项目展示
```typescript
<div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-5 gap-2.5 lg:px-30">
  {standardProductOverview.map((item, index) => (
    <div key={index} className="space-y-2.5 rounded-sm bg-fill-three border border-border-one overflow-hidden lg:p-5 p-2.5">
      <div className="aspect-[4/3] overflow-hidden rounded-sm border border-border-one">
        <Image
          src={item.image}
          alt={item.alt}
          width={300}
          height={225}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="lg:text-lg text-base font-medium text-text-title">
        {item.title}
      </h3>
    </div>
  ))}
</div>
```

## 6. 产品工具函数系统

### 6.1 productUtils.ts 工具库

#### 6.1.1 getCategoryByProduct 函数
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
): ProductCategory | undefined {
  return categories.find(category => category.id === product.categoryId);
}
```

#### 6.1.2 getCategoryBySlug 函数
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
): ProductCategory | undefined {
  return categories.find(category => category.slug === slug);
}
```

#### 6.1.3 getProductsByCategory 函数
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
): Product[] {
  return products.filter(product => product.categoryId === categoryId);
}
```

### 6.2 URL 生成优化

#### 6.2.1 产品 URL 生成逻辑
```typescript
// 在 ProductCard 组件中使用 useMemo 优化产品URL生成
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
```

#### 6.2.2 面包屑导航数据
```typescript
// 产品详情页面包屑数据生成
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Products', href: '/products/all' },
  { label: category.title, href: `/products/${categorySlug}` },
  { 
    label: ('title' in product ? product.title : product.model) || 'Product', 
    href: `/products/${categorySlug}/${productId}` 
  }
];
```

## 7. 产品数据管理规范

### 7.1 产品数据创建规范

#### 7.1.1 自研产品数据规范
```json
{
  "id": 1,                           // 必填：唯一产品ID
  "categoryId": 1,                   // 必填：所属分类ID
  "productType": "independent-rd",   // 必填：产品类型
  "image": "/images/products.png",   // 必填：主图路径
  "alt": "产品描述",                  // 必填：图片alt文本
  "title": "产品完整标题",            // 必填：产品标题
  "description": "产品详细描述",      // 必填：产品描述
  "gallery": ["图片1", "图片2"],     // 可选：图片画廊
  "specifications": { /* 规格参数 */ }, // 可选：技术参数
  "details": [ /* 详情内容 */ ]      // 可选：详细内容
}
```

#### 7.1.2 标准产品数据规范
```json
{
  "id": 2,                           // 必填：唯一产品ID
  "categoryId": 1,                   // 必填：所属分类ID
  "productType": "standard",         // 必填：产品类型
  "image": "/images/fields-1.png",   // 必填：主图路径
  "alt": "产品描述",                  // 必填：图片alt文本
  "model": "PROD-001",              // 必填：产品型号
  "standardCategory": "产品分类名称", // 必填：标准产品分类
  "description": "产品描述",         // 可选：产品描述
  "gallery": ["图片1", "图片2"],     // 可选：图片画廊
  "specifications": { /* 规格参数 */ }, // 可选：技术参数
  "details": [ /* 详情内容 */ ]      // 可选：详细内容
}
```

### 7.2 数据验证和检查

#### 7.2.1 必填字段检查
```typescript
function validateProduct(product: any): string[] {
  const errors: string[] = [];
  
  // 通用字段检查
  if (!product.id) errors.push('Product ID is required');
  if (!product.categoryId) errors.push('Category ID is required');
  if (!product.image) errors.push('Product image is required');
  if (!product.alt) errors.push('Image alt text is required');
  if (!product.productType) errors.push('Product type is required');
  
  // 产品类型特定检查
  if (product.productType === 'independent-rd') {
    if (!product.title) errors.push('Title is required for independent R&D products');
    if (!product.description) errors.push('Description is required for independent R&D products');
  } else if (product.productType === 'standard') {
    if (!product.model) errors.push('Model is required for standard products');
    if (!product.standardCategory) errors.push('Standard category is required for standard products');
  }
  
  return errors;
}
```

#### 7.2.2 数据一致性检查
```typescript
function checkProductConsistency(products: Product[], categories: ProductCategory[]): string[] {
  const errors: string[] = [];
  const categoryIds = new Set(categories.map(cat => cat.id));
  
  products.forEach(product => {
    // 检查分类ID是否存在
    if (!categoryIds.has(product.categoryId)) {
      errors.push(`Product ${product.id} references non-existent category ${product.categoryId}`);
    }
    
    // 检查图片路径
    if (product.image && !product.image.startsWith('/images/')) {
      errors.push(`Product ${product.id} has invalid image path: ${product.image}`);
    }
  });
  
  return errors;
}
```

## 8. 性能优化策略

### 8.1 组件级优化

#### 8.1.1 React.memo 优化
```typescript
// ProductCard 组件使用 memo 优化性能
export default memo(ProductCard);

// ProductImageGallery 组件使用 memo 优化
export default memo(ProductImageGallery);
```

#### 8.1.2 useMemo 缓存优化
```typescript
// 首页产品数据缓存
const homeProductsData = useMemo(() => {
  const productsData = getContent<Product[]>('products.items') || [];
  return productsData.slice(0, 8);
}, [getContent]);

// 产品URL生成缓存
const productUrl = useMemo(() => {
  // URL生成逻辑
}, [href, id, categoryId, getContent]);
```

### 8.2 图片优化策略

#### 8.2.1 Next.js Image 组件优化
```typescript
<Image
  src={product.image}
  alt={product.alt}
  fill
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="object-cover transition-transform duration-600 group-hover:scale-110"
  priority={isAboveFold} // 首屏图片优先加载
/>
```

#### 8.2.2 图片懒加载策略
- 首屏产品图片设置 `priority={true}`
- 非首屏图片自动懒加载
- 合理的 `sizes` 属性优化响应式图片

### 8.3 数据获取优化

#### 8.3.1 内容数据缓存
```typescript
// useContent hook 内部使用 useMemo 缓存获取函数
const getContent = useMemo(() => {
  return <T = unknown>(path: string): T => {
    // 内容获取逻辑
  };
}, []);
```

#### 8.3.2 产品推荐算法优化
```typescript
// 产品推荐使用高效的索引查找
const currentIndex = categoryProducts.findIndex(p => p.id === product.id);

// 使用合理的推荐数量限制
const maxProducts = 6;

// 避免重复遍历和计算
```

## 9. 扩展性设计

### 9.1 产品类型扩展

#### 9.1.1 新产品类型添加流程
1. 在 `types.ts` 中添加新的产品类型接口
2. 更新 `Product` 联合类型
3. 在 `ProductCard` 组件中添加新类型的渲染逻辑
4. 更新产品详情页的显示逻辑
5. 添加相应的验证规则

#### 9.1.2 扩展接口示例
```typescript
// 新增服务类型产品
interface ServiceProduct extends BaseProduct {
  productType: 'service';
  serviceName: string;
  serviceDescription: string;
  pricing?: PricingInfo;
}

// 更新联合类型
export type Product = IndependentRDProduct | StandardProduct | ServiceProduct;
```

### 9.2 功能模块扩展

#### 9.2.1 产品比较功能
```typescript
interface ProductComparison {
  products: Product[];
  comparisonFields: string[];
  comparisonData: Record<string, any[]>;
}
```

#### 9.2.2 产品搜索功能
```typescript
interface ProductSearchFilters {
  category?: string;
  productType?: ProductType;
  priceRange?: [number, number];
  features?: string[];
}
```

#### 9.2.3 产品收藏功能
```typescript
interface ProductFavorites {
  userId: string;
  favoriteProducts: number[];
  addedAt: Record<number, string>;
}
```

### 9.3 国际化扩展

#### 9.3.1 多语言产品数据
```typescript
interface MultilingualProduct extends BaseProduct {
  translations: Record<string, {
    title?: string;
    description?: string;
    specifications?: Record<string, string>;
    details?: ProductDetail[];
  }>;
}
```

#### 9.3.2 本地化内容管理
```typescript
interface LocalizedContent {
  [locale: string]: {
    products: MultilingualProduct[];
    categories: ProductCategory[];
    // 其他本地化内容
  };
}
```

---

*文档版本: v1.0*
*最后更新: 2025-09-04*
*维护者: Claude Code*