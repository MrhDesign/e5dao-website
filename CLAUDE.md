# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for fast compilation)
- **Build**: `npm run build` (production build with Turbopack)
- **Start production**: `npm start`
- **Lint**: `npm run lint` (ESLint with Next.js configuration)

## Architecture Overview

This is a Next.js 15 application using the App Router architecture for E5DAO, a Singapore-based carbon fiber composite materials manufacturer. The project follows a component-based structure with centralized content management.

### Key Directories

- `app/` - Next.js App Router pages and layouts
  - `components/` - Reusable UI components
  - `products/[category]/[id]/` - Dynamic product detail pages
  - `news/` - News and applications content
  - `solution/` - Solution-specific pages (command-system, treatment-system)
- `lib/` - Core utilities and business logic
  - `types.ts` - TypeScript type definitions for products, content, and data structures
  - `productUtils.ts` - Product filtering and category utilities
  - `content.json` - Centralized content data store
  - `global-metadata-generator.ts` - SEO metadata generation
- `styles/` - CSS files including global styles and component-specific styles
- `public/images/` - Product images organized by category (RM/, AC-PDModule/, etc.)

### Data Architecture

The application uses a centralized content management system:

- **Products**: Two main types - `IndependentRDProduct` (custom R&D) and `StandardProduct` (standardized items)
- **Content Management**: All content stored in `lib/content.json` with TypeScript interfaces in `lib/types.ts`
- **Product Categories**: Organized by `categoryId` with corresponding slug-based routing
- **News/Applications**: Structured content with publication dates and metadata

### Key Components

- **ProductCard**: Display product information with image galleries
- **ContentRenderer/RichContentRenderer**: Handle dynamic content rendering
- **ProductImageGallery**: Swiper-based image galleries for products
- **StructuredData**: SEO structured data implementation
- **Pagination**: Reusable pagination component

### Content System

Content is managed through:
- Central JSON store (`lib/content.json`) for all static content
- TypeScript interfaces for type safety (`lib/types.ts`)
- Utility functions for content access (`lib/useContent.ts`)
- Product utilities for filtering and categorization (`lib/productUtils.ts`)

### SEO Implementation

The site includes comprehensive SEO optimization:
- Global metadata generation with structured data
- Dynamic meta tags for products and pages
- Breadcrumb navigation
- Social media optimization

### Styling

- **Tailwind CSS 4**: Primary styling framework
- **Custom CSS**: Component-specific styles in `styles/` directory
- **Icon Font**: Custom iconfont implementation for icons
- **Responsive Design**: Mobile-first approach with responsive components

## Communication Rules

- **Language**: Always communicate in Chinese when interacting with developers
- **Code Comments**: All code comments must be written in Chinese

## Important Notes

- Product images are organized in subdirectories under `public/images/` by product category
- The application supports both English content with plans for internationalization
- All product data should maintain consistency with the TypeScript interfaces in `lib/types.ts`
- When adding new products, ensure proper category association and image organization


### 动画系统
- **ScrollReveal 集成**：`lib/useScrollReveal.ts` 提供基于滚动的动画钩子
- **多重显示模式**：`useScrollRevealMultiple()` 用于为不同模块配置不同动画
- **移动端优化**：响应式动画配置

### 样式架构
- **Tailwind CSS 4**：使用 CSS 变量的自定义设计系统
- **自定义字体**：本地加载的 TikTokSans 可变字体
- **设计令牌**：一致的调色板、间距和排版比例
- **响应式设计**：移动优先的方法，使用 lg: 断点

## 文件约定

### 内容更新
- **文本修改**：在 `lib/content.json` 中修改，而非在组件中硬编码字符串
- **产品管理**：在 `content.json` 的 products.items 数组中添加/编辑产品
- **产品目录系统**：`docs/products_catalog.json` 包含完整的碳纤维复合材料箱体产品目录，包含5大分类39个产品型号
- **新闻系统**：文章和应用通过 content.json 管理，使用基于 slug 的路由

### 移动端体验
- **响应式导航**：复杂的移动端菜单，带有流畅动画和子菜单
- **触控优化**：正确的移动端视频处理和触控友好的交互
- **移动优先 CSS**：所有组件都采用移动优先设计，桌面端增强

### 组件开发
- **TypeScript 接口**：为所有组件定义 props 接口
- **响应式类名**：使用 Tailwind 的移动优先断点系统（lg: 等）
- **动画选择器**：使用与 ScrollReveal 配置匹配的 className 选择器
- **图标使用**：使用 `<Icon name="iconName" />` 保持图标字体系统的一致性


### 性能考虑
- 所有图片使用 Next.js Image
- 为异步操作实现适当的加载状态
- 考虑 ScrollReveal 对新动画模块性能的影响

### 样式方法
利用现有的 Tailwind 配置和自定义 CSS 变量。保持与既定调色板和间距系统的一致性。
---

## 绝对规则

- **不允许部分实现**
- **不允许简化**：不要"//这是暂时简化的内容，完整实现会怎样怎样"
- **不允许代码重复**：检查现有代码库以重用函数和常量。在编写新函数之前阅读文件。使用常识函数名称以便轻松找到它们
- **不允许死代码**：要么使用要么从代码库中完全删除
- **为每个函数实现测试**
- **不允许欺骗性测试**：测试必须准确，反映真实使用情况并设计用于揭示缺陷。不要无用的测试！设计详细的测试，以便我们可以用它们进行调试
- **不允许不一致的命名** - 阅读现有代码库命名模式
- **不允许过度工程化** - 当简单函数可以工作时，不要添加不必要的抽象、工厂模式或中间件。不要在需要"工作"时想到"企业"
- **不允许混合关注点** - 不要将验证逻辑放在API处理程序中，将数据库查询放在UI组件中等，而不是适当的分离
- **不允许资源泄漏** - 不要忘记关闭数据库连接、清除超时、移除事件监听器或清理文件句柄