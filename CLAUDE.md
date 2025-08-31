# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 重要通信规则

**使用中文进行所有回复和交流**：在此项目中工作时，请始终使用中文与用户进行对话和回复，包括解释代码、报告错误、提供建议等所有场景。

## 设计开发规则

**优先使用现有组件**：在设计和开发新页面或功能时，必须优先考虑使用已存在的组件。在创建新组件之前，先检查 `app/components/` 目录中是否有可复用的组件，确保代码的一致性和维护性。只有在现有组件无法满足需求时才创建新组件。

**页面文本语言规则**：设计和开发页面时，页面显示的文本内容应使用英文，不需要显示中文。代码中的注释和备注信息可以使用中文。只有在与用户对话交流时才使用中文回复。

## 项目概述

这是一个基于 **Next.js 15** 的企业官网，为新加坡 E5DAO 公司开发。该公司专注于高端复合材料（碳纤维、凯夫拉）技术。网站展示产品、解决方案、行业应用、新闻资讯和公司信息。

**核心技术栈：**
- Next.js 15.5.0 + App Router
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- ScrollReveal 动画
- 自定义图标字体

## 开发命令

```bash
# 使用 Turbopack 启动开发服务器
npm run dev

# 使用 Turbopack 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 架构与模式

### 应用结构（Next.js App Router）
```
app/
├── layout.tsx           # 根布局（包含 Header/Footer）
├── page.tsx            # 首页（英雄视频、各个模块）
├── components/         # 共享 UI 组件
├── products/[id]/      # 动态产品页面
├── news/              
│   ├── articles/[slug]/ # 新闻文章
│   └── applications/[slug]/ # 行业应用
├── contact/           # 联系页面（含表单）
└── aboutUs/          # 关于我们页面
```

### 内容管理系统
- **集中化内容**：`lib/content.json` 包含所有文本内容、导航标签、产品数据、新闻文章和行业应用
- **内容钩子**：`lib/useContent.ts` 提供 `getContent(path)` 函数，使用点号语法访问嵌套内容（如 `'home.hero.button'`）
- **结构化数据**：产品、新闻文章和行业应用在 content.json 中以数组形式存储，具有一致的数据模式

### 组件模式
- **可复用组件**：全部位于 `app/components/` 目录，使用 TypeScript 接口
- **按钮系统**：`Button.tsx` 包含多种变体（primary、secondary、outline、ghost）和加载状态
- **卡片组件**：`ProductCard.tsx`、`NewCard.tsx` 用于一致的布局
- **导航系统**：复杂的移动端菜单，包含子菜单和流畅动画
- **自定义图标**：通过 `Icon.tsx` 组件实现的图标字体系统

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
- **新闻系统**：文章和应用通过 content.json 管理，使用基于 slug 的路由

### 组件开发
- **TypeScript 接口**：为所有组件定义 props 接口
- **响应式类名**：使用 Tailwind 的移动优先断点系统（lg: 等）
- **动画选择器**：使用与 ScrollReveal 配置匹配的 className 选择器
- **图标使用**：使用 `<Icon name="iconName" />` 保持图标字体系统的一致性

### 资源组织
- **图片**：存储在 `public/images/` 目录，使用描述性名称
- **字体**：自定义字体位于 `public/fonts/`
- **图标**：图标字体文件在 `public/fonts/`，CSS 类在 `styles/iconfont.css`

## 关键功能特性

### 多语言内容结构
内容通过集中化的 content.json 系统组织，支持未来的国际化。

### 动态路由
- 产品页面：`/products/[id]` 基于 ID 的导航
- 新闻文章：`/news/articles/[slug]` 和 `/news/applications/[slug]`
- SEO 优化的 URL，基于 slug 的路由

### 性能优化
- **Next.js Image**：优化图片，英雄内容优先加载
- **视频处理**：智能自动播放，带有回退控制的英雄视频
- **Turbopack**：用于更快的构建和开发
- **动态导入**：ScrollReveal 仅在客户端加载

### 移动端体验
- **响应式导航**：复杂的移动端菜单，带有流畅动画和子菜单
- **触控优化**：正确的移动端视频处理和触控友好的交互
- **移动优先 CSS**：所有组件都采用移动优先设计，桌面端增强

## 开发指南

### 内容修改
始终通过 `lib/content.json` 更新内容，而不是硬编码字符串。使用 `getContent()` 钩子和点号语法进行嵌套访问。

### 组件开发
遵循现有的 TypeScript 接口、响应式设计和动画集成模式。所有新组件都应支持设计系统令牌。

### 性能考虑
- 所有图片使用 Next.js Image
- 为异步操作实现适当的加载状态
- 考虑 ScrollReveal 对新动画模块性能的影响

### 样式方法
利用现有的 Tailwind 配置和自定义 CSS 变量。保持与既定调色板和间距系统的一致性。