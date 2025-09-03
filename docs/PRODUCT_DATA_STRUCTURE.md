# 产品数据结构说明文档

## 概述

本文档详细说明了 E5DAO 企业官网中产品数据的结构设计，包括各字段的含义、用途以及在前端组件中的具体使用方式。

## 数据存储位置

产品数据统一存储在 `/lib/content.json` 文件的 `products.items` 数组中。

## 完整数据结构

```typescript
interface Category {
  id: number;                    // 分类唯一标识符
  title: string;                 // 分类显示名称
  slug: string;                  // 分类URL标识符
}

interface ProductData {
  // === 基础信息 ===
  id: number;                    // 产品唯一标识符
  categoryId: number;            // 产品分类ID（关联Category.id）
  productType: 'independent-rd' | 'standard'; // 内部产品类型分类（不在前端显示）
  model: string;                 // 产品型号
  title: string;                 // 产品标题/名称
  description: string;           // 产品简介描述

  // === 图片资源 ===
  image: string;                 // 主图片路径
  alt: string;                   // 图片alt属性文本
  gallery?: string[];            // 产品图库数组（可选）

  // === 技术规格 ===
  specifications?: {             // 技术规格参数对象（可选）
    [key: string]: string;       // 键值对格式：参数名 => 参数值
  };

  // === 系统配置 ===
  systemConfiguration?: {       // 系统配置信息（可选）
    title: string;              // 配置方案标题
    description: string;        // 配置方案描述
    images: string[];           // 配置相关图片数组
  };

  // === 详细内容 ===
  details?: ContentSection[];   // 详细内容数组（用于富文本渲染）
}

interface ContentSection {
  type: 'heading' | 'paragraph' | 'image' | 'list';
  content: string;
  level?: 1 | 2 | 3 | 4;        // 标题级别（仅heading类型）
  image?: string;               // 图片路径（仅image类型）
  alt?: string;                 // 图片alt文本（仅image类型）
  items?: string[];             // 列表项数组（仅list类型）
}


## 字段详细说明

### 基础信息字段

| 字段名 | 类型 | 必需 | 说明 | 使用场景 |
|--------|------|------|------|----------|
| `id` | number | ✅ | 产品唯一ID，用于数据查询和URL路由 | 产品详情页路由、数据筛选 |
| `categoryId` | number | ✅ | 产品分类ID，关联Category.id | 相关产品推荐、分类筛选、URL生成 |
| `productType` | string | ✅ | 内部产品类型分类 | 数据展示差异化、内部管理筛选 |
| `model` | string | ✅ | 产品型号编码 | 产品卡片显示、详情页展示 |
| `title` | string | ✅ | 产品完整名称 | 页面标题、面包屑导航、SEO |
| `description` | string | ✅ | 产品简要描述 | 产品卡片、详情页简介区域 |

### 分类信息字段

| 字段名 | 类型 | 必需 | 说明 | 使用场景 |
|--------|------|------|------|----------|
| `id` | number | ✅ | 分类唯一ID | 与产品categoryId关联 |
| `title` | string | ✅ | 分类显示名称 | 面包屑导航、页面标题 |
| `slug` | string | ✅ | 分类URL标识符 | URL路由生成 `/products/{slug}/{id}` |

### 图片资源字段

| 字段名 | 类型 | 必需 | 说明 | 使用场景 |
|--------|------|------|------|----------|
| `image` | string | ✅ | 产品主图片路径 | 产品卡片、图片画廊主图 |
| `alt` | string | ✅ | 图片替代文本 | 图片无障碍访问、SEO优化 |
| `gallery` | string[] | ❌ | 产品图库数组 | 图片画廊组件、产品多角度展示 |

### 技术规格字段

| 字段名 | 类型 | 必需 | 说明 | 使用场景 |
|--------|------|------|------|----------|
| `specifications` | object | ❌ | 技术参数键值对 | 快速规格展示、详细参数表格 |

**specifications 使用示例：**
```json
{
  "External Dimensions": "900x700x500mm",
  "Net Weight": "22kg",
  "Material": "Carbon Fiber with Kevlar reinforcement",
  "Operating Temperature": "-20°C to +70°C",
  "IP Rating": "IP67"
}
```

### 系统配置字段

| 字段名 | 类型 | 必需 | 说明 | 使用场景 |
|--------|------|------|------|----------|
| `systemConfiguration` | object | ❌ | 系统配置方案信息 | 配置方案展示（预留功能） |

### 详细内容字段

| 字段名 | 类型 | 必需 | 说明 | 使用场景 |
|--------|------|------|------|----------|
| `details` | ContentSection[] | ❌ | 结构化详细内容 | ContentRenderer组件渲染 |

**details 支持的内容类型：**

1. **标题 (heading)**
   ```json
   {
     "type": "heading",
     "content": "产品概述",
     "level": 3
   }
   ```

2. **段落 (paragraph)**
   ```json
   {
     "type": "paragraph",
     "content": "这是产品的详细描述内容..."
   }
   ```

3. **图片 (image)**
   ```json
   {
     "type": "image",
     "image": "/images/product-detail.png",
     "alt": "产品细节图",
     "content": "图片说明文字"
   }
   ```

4. **列表 (list)**
   ```json
   {
     "type": "list",
     "content": "主要特性包括：",
     "items": [
       "超高亮度显示",
       "防水防震设计",
       "多设备连接支持"
     ]
   }
   ```

## 工具函数库

为了简化数据操作，项目提供了专门的工具函数库 `/lib/productUtils.ts`：

### 核心工具函数

```typescript
import { getCategoryByProduct, getCategoryBySlug, getProductsByCategory } from '../lib/productUtils';

