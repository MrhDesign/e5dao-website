# Assets Directory

这个文件夹用于存放项目中使用的各种资产文件。

## 文件夹结构

- `images/` - 项目中使用的图片文件
  - 产品图片
  - 背景图片
  - 宣传图片等

- `icons/` - 图标文件
  - SVG图标
  - PNG/JPG图标
  - Favicon等

- `logos/` - 品牌相关图片
  - 公司Logo
  - 合作伙伴Logo
  - 品牌资产等

## 使用说明

1. 在Next.js中引用assets文件夹中的图片，请使用相对路径
2. 建议使用descriptive的文件名，如 `hero-background.jpg`
3. 优化图片大小以提高加载性能
4. 支持的格式：JPG, PNG, SVG, WebP等

## 示例用法

```jsx
import Image from 'next/image'

// 引用assets中的图片
<Image 
  src="/assets/images/hero-background.jpg" 
  alt="Hero Background"
  width={1200}
  height={600}
/>
```