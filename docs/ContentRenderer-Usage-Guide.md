# ContentRenderer 组件使用说明文档

## 概述

`ContentRenderer` 是一个通用的内容渲染组件，用于将结构化的内容数据渲染成HTML元素。该组件支持多种内容类型，包括标题、段落、图片和列表，特别适用于产品详情页面、文章内容和动态内容展示。

## 安装与引入

```tsx
import ContentRenderer from '@/components/ContentRenderer';
```

## 接口定义

### ContentSection 接口

```tsx
interface ContentSection {
  type: 'heading' | 'paragraph' | 'image' | 'list';
  content: string;
  level?: 1 | 2 | 3 | 4; // 标题级别，仅用于 heading 类型
  image?: string;       // 图片路径，仅用于 image 类型
  alt?: string;         // 图片alt属性，仅用于 image 类型
  items?: string[];     // 列表项数组，仅用于 list 类型
}
```

### ContentRendererProps 接口

```tsx
interface ContentRendererProps {
  sections: ContentSection[];
  className?: string;
}
```

## 支持的内容类型

### 1. 标题 (heading)

用于渲染各级标题，支持1-4级标题。

**配置示例：**
```json
{
  "type": "heading",
  "content": "产品特性",
  "level": 3
}
```

**样式映射：**
- Level 1: `text-3xl font-bold text-text-brand` (h1)
- Level 2: `text-2xl font-semibold text-text-brand` (h2)
- Level 3: `text-xl font-semibold text-text-brand` (h3)
- Level 4: `text-lg font-medium text-text-black` (h4)

### 2. 段落 (paragraph)

用于渲染文本段落，支持多段落内容（通过换行符 `\n` 分隔）。

**配置示例：**
```json
{
  "type": "paragraph",
  "content": "这是第一段内容。\n\n这是第二段内容，中间有空行分隔。"
}
```

**特性：**
- 自动处理换行符分隔的多段落
- 过滤空行和仅含空白字符的段落
- 使用 prose 样式增强可读性

### 3. 图片 (image)

用于渲染响应式图片，支持图片说明文字。

**配置示例：**
```json
{
  "type": "image",
  "image": "/images/product-feature.jpg",
  "alt": "产品特性展示图",
  "content": "图片说明：产品在实际使用场景中的表现"
}
```

**特性：**
- 16:9 宽高比的响应式容器
- 桌面端宽度为父容器的80%，居中显示
- 支持可选的图片说明文字
- 自动处理图片加载失败
- 空值保护（空字符串或null时不渲染）

### 4. 列表 (list)

用于渲染带有自定义样式的无序列表。

**配置示例：**
```json
{
  "type": "list",
  "content": "主要优势包括：",
  "items": [
    "轻量化设计，减重40%以上",
    "快速部署，10分钟内完成设置",
    "模块化配置，支持多种组合方式"
  ]
}
```

**特性：**
- 支持可选的列表标题/描述
- 自定义圆点样式（品牌色圆点）
- 良好的间距和对齐

## 使用示例

### 基础使用

```tsx
import ContentRenderer from '@/components/ContentRenderer';

const sections = [
  {
    type: "heading",
    content: "产品概述",
    level: 2
  },
  {
    type: "paragraph",
    content: "这是一个高性能的碳纤维产品，专为军用和民用市场设计。\n\n产品采用先进的复合材料工艺，具有优异的强度重量比。"
  },
  {
    type: "image",
    image: "/images/product-overview.jpg",
    alt: "产品概述图",
    content: "产品整体外观展示"
  },
  {
    type: "list",
    content: "技术特点：",
    items: [
      "碳纤维复合材料构造",
      "IP65防护等级",
      "工作温度：-20°C至50°C"
    ]
  }
];

function ProductPage() {
  return (
    <div>
      <ContentRenderer sections={sections} />
    </div>
  );
}
```

### 与 content.json 集成使用