// 1. 根据产品获取分类信息
const category = getCategoryByProduct(product, categories);

// 2. 根据slug获取分类信息  
const category = getCategoryBySlug('integrated-solution', categories);

// 3. 根据分类ID筛选产品
const categoryProducts = getProductsByCategory(products, categoryId);
```

## 前端组件使用映射

### 产品详情页面 (`/app/products/[category]/[id]/page.tsx`)

```tsx
import { getCategoryByProduct, getCategoryBySlug, getProductsByCategory } from '../lib/productUtils';

// 1. 路由参数获取
const productId = parseInt(params.id as string);
const categorySlug = params.category as string;

// 2. 数据查询
const product = productsData.find(p => p.id === productId);
const categoriesData = getContent('products.categories') || [];

// 3. 使用工具函数获取分类信息
const category = getCategoryByProduct(product, categoriesData);
const currentCategory = getCategoryBySlug(categorySlug, categoriesData);

// 4. URL验证
if (!category || !currentCategory || category.id !== currentCategory.id) {
  return <div>Product not found</div>;
}

// 5. 图片画廊
const productImages = [product.image, ...(product.gallery || [])];
<ProductImageGallery images={productImages} productName={product.title} />

// 6. 面包屑导航
const breadcrumbItems = [
  { label: 'Products', href: '/products/all' },
  { label: category.title, href: `/products/${categorySlug}` },
  { label: product.title, href: `/products/${categorySlug}/${productId}` }
];

// 7. 获取当前分类下的所有产品用于相关产品推荐
const categoryProducts = getProductsByCategory(productsData, product.categoryId);
const currentIndex = categoryProducts.findIndex(p => p.id === product.id);

// 构建推荐产品数组（排除当前产品）
const displayProducts = [];
const maxProducts = 6;

if (currentIndex > 0) {
  displayProducts.push(categoryProducts[currentIndex - 1]);
}

for (let i = currentIndex + 1; i < categoryProducts.length && displayProducts.length < maxProducts; i++) {
  displayProducts.push(categoryProducts[i]);
}

if (displayProducts.length < maxProducts) {
  for (let i = currentIndex - 2; i >= 0 && displayProducts.length < maxProducts; i--) {
    displayProducts.unshift(categoryProducts[i]);
  }
}
```

### 产品卡片组件 (`ProductCard.tsx`)

```tsx
// 组件内部使用 useMemo 优化URL生成
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

