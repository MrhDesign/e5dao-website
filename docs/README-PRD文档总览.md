# E5DAO 企业官网 PRD 文档总览

## 📋 文档概述

本文档库为 E5DAO 企业官网项目提供完整的产品需求文档（PRD），涵盖项目的技术架构、组件系统、API 设计和产品管理等核心模块。

## 📚 文档结构

### [PRD-01 项目概述](./PRD-01-项目概述.md)
**关键内容**:
- 项目基本信息和业务背景
- 技术栈选型和架构概览
- 功能模块概述和设计系统
- 用户体验设计和性能优化策略
- 数据管理架构和部署维护

**适用人群**: 项目经理、技术负责人、产品经理

### [PRD-02 技术架构](./PRD-02-技术架构.md)
**关键内容**:
- Next.js 15 + App Router 架构详解
- 组件分层结构和设计模式
- 内容管理系统和数据类型系统
- 样式系统和动画系统架构
- 性能优化和错误处理机制
- 构建部署配置

**适用人群**: 前端开发工程师、架构师、技术负责人

### [PRD-03 组件系统](./PRD-03-组件系统.md)
**关键内容**:
- 原子、分子、有机体、模板组件分层
- ProductCard 双输入模式设计详解
- 组件接口定义和性能优化策略
- 功能性组件和测试策略
- 组件文档化规范

**适用人群**: 前端开发工程师、UI/UX 设计师

### [PRD-04 API接口文档](./PRD-04-API接口文档.md)
**关键内容**:
- 当前静态内容访问接口
- 未来 RESTful API 设计规范
- 数据类型定义和错误处理
- 搜索、缓存、实时更新接口
- API 版本管理和监控策略

**适用人群**: 前端开发工程师、后端开发工程师、API 设计师

### [PRD-05 产品管理系统](./PRD-05-产品管理系统.md)
**关键内容**:
- 双产品类型系统（自研产品 vs 标准产品）
- 产品分类和详情展示系统
- 智能产品推荐算法
- 产品数据管理规范
- 性能优化和扩展性设计

**适用人群**: 产品经理、前端开发工程师、内容管理员

## 🏗️ 项目核心特性

### 技术亮点
- **Next.js 15 + App Router**: 最新的 React 全栈框架
- **TypeScript 5**: 强类型约束，确保代码质量
- **Tailwind CSS 4**: 原子化 CSS 框架
- **Turbopack**: 超快的构建工具
- **ScrollReveal**: 流畅的滚动动画

### 架构优势
- **组件化设计**: 高度可复用的组件系统
- **响应式优先**: 移动端优先的设计理念
- **性能优化**: 图片懒加载、代码分割、缓存策略
- **类型安全**: 完整的 TypeScript 类型定义
- **扩展性强**: 支持国际化和功能扩展

## 💡 核心业务功能

### 1. 产品展示系统
- **双产品类型**: 自研产品（title + description）和标准产品（model + description）
- **智能推荐**: 基于分类的相关产品推荐
- **多变体展示**: default（网格）和 solution（列表）布局
- **技术参数**: 详细的产品规格参数表格

### 2. 内容管理系统
- **集中化管理**: `lib/content.json` 统一管理所有内容
- **点号语法访问**: `getContent('products.items')` 便捷访问
- **类型安全**: TypeScript 接口保证数据一致性

### 3. 路由系统
- **动态路由**: `/products/[category]/[id]` 支持分类和产品ID
- **友好URL**: 基于 slug 的可读 URL 结构
- **分类验证**: 确保 URL 分类与产品实际分类匹配

### 4. 用户体验
- **响应式设计**: 完美适配移动端和桌面端
- **动画效果**: ScrollReveal 提供流畅的入场动画
- **图片优化**: Next.js Image 自动优化和懒加载
- **错误处理**: 优雅的错误边界和降级处理

## 📊 数据架构图示

```
E5DAO 数据架构
├── Content Management (内容管理)
│   ├── content.json           # 集中化内容数据
│   ├── useContent Hook        # 内容访问接口
│   └── Types Definition       # TypeScript 类型定义
├── Product System (产品系统)
│   ├── Independent R&D        # 自研产品
│   ├── Standard Products      # 标准产品
│   ├── Categories            # 产品分类
│   └── Specifications        # 技术规格
├── Component System (组件系统)
│   ├── Atomic Components     # 原子组件（Button, Icon）
│   ├── Molecular Components  # 分子组件（ProductCard, NewCard）
│   ├── Organism Components   # 有机体组件（Header, Footer）
│   └── Template Components   # 模板组件（DetailPage）
└── Routing System (路由系统)
    ├── Static Routes         # 静态路由（首页、关于）
    ├── Dynamic Routes        # 动态路由（产品、新闻）
    └── Nested Routes         # 嵌套路由（解决方案）
```

## 🔧 开发指南

### 环境要求
```bash
Node.js: >= 18.0.0
npm: >= 9.0.0
```

### 开发命令
```bash
# 启动开发服务器（使用 Turbopack）
npm run dev

# 构建生产版本（使用 Turbopack）
npm run build

# 启动生产服务器
npm start

# 代码质量检查
npm run lint
```

### 内容更新流程
1. 修改 `lib/content.json` 中的内容数据
2. 新增产品到 `products.items` 数组
3. 遵循产品数据创建规范（见 PRD-05）
4. 运行 `npm run build` 验证构建
5. 部署到生产环境

### 组件开发规范
1. **优先使用现有组件**: 检查 `app/components/` 目录
2. **TypeScript 接口**: 为所有组件定义 Props 接口
3. **响应式设计**: 使用移动端优先的 Tailwind 类名
4. **性能优化**: 使用 React.memo 和 hooks 优化
5. **错误处理**: 实现降级 UI 和错误边界

## 📈 性能指标

### 核心 Web 指标目标
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 优化策略
- Next.js Image 组件自动优化图片
- Turbopack 提供快速构建和热更新
- 代码分割和动态导入减少包大小
- useMemo 和 useCallback 优化 React 性能

## 🚀 扩展性设计

### 国际化准备
- 内容与代码分离的架构
- 预留多语言数据结构
- 组件级别的文本外部化

### 功能扩展点
- 用户认证系统集成
- 电商功能（购物车、支付）
- 搜索和筛选功能
- 产品比较和收藏功能
- CMS 系统对接

### API 系统演进
- 从静态内容管理到动态 API
- RESTful API 设计规范
- GraphQL 查询接口（可选）
- 实时更新和缓存策略

## 🔍 文档使用指南

### 开发人员
1. 先阅读 **PRD-01 项目概述** 了解整体架构
2. 查看 **PRD-02 技术架构** 了解实现细节
3. 参考 **PRD-03 组件系统** 进行组件开发
4. 使用 **PRD-04 API接口文档** 了解数据访问方式

### 产品经理
1. 重点关注 **PRD-01 项目概述** 的功能模块
2. 理解 **PRD-05 产品管理系统** 的业务逻辑
3. 参考数据管理规范进行内容更新

### 设计师
1. 了解 **PRD-03 组件系统** 的设计模式
2. 参考响应式设计和动画系统规范
3. 理解组件变体和使用场景

## 📝 维护更新

### 文档维护
- 定期更新技术栈版本信息
- 同步代码变更到相应文档
- 记录重要的架构决策和变更历史

### 版本控制
- 文档版本与代码版本保持同步
- 重大变更需要更新相关文档
- 保持向后兼容性说明

---

**文档维护**: Claude Code  
**最后更新**: 2025-09-04  
**版本**: v1.0  
**项目地址**: `/Users/macintosh/Developer/e5daoweb`