```tsx
// content.json 数据结构
{
  "products": {
    "items": [
      {
        "id": 1,
        "title": "碳纤维显示屏",
        "details": [
          {
            "type": "heading",
            "content": "产品特性",
            "level": 3
          },
          {
            "type": "image",
            "image": "/images/COB-Display/COB-Details.png"
          },
          {
            "type": "paragraph",
            "content": "由模块化LED显示单元、可调节支撑结构和移动底座组成。"
          }
        ]
      }
    ]
  }
}

// 组件使用
function ProductDetailPage({ productId }: { productId: number }) {
  const { getContent } = useContent();
  const product = getContent<Product>(`products.items.${productId}`);
  
  return (
    <div>
      <h1>{product.title}</h1>
      <ContentRenderer sections={product.details} />
    </div>
  );
}
```

### 自定义样式

```tsx
<ContentRenderer 
  sections={sections} 
  className="bg-gray-50 p-6 rounded-lg"
/>
```

## 最佳实践

### 1. 内容结构规划

```json
[
  {
    "type": "heading",
    "content": "章节标题",
    "level": 2
  },
  {
    "type": "paragraph", 
    "content": "引言段落"
  },
  {
    "type": "image",
    "image": "/images/illustration.jpg",
    "alt": "说明图片",
    "content": "图片说明"
  },
  {
    "type": "list",
    "content": "要点说明：",
    "items": ["要点1", "要点2", "要点3"]
  },
  {
    "type": "paragraph",
    "content": "总结段落"
  }
]
```

### 2. 图片资源管理

- **路径规范**：使用相对路径，如 `/images/products/product-name.jpg`
- **命名规范**：使用描述性文件名
- **尺寸建议**：推荐使用 16:9 宽高比，最小宽度 800px
- **格式选择**：优先使用 WebP 格式，后备 JPEG

### 3. 内容编写规范

- **标题层级**：合理使用标题层级，保持结构清晰
- **段落长度**：控制段落长度，提高可读性
- **列表使用**：将相关要点整理成列表形式
- **图片说明**：为重要图片添加说明文字

### 4. 错误处理

```tsx
const sections = product?.details || [];

if (!sections.length) {
  return <div>暂无详细信息</div>;
}

return <ContentRenderer sections={sections} />;
```

## 样式定制

### CSS 类名结构

```css
.prose {
  /* 基础prose样式 */
}

.prose-gray {
  /* 灰色主题 */
}

.text-text-brand {
  /* 品牌色文本 */
}

.text-text-black {
  /* 黑色文本 */
}

.text-text-secondary {
  /* 次要文本色 */
}

.bg-fill-two {
  /* 填充色背景 */
}
```

### 响应式断点

- 移动端：默认样式
- 桌面端：`lg:` 前缀样式

## 性能优化建议

1. **图片优化**：
   - 使用 Next.js Image 组件的内置优化
   - 启用懒加载（默认启用）
   - 提供合适的 width 和 height

2. **内容缓存**：
   - 使用 useMemo 缓存处理后的内容数据
   - 避免在渲染过程中进行复杂计算

3. **代码分割**：
   - 组件已使用 'use client' 指令
   - 可以与动态导入结合使用

## 扩展功能

### 自定义内容类型

可以通过修改 `renderSection` 函数添加新的内容类型：

```tsx
case 'custom-type':
  return (
    <div className="custom-component">
      {/* 自定义内容渲染 */}
    </div>
  );
```

### 主题支持

可以通过 props 传递主题参数：

```tsx
interface ContentRendererProps {
  sections: ContentSection[];
  className?: string;
  theme?: 'light' | 'dark';
}
```

## 故障排除

### 常见问题

1. **图片不显示**：
   - 检查图片路径是否正确
   - 确认图片文件存在于 public 目录
   - 验证 image 字段不为空字符串

2. **样式不生效**：
   - 检查 Tailwind CSS 配置
   - 确认样式类名正确
   - 验证父容器样式

3. **内容不渲染**：
   - 检查 sections 数组结构
   - 验证 type 字段值正确
   - 确认必需字段已提供

### 调试技巧

```tsx
// 添加调试信息
console.log('Sections data:', sections);

// 验证数据结构
const isValidSection = (section: ContentSection) => {
  return section && section.type && section.content;
};
```

## 更新日志

- **v1.0.0**: 初始版本，支持基础内容类型
- **v1.1.0**: 添加图片空值保护，修复渲染错误
- **v1.2.0**: 优化样式，添加响应式支持