// 支持两种使用方式：
// 1. 传递完整产品对象
<ProductCard 
  product={product} 
  className="w-full"
/>

// 2. 传递单独字段（向后兼容）
<ProductCard
  id={product.id}
  categoryId={product.categoryId}
  image={product.image}
  alt={product.alt}
  model={product.model}
  title={product.title}
  description={product.description}
  productType={product.productType}
/>

// 3. 解决方案专用变体
<ProductCard 
  product={product} 
  variant="solution"
  className="custom-class"
/>
```

### 内容渲染组件 (`ContentRenderer.tsx`)

```tsx
<ContentRenderer sections={product.details} />
```

## 数据管理最佳实践

### 1. 图片资源管理
- 所有图片存放在 `/public/images/` 目录
- 图片路径使用相对路径格式：`"/images/filename.png"`
- 建议图片命名使用描述性名称，便于管理

### 2. 规格参数规范
- `specifications` 对象的键名使用英文，便于国际化
- 参数值保持简洁明了
- 重要参数建议排在前面（快速规格显示前6项）

### 3. 详细内容编写
- `details` 数组按内容逻辑顺序排列
- 标题层级合理设置（h1-h4）
- 图片与说明文字配合使用

### 4. 数据完整性检查
- 必需字段不能为空
- 图片路径确保文件存在
- 分类ID与分类数据保持一致

## URL路由规则

产品详情页URL格式：`/products/{category}/{id}`

示例：
- `/products/integrated-solution/1` → 集成碳纤维解决方案类产品ID为1的详情页
- `/products/medical-system/3` → 医疗治疗系统类产品ID为3的详情页

## 产品类型分类详解

### productType 字段说明

产品类型是内部使用的分类标识，用于区分不同的产品展示策略，**不在前端页面直接显示给用户**。

| 类型值 | 中文名称 | 英文名称 | 展示特点 |
|--------|----------|----------|----------|
| `independent-rd` | 自主研发产品 | Independent R&D Products | 详细的产品介绍、丰富的技术细节、完整的开发工艺说明 |
| `standard` | 标准产品 | Standard Products | 简洁的产品概述、标准化的功能列表、成熟的解决方案介绍 |

### 两种类型的数据差异

#### 自主研发产品 (`independent-rd`)
- **内容丰富度**：`details` 数组包含多个详细章节
- **技术规格**：更详细的技术参数说明
- **展示重点**：突出创新技术和研发实力
- **图片资源**：通常包含更多产品细节图和生产工艺图

#### 标准产品 (`standard`)
- **内容简洁度**：`details` 数组内容更简洁直接
- **技术规格**：标准化的参数展示
- **展示重点**：强调可靠性和成熟度
- **图片资源**：重点展示产品应用场景
- **标题显示**：产品卡片中只显示标题（型号即标题）

### 使用示例

```typescript
// 根据产品类型进行不同的展示逻辑
const renderProductContent = (product: ProductData) => {
  if (product.productType === 'independent-rd') {
    // 自主研发产品的详细展示
    return <DetailedContentView product={product} />;
  } else {
    // 标准产品的简洁展示
    return <StandardContentView product={product} />;
  }
};

