# IconFont 组件使用指南

## 概述

IconFont 组件是一个基于阿里图标库的本地字体图标组件，使用 Font Class 方式，无需依赖外部 JS 文件。

## 组件特性

- ✅ 本地字体文件，无网络依赖
- ✅ TypeScript 支持
- ✅ 预定义尺寸快速使用
- ✅ 自定义颜色和样式
- ✅ 完整的可访问性支持
- ✅ 键盘导航支持

## 安装配置

字体文件已放置在 `assets/fonts/` 目录：
```
assets/fonts/
├── iconfont.woff2
├── iconfont.woff
└── iconfont.ttf
```

CSS 配置已在 `styles/globals.css` 中完成。

## 基础使用

```tsx
import IconFont from './components/IconFont';

// 基本使用
<IconFont type="icon-logo" />

// 指定大小
<IconFont type="icon-home" size="lg" />

// 自定义颜色
<IconFont type="icon-search" color="#3B82F6" />

// 可点击图标
<IconFont 
  type="icon-menu" 
  onClick={() => console.log('菜单点击')} 
/>
```

## 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `type` | `string` | - | 图标类型（必填）|
| `size` | `'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|string` | `'md'` | 图标大小 |
| `color` | `string` | - | 图标颜色 |
| `className` | `string` | - | 自定义样式类 |
| `style` | `CSSProperties` | - | 内联样式 |
| `onClick` | `(event) => void` | - | 点击事件 |
| `clickable` | `boolean` | `!!onClick` | 是否可点击 |

## 尺寸说明

| 尺寸 | 对应类名 | 像素值 |
|------|----------|--------|
| `xs` | `text-xs` | 12px |
| `sm` | `text-sm` | 14px |
| `md` | `text-base` | 16px |
| `lg` | `text-lg` | 18px |
| `xl` | `text-xl` | 20px |
| `2xl` | `text-2xl` | 24px |

你也可以传入自定义 Tailwind 类名：
```tsx
<IconFont type="icon-logo" size="text-6xl" />
```

## 使用示例

### 基础图标
```tsx
<IconFont type="icon-home" />
<IconFont type="icon-user" size="lg" />
<IconFont type="icon-search" color="#ef4444" />
```

### 可交互图标
```tsx
{/* 点击图标 */}
<IconFont 
  type="icon-close" 
  size="lg"
  onClick={() => setModalOpen(false)}
/>

{/* 带 hover 效果 */}
<IconFont 
  type="icon-heart" 
  className="hover:text-red-500 transition-colors"
  onClick={() => toggleLike()}
/>
```

### 导航图标
```tsx
{/* Logo */}
<IconFont 
  type="icon-logo" 
  size="2xl" 
  className="text-blue-600"
/>

{/* 菜单按钮 */}
<IconFont 
  type="icon-menu" 
  size="lg"
  className="md:hidden"
  onClick={() => setMobileMenuOpen(true)}
/>
```

### 状态图标
```tsx
{/* 加载状态 */}
<IconFont 
  type="icon-loading" 
  className="animate-spin"
  color="#6B7280"
/>

{/* 成功状态 */}
<IconFont 
  type="icon-check" 
  color="#10B981"
  size="lg"
/>
```

## 图标管理

从阿里图标库下载字体文件时：

1. 选择 "Font class" 方式
2. 下载字体文件到 `assets/fonts/`
3. 复制 CSS 中的图标类名（如 `.icon-home`）
4. 使用时去掉点号：`type="icon-home"`

## 可访问性

组件自动处理可访问性：

- 设置 `aria-hidden="true"` 用于装饰性图标
- 可点击图标自动添加 `role="button"`
- 支持键盘导航（Enter 和 Space 键）
- 可点击图标自动添加 `tabIndex={0}`

## 最佳实践

1. **语义化使用**：为可点击图标提供明确的点击行为
2. **尺寸一致**：在同一界面区域使用一致的图标尺寸
3. **颜色搭配**：图标颜色应与界面主题协调
4. **性能考虑**：避免在循环中创建过多图标实例

```tsx
// ✅ 推荐
<IconFont type="icon-delete" color="#ef4444" onClick={handleDelete} />

// ❌ 避免
<IconFont type="icon-delete" style={{color: 'red'}} onClick={handleDelete} />
```