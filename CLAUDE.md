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
├── products/[category]/[id]/      # 动态产品页面（按分类和ID）
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
- **卡片组件**：
  - `ProductCard.tsx`：支持双模式数据输入（完整产品对象或逐字段传递），包含 default 和 solution 两种变体，使用 React.memo 优化性能
  - `NewCard.tsx`：新闻卡片组件，用于一致的布局
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
- **产品目录系统**：`docs/products_catalog.json` 包含完整的碳纤维复合材料箱体产品目录，包含5大分类39个产品型号
- **新闻系统**：文章和应用通过 content.json 管理，使用基于 slug 的路由

### 产品目录结构
项目包含完整的产品目录系统，位于 `docs/products_catalog.json`：

#### 产品分类体系
1. **通用箱系列** (universal_cases) - 8个产品型号
2. **功能箱系列** (functional_cases) - 19个产品型号
   - 医疗设备箱体（急救箱、复温箱、药材箱等）
   - 通讯设备箱体
   - 专业工具箱体
3. **机架箱系列** (rack_cases) - 2个产品型号（4U、8U）
4. **拉杆箱系列** (trolley_cases) - 6个产品型号
5. **碳杆箱系列** (carbon_rod_cases) - 2个产品型号

#### 产品数据规范
每个产品包含以下标准字段：
- `model`: 产品型号
- `specifications`: 详细规格参数（外尺寸、内尺寸、重量、材质等）
- `description`: 产品描述
- `standardCategory`: 所属系列分类

### 组件开发
- **TypeScript 接口**：为所有组件定义 props 接口
- **响应式类名**：使用 Tailwind 的移动优先断点系统（lg: 等）
- **动画选择器**：使用与 ScrollReveal 配置匹配的 className 选择器
- **图标使用**：使用 `<Icon name="iconName" />` 保持图标字体系统的一致性

### 资源组织
- **图片**：存储在 `public/images/` 目录，使用描述性名称
- **字体**：自定义字体位于 `public/fonts/`
- **图标**：图标字体文件在 `public/fonts/`，CSS 类在 `styles/iconfont.css`

### 文档资源
- **产品数据指南**：`docs/PRODUCT_DATA_GUIDE.md` 详细说明产品数据创建规则、字段要求和最佳实践
- **产品目录**：`docs/products_catalog.json` 完整的产品目录数据

## 关键功能特性

### 产品系统架构

#### ProductCard 组件特性
- **双输入模式**：支持传递完整产品对象或逐字段传递，确保向后兼容性
- **智能数据解析**：自动识别产品类型（自研产品 vs 标准产品），处理可选字段
- **多变体设计**：
  - `default`：标准卡片样式，适用于产品列表和网格展示
  - `solution`：解决方案专用变体，水平布局，更大的信息展示空间
- **URL 生成优化**：使用 useMemo 缓存产品链接，减少重复计算
- **性能优化**：React.memo 包装避免不必要的重新渲染

#### 产品详情页面功能
- **智能产品推荐**：基于当前产品在分类中的位置，智能展示相关产品
- **分类验证机制**：验证 URL 中的分类参数与产品实际分类的一致性
- **产品类型适配**：
  - 自研产品：显示 title + description
  - 标准产品：显示 model + description + 标准产品通用详情
- **标准产品增强**：从 content.json 获取标准产品通用详情数据，统一展示品质保证信息

#### 产品数据结构
- **产品类型区分**：`productType` 字段区分 'independent-rd'（自研）和 'standard'（标准）产品
- **灵活字段支持**：根据产品类型显示不同字段组合
- **规格参数表格**：标准产品支持详细的技术参数表格展示

### 多语言内容结构
内容通过集中化的 content.json 系统组织，支持未来的国际化。

### 动态路由
- 产品页面：`/products/[category]/[id]` 基于分类和 ID 的双层路由，支持分类验证和智能产品推荐
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

### 产品数据创建
创建新产品数据时，严格遵循 `docs/PRODUCT_DATA_GUIDE.md` 中的规范：

#### 自研产品数据结构
```json
{
  "id": 1,
  "categoryId": 1,
  "productType": "independent-rd",
  "image": "/images/products.png",
  "alt": "产品描述",
  "title": "产品完整标题",
  "description": "产品详细描述"
}
```

#### 标准产品数据结构  
```json
{
  "id": 2,
  "categoryId": 1,
  "productType": "standard",
  "image": "/images/fields-1.png",
  "alt": "产品描述", 
  "model": "PROD-001",
  "standardCategory": "产品分类名称"
}
```

**重要提醒**：
- 自研产品主要字段：`title` + `description`
- 标准产品主要字段：`model` + `description`
- 检查完整的字段要求和最佳实践请参考产品数据指南

### 组件开发
遵循现有的 TypeScript 接口、响应式设计和动画集成模式。所有新组件都应支持设计系统令牌。

#### 产品组件开发规范
- **数据结构标准**：遵循 `docs/PRODUCT_DATA_GUIDE.md` 中的产品数据创建规则
- **产品类型区分**：
  - 自研产品（`independent-rd`）：使用 `title` + `description` 字段
  - 标准产品（`standard`）：使用 `model` + `description` 字段
- **ProductCard 使用**：优先使用完整产品对象作为 props，利用其智能解析能力
- **变体选择**：根据使用场景选择合适的变体（default 用于网格布局，solution 用于列表布局）
- **性能考虑**：依赖 React.memo 和 useMemo 的性能优化，避免在 props 中传递复杂计算结果
- **字段最小化**：只包含该产品类型实际使用的字段，减少数据冗余

### 性能考虑
- 所有图片使用 Next.js Image
- 为异步操作实现适当的加载状态
- 考虑 ScrollReveal 对新动画模块性能的影响

### 样式方法
利用现有的 Tailwind 配置和自定义 CSS 变量。保持与既定调色板和间距系统的一致性。