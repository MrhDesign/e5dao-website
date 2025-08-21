# Fonts Directory

这个文件夹用于存放项目中使用的自定义字体文件。

## 支持的字体格式

- **WOFF2** (.woff2) - 推荐格式，压缩率最高，现代浏览器支持
- **WOFF** (.woff) - 广泛支持的Web字体格式
- **TTF** (.ttf) - TrueType字体
- **OTF** (.otf) - OpenType字体
- **EOT** (.eot) - IE浏览器兼容格式

## 文件组织建议

```
fonts/
├── primary/          # 主要字体系列
│   ├── font-regular.woff2
│   ├── font-bold.woff2
│   └── font-italic.woff2
├── secondary/        # 次要字体系列
│   └── ...
└── icons/           # 图标字体
    └── icon-font.woff2
```

## 使用方法

1. 将字体文件放入此文件夹
2. 在 `styles/globals.css` 中定义 @font-face
3. 在CSS中使用定义的字体名称

## 示例

```css
/* 在 styles/globals.css 中定义 */
@font-face {
  font-family: 'Primary Font';
  src: url('../assets/fonts/primary/font-regular.woff2') format('woff2'),
       url('../assets/fonts/primary/font-regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* 优化字体加载性能 */
}

/* 在组件中使用 */
.text-primary {
  font-family: 'Primary Font', sans-serif;
}
```

## 性能优化建议

- 优先使用 WOFF2 格式
- 设置 `font-display: swap` 提升加载性能
- 考虑字体子集化减小文件大小
- 使用 Google Fonts 等CDN服务