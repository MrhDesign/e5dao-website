# Styles Directory

这个文件夹用于存放项目中的所有样式文件。

## 文件夹结构

- `globals.css` - 全局样式文件
- `components/` - 组件样式文件
  - 每个组件的专属样式
  - 可复用的组件样式
- `pages/` - 页面专属样式
  - 特定页面的样式
  - 页面级别的布局样式

## 字体文件

字体文件存放在 `assets/fonts/` 文件夹中：
- `.woff` / `.woff2` 文件 (推荐，压缩率高)
- `.ttf` / `.otf` 文件
- `.eot` 文件 (IE兼容)

## 使用建议

1. **全局样式** - 在 `globals.css` 中定义
   - CSS Reset/Normalize
   - 全局变量
   - 基础排版样式

2. **组件样式** - 使用CSS Modules或Tailwind
   - 组件特定的样式
   - 保持样式的封装性

3. **自定义字体** - 在globals.css中定义@font-face
   ```css
   @font-face {
     font-family: 'CustomFont';
     src: url('../assets/fonts/custom-font.woff2') format('woff2'),
          url('../assets/fonts/custom-font.woff') format('woff');
     font-weight: normal;
     font-style: normal;
   }
   ```

## 文件命名规范

- 使用kebab-case命名：`header-component.css`
- 页面样式：`home-page.css`
- 组件样式：`button-component.css`