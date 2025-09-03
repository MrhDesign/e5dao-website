# 产品数据创建指南

## 📝 **数据字段规则**

### **通用必需字段（所有产品）**
```json
{
  "id": 1,                    // 产品唯一ID
  "categoryId": 1,            // 产品分类ID
  "productType": "...",       // 产品类型
  "image": "/images/...",     // 主图片路径
  "alt": "...",               // 图片描述
  "gallery": [...],           // 图片库（可选）
  "specifications": {...},    // 技术规格（可选）
  "details": [...]            // 详细内容（可选）
}
```

## 🎯 **按产品类型的字段要求**

### **自主研发产品 (`"productType": "independent-rd"`)**

#### **必需字段：**
- `title` - 产品完整标题（用于主要显示）
- `description` - 产品详细描述（用于次要显示）

#### **可选字段：**
- `model` - 技术型号（可以省略，不在卡片中显示）

#### **不需要的字段：**
- `standardCategory` - 不适用于自研产品，可完全省略

#### **数据示例：**
```json
{
  "id": 1,
  "categoryId": 1,
  "productType": "independent-rd",
  "image": "/images/products.png",
  "alt": "Carbon Fiber Mobile COB Display Screen",
  "title": "Carbon Fiber Mobile COB Display Screen",
  "description": "Features an advanced COB display screen with ultra-compact form...",
  
  // 可选字段
  "model": "CF-COB-2024",  // 技术标识，可省略
  
  // 不需要的字段 - 可以完全不写
  // "standardCategory": "..." ❌ 不需要
}
```

---

### **标准产品 (`"productType": "standard"`)**

#### **必需字段：**
- `model` - 产品型号（用于主要显示）
- `standardCategory` - 产品类别（用于次要显示）

#### **可选字段：**
- `title` - 产品标题（向后兼容，不在卡片中显示）
- `description` - 产品描述（向后兼容，不在卡片中显示）

#### **数据示例：**
```json
{
  "id": 2,
  "categoryId": 1,
  "productType": "standard",
  "image": "/images/fields-1.png",
  "alt": "MC-2580CMD-02 Tactical Command Unit",
  "model": "MC-2580CMD-02",
  "standardCategory": "Command & Control Systems",
  
  // 可选字段 - 为了向后兼容可以保留，但不会在卡片显示
  "title": "Tactical Command Unit",     // 可省略
  "description": "Advanced tactical...", // 可省略
}
```

## ✅ **数据优化建议**

### **1. 最小化原则**
只包含该产品类型实际使用的字段，减少数据冗余：

```json
// ✅ 推荐：自研产品最小数据集
{
  "id": 1,
  "categoryId": 1,
  "productType": "independent-rd",
  "image": "/images/products.png",
  "alt": "Product Alt Text",
  "title": "产品完整标题",
  "description": "产品详细描述"
}

// ✅ 推荐：标准产品最小数据集
{
  "id": 2,
  "categoryId": 1,
  "productType": "standard",
  "image": "/images/fields-1.png", 
  "alt": "Product Alt Text",
  "model": "PROD-001",
  "standardCategory": "产品分类"
}
```

### **2. 向后兼容性**
如果担心兼容性问题，可以保留可选字段，但可以设为空值：

```json
// ✅ 可接受：保持字段但使用空值
{
  "id": 2,
  "productType": "standard",
  "model": "PROD-001",
  "standardCategory": "产品分类",
  "title": "",          // 空值，不显示
  "description": ""     // 空值，不显示
}
```

## 🎨 **显示效果对比**

### **自主研发产品卡片：**
```
┌─────────────────────────────┐
│      [产品图片]             │
├─────────────────────────────┤
│ 产品完整标题                │ ← title (必需)
│ 产品详细描述内容...         │ ← description (必需)  
└─────────────────────────────┘
```

### **标准产品卡片：**
```
┌─────────────────────────────┐
│      [产品图片]             │
├─────────────────────────────┤
│ PROD-001                   │ ← model (必需)
│ 产品分类名称               │ ← standardCategory (必需)
└─────────────────────────────┘
```

## 🔍 **字段验证规则**

组件会自动处理字段缺失的情况：

- **安全渲染**：缺失的字段不会导致错误，只是不显示
- **类型检查**：TypeScript 会在编译时检查必需字段
- **运行时保护**：组件内部有条件渲染保护

## 📋 **创建新产品检查清单**

### **自主研发产品：**
- [ ] `id` - 唯一ID
- [ ] `categoryId` - 分类ID  
- [ ] `productType: "independent-rd"`
- [ ] `image` - 主图片
- [ ] `alt` - 图片描述
- [ ] `title` - 产品标题 ⭐
- [ ] `description` - 产品描述 ⭐
- [ ] `gallery` - 图片库（可选）
- [ ] `specifications` - 技术规格（可选）
- [ ] `details` - 详细内容（可选）

### **标准产品：**
- [ ] `id` - 唯一ID
- [ ] `categoryId` - 分类ID
- [ ] `productType: "standard"`  
- [ ] `image` - 主图片
- [ ] `alt` - 图片描述
- [ ] `model` - 产品型号 ⭐
- [ ] `standardCategory` - 产品类别 ⭐
- [ ] `gallery` - 图片库（可选）
- [ ] `specifications` - 技术规格（可选）
- [ ] `details` - 详细内容（可选）

⭐ = 该产品类型的关键显示字段

## 💡 **最佳实践**

1. **数据精简**：只保留实际使用的字段
2. **命名清晰**：字段名要明确表达用途
3. **类型一致**：相同用途的字段保持相同的数据类型
4. **验证完整**：创建后检查显示效果是否符合预期

## 🔧 **组件使用最佳实践**

### **ProductCard组件更新**

#### **推荐的使用方式（v1.1）：**
```tsx
// ✅ 最佳实践：传递完整产品对象
<ProductCard 
  product={product} 
  className="w-full"
/>

// ✅ 解决方案页面专用变体
<ProductCard 
  product={product} 
  variant="solution"
  className="solution-card"
/>
```

#### **向后兼容方式：**
```tsx
// ✅ 仍然支持：单独字段传递
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
```

### **ProductImageGallery组件简化**

#### **使用方式：**
```tsx
// ✅ 简洁的API，自动处理所有图片切换逻辑
<ProductImageGallery 
  images={productImages}
  productName={product.title}
  className="custom-gallery-class"
/>
```

#### **图片数组准备：**
```tsx
// 主图 + 图库数组
const productImages = [product.image, ...(product.gallery || [])];
```

## 📋 **代码质量检查清单**

### **创建/修改产品组件时的验证步骤：**
- [ ] 运行 `npm run lint` 确保无ESLint错误
- [ ] 检查TypeScript编译无错误
- [ ] 确认无未使用的导入和变量
- [ ] 验证组件支持必要的props
- [ ] 测试错误边界处理
- [ ] 确认组件使用React.memo优化（如需要）

### **工具函数使用规范：**
```tsx
import { getCategoryByProduct, getCategoryBySlug, getProductsByCategory } from '../lib/productUtils';

// ✅ 正确：使用工具函数处理分类数据
const category = getCategoryByProduct(product, categories);
const categoryProducts = getProductsByCategory(products, categoryId);

// ❌ 避免：手动查找分类数据
// const category = categories.find(cat => cat.id === product.categoryId);
```

---

*更新日期：2025-01-09 | 版本：v1.1*