// 内部管理筛选
const independentProducts = products.filter(p => p.productType === 'independent-rd');
const standardProducts = products.filter(p => p.productType === 'standard');
```

## 扩展性考虑

### 未来可能添加的字段：
- `price`: 产品价格
- `inStock`: 库存状态
- `tags`: 产品标签数组
- `videos`: 产品视频资源
- `downloads`: 相关下载文件
- `warranty`: 质保信息
- `customizationLevel`: 定制化程度（高/中/低）

### 多语言支持准备：
当前数据结构支持未来的国际化扩展，可以将字符串字段改为对象格式：

```json
{
  "title": {
    "en": "Carbon Fiber Mobile COB Display Screen",
    "zh": "碳纤维移动COB显示屏",
    "ja": "カーボンファイバー移動COBディスプレイ"
  }
}
```

## 当前测试数据

项目中目前配置了两个产品用于调试不同类型的展示效果：

### 产品1 - 自主研发产品示例
- **ID**: 1
- **产品类型**: `independent-rd`
- **型号**: CF-COB-2024
- **标题**: Carbon Fiber Mobile COB Display Screen
- **内容特点**: 完整的 `details` 数组，包含产品概述、核心功能、制造工艺等详细章节
- **访问URL**: `/products/integrated-solution/1`

### 产品2 - 标准产品示例  
- **ID**: 2
- **产品类型**: `standard`
- **型号**: MC-2580CMD-02
- **标题**: Tactical Command Unit
- **内容特点**: 简洁的 `details` 数组，重点突出标准功能和可靠性
- **访问URL**: `/products/integrated-solution/2`

## 数据结构优化总结

### ✅ 优化成果

1. **消除数据冗余**：移除产品数据中的 `category` 字段，只保留 `categoryId` 进行关联
2. **提高数据一致性**：分类信息集中管理，避免不同步问题
3. **增强可维护性**：修改分类只需在 `categories` 数组中操作一次
4. **改善扩展性**：分类可独立添加更多属性（描述、图标等）

### 🛠️ 关键改进

- **工具函数库**：提供 `getCategoryByProduct`、`getCategoryBySlug`、`getProductsByCategory` 等工具
- **类型安全**：完整的 TypeScript 接口定义确保类型检查
- **组件优化**：ProductCard 和产品详情页均使用新的数据结构
- **错误处理**：增加了分类不存在时的友好错误处理
- **差异化展示**：根据产品类型智能调整卡片显示内容

## 维护注意事项

1. **数据关联性**：确保产品的 `categoryId` 在 `categories` 数组中存在对应项
2. **URL一致性**：产品URL依赖分类slug，修改分类slug需同步更新相关链接
3. **工具函数使用**：优先使用 `/lib/productUtils.ts` 中的工具函数处理数据
4. **图片资源**：添加新产品时，确保图片文件已上传到对应目录
5. **内容质量**：`details` 内容应该结构清晰，便于用户阅读
6. **性能考虑**：避免在 `details` 数组中添加过多大尺寸图片
7. **产品类型规范**：新增产品时必须指定 `productType` 字段，确保展示逻辑正确
8. **错误监控**：关注控制台中关于分类不存在的警告信息

## 最近更新记录

### v1.1 - 2025-01-09 - 代码清理优化

#### 🧹 productUtils.ts 清理
- **移除未使用函数**：删除了 `getProductUrl` 和 `getRelatedProducts` 函数
- **保留核心函数**：
  - `getCategoryByProduct` - 根据产品获取分类信息
  - `getCategoryBySlug` - 根据slug获取分类信息
  - `getProductsByCategory` - 根据分类ID筛选产品

#### 🎯 ProductImageGallery.tsx 优化
- **移除未使用状态**：删除了 `setCurrentSlideIndex` 状态变量
- **简化事件处理**：移除了不必要的 `onSlideChange` 回调
- **性能提升**：减少了组件的状态管理开销

#### ✨ ProductCard.tsx 增强
- **支持多种使用方式**：
  - 完整产品对象传递 (`product` prop)
  - 单独字段传递（向后兼容）
  - 解决方案专用变体 (`variant="solution"`)
- **性能优化**：使用 `useMemo` 优化URL生成
- **类型安全**：完整的TypeScript接口支持

#### 📄 产品页面优化
- **产品分类页面**：完全通过ESLint和TypeScript检查
- **产品详情页面**：优化相关产品推荐逻辑
- **错误边界**：增加ErrorBoundary包装确保稳定性

#### 🔍 代码质量验证
- **Lint检查**：所有产品模块文件通过ESLint验证
- **TypeScript检查**：无类型错误或警告
- **依赖清理**：移除所有未使用的导入和变量
- **性能优化**：使用React.memo包装组件防止不必要重渲染

---

*本文档版本：v1.1 | 更新日期：2025-01-09*