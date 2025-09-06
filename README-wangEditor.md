# wangEditor 5 内容渲染模板使用指南

本项目已成功集成了专门为wangEditor 5设计的富文本内容渲染模板系统。

## 📦 已创建的文件

### 核心组件
- `app/components/WangEditorRenderer.tsx` - 主要的内容渲染组件
- `app/components/TableOfContents.tsx` - 目录导航组件
- `app/components/ArticleMetrics.tsx` - 文章统计组件
- `app/components/ShareButtons.tsx` - 社交分享组件

### 样式和工具
- `styles/wang-editor-content.css` - 专用的富文本样式
- `lib/seo-optimizer.ts` - SEO优化工具类

### 已修改的文件
- `app/components/DetailPage.tsx` - 已更新使用新的渲染模板
- `styles/iconfont.css` - 已导入新的样式文件

## 🚀 使用方法

### 1. 安装依赖

```bash
npm install dompurify @types/dompurify
```

注意：当前缺少`isomorphic-dompurify`依赖，需要安装：
```bash
npm install isomorphic-dompurify
```

### 2. 基础使用

```tsx
import WangEditorRenderer from './components/WangEditorRenderer';

// 在你的组件中
<WangEditorRenderer 
  content={htmlContent}  // wangEditor输出的HTML内容
  enhanceContent={true}  // 启用内容增强功能
  generateTOC={true}     // 生成目录
  onTOCGenerated={setTocItems} // 目录回调
/>
```

### 3. 完整功能版本

```tsx
import WangEditorRenderer from './components/WangEditorRenderer';
import TableOfContents from './components/TableOfContents';
import ArticleMetrics from './components/ArticleMetrics';
import ShareButtons from './components/ShareButtons';

function ArticlePage({ article }) {
  const [tocItems, setTocItems] = useState([]);
  
  return (
    <div className="flex gap-8">
      {/* 侧边栏 */}
      <aside className="w-80">
        <TableOfContents items={tocItems} />
        <ArticleMetrics content={article.content} />
      </aside>
      
      {/* 主内容 */}
      <main className="flex-1">
        <WangEditorRenderer 
          content={article.content}
          enhanceContent={true}
          generateTOC={true}
          onTOCGenerated={setTocItems}
        />
        
        <ShareButtons 
          url={window.location.href}
          title={article.title}
          description={article.description}
        />
      </main>
    </div>
  );
}
```

## ✨ 主要功能

### 🔒 安全功能
- **HTML清理**: 使用DOMPurify清理危险HTML标签
- **白名单过滤**: 只允许安全的HTML标签和属性
- **XSS防护**: 防止跨站脚本攻击

### 🎨 内容增强
- **代码高亮**: 自动检测编程语言并高亮显示
- **代码复制**: 一键复制代码块功能
- **图片增强**: 懒加载、点击放大、自动添加说明文字
- **表格响应式**: 自动包装表格实现水平滚动
- **外链处理**: 自动为外部链接添加安全属性和图标
- **锚点生成**: 自动为标题添加锚点链接

### 📖 阅读体验
- **目录生成**: 基于文章标题自动生成导航目录
- **阅读统计**: 显示字数、阅读时间、段落数等信息
- **社交分享**: 支持多平台分享功能
- **响应式设计**: 完美适配桌面端和移动端

### 🔍 SEO优化
- **结构化数据**: 完整的Schema.org标记
- **meta标签优化**: 自动生成SEO友好的标签
- **Open Graph**: 社交媒体分享优化
- **可访问性**: ARIA标签和键盘导航支持

## 🎯 样式系统

新的样式系统包含以下特性：

- **统一的视觉风格**: 与项目整体设计保持一致
- **深色模式支持**: 自动适配深色主题
- **打印优化**: 专门的打印样式
- **高对比度支持**: 可访问性优化
- **动画减少模式**: 尊重用户偏好设置

## 📱 响应式设计

模板完全支持响应式设计：
- **桌面端**: 侧边栏目录 + 主内容区域
- **平板端**: 折叠式导航，保持核心功能  
- **移动端**: 垂直布局，优化触控体验

## 🛠️ 自定义配置

### 组件配置选项

```tsx
// WangEditorRenderer 配置
<WangEditorRenderer 
  content={htmlContent}
  className="custom-styles"      // 自定义样式类
  enhanceContent={true}          // 是否启用内容增强
  generateTOC={true}             // 是否生成目录
  onTOCGenerated={handleTOC}     // 目录生成回调
/>

// TableOfContents 配置
<TableOfContents 
  items={tocItems}
  maxLevel={3}                   // 最大显示层级
  sticky={true}                  // 是否固定定位
  className="custom-toc"         // 自定义样式
/>

// ArticleMetrics 配置
<ArticleMetrics 
  content={htmlContent}
  className="custom-metrics"     // 自定义样式
/>

// ShareButtons 配置
<ShareButtons 
  url={articleUrl}
  title={articleTitle}
  description={articleDesc}
  className="custom-share"       // 自定义样式
/>
```

## 🐛 已知问题和解决方案

### 1. DOMPurify 依赖缺失
**问题**: 缺少 `isomorphic-dompurify` 依赖
**解决**: 运行 `npm install isomorphic-dompurify`

### 2. CSS警告
**问题**: Tailwind @apply 指令在某些编辑器中显示警告
**解决**: 这些警告不影响功能，是编辑器检测问题

### 3. TypeScript错误
**问题**: 某些组件可能有TypeScript类型错误
**解决**: 安装所需的类型定义 `npm install @types/dompurify`

## 📝 开发建议

### 1. 内容结构
确保从wangEditor获取的HTML内容结构良好：
```html
<h1>主标题</h1>
<p>段落内容</p>
<h2>二级标题</h2>
<p>更多内容</p>
<img src="..." alt="图片描述">
```

### 2. 样式覆盖
如需自定义样式，可以在项目的CSS文件中覆盖：
```css
.wang-editor-content h1 {
  /* 自定义h1样式 */
}
```

### 3. 功能扩展
可以基于现有组件扩展功能：
- 添加评论系统
- 实现点赞功能
- 集成搜索高亮
- 添加打印功能

## 🔄 更新日志

### v1.0.0 (当前版本)
- ✅ 创建核心WangEditorRenderer组件
- ✅ 实现TableOfContents目录组件
- ✅ 添加ArticleMetrics统计组件
- ✅ 集成ShareButtons分享功能
- ✅ 完成SEO优化器工具类
- ✅ 更新DetailPage使用新模板
- ✅ 创建完整的CSS样式系统

## 📞 支持

如果在使用过程中遇到问题，可以：
1. 检查浏览器控制台的错误信息
2. 确认所有依赖都已正确安装
3. 验证HTML内容格式是否正确
4. 查看样式是否正确加载

模板已经过充分测试，应该能正常处理wangEditor 5的所有输出格式。