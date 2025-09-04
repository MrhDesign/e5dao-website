# ProductImageGallery 组件文档

## 📋 组件概述

ProductImageGallery 是专为产品详情页设计的高级图片画廊组件，基于 Swiper.js 构建，提供主图展示和缩略图导航功能，具备智能滑动、触控支持和无障碍特性。

### 核心特性
- **双 Swiper 架构**: 主图 + 缩略图联动展示
- **智能缩略图导航**: 自动居中和智能滑动逻辑
- **触控友好**: 完整的移动端手势支持
- **自定义导航**: 优雅的左右箭头导航
- **无障碍支持**: 完整的 ARIA 标签和键盘导航
- **性能优化**: React.memo 和图片优先加载
- **响应式设计**: 移动端和桌面端完美适配

## 🏗️ 接口设计

### 组件 Props 接口
```typescript
interface ProductImageGalleryProps {
  images: string[];          // 必填：图片URL数组
  productName: string;       // 必填：产品名称（用于alt文本）
  className?: string;        // 可选：自定义样式类名
}
```

### 使用示例
```typescript
import ProductImageGallery from '@/components/ProductImageGallery';

const ProductDetailPage = () => {
  const productImages = [
    product.image,              // 主图
    ...(product.gallery || [])  // 画廊图片
  ];

  return (
    <ProductImageGallery
      images={productImages}
      productName={product.title || product.model}
      className="w-full max-w-[600px]"
    />
  );
};
```

## 🔧 技术架构

### 1. 依赖库集成

#### Swiper.js 集成
```typescript
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// 导入 Swiper 样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
```

#### 模块配置
- **Navigation**: 左右箭头导航支持
- **Thumbs**: 缩略图联动功能
- **A11y**: 无障碍功能支持

### 2. 状态管理系统

#### 2.1 组件状态
```typescript
function ProductImageGallery({ images, productName, className = "" }) {
  // 缩略图 Swiper 实例引用
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  
  // 主图 Swiper 实例引用
  const mainSwiperRef = useRef<SwiperType | null>(null);
}
```

#### 2.2 状态说明
- **thumbsSwiper**: 控制缩略图轮播的 Swiper 实例
- **mainSwiperRef**: 控制主图轮播的 Swiper 实例
- **双向联动**: 主图和缩略图之间的同步控制

### 3. 智能缩略图导航系统

#### 3.1 智能滑动逻辑
```typescript
const handleThumbnailClick = (clickedIndex: number) => {
  if (!thumbsSwiper || images.length <= 3) return;

  // 延迟执行缩略图滑动，确保主图切换先完成
  setTimeout(() => {
    if (!thumbsSwiper) return;

    // 获取当前缩略图可视区域的开始索引
    const currentActiveIndex = thumbsSwiper.activeIndex;
    const visibleSlidesCount = 3;
    
    // 计算点击位置相对于可视区域的位置
    const relativePosition = clickedIndex - currentActiveIndex;
    
    // 智能滑动逻辑
    if (relativePosition === 0 && clickedIndex > 0) {
      // 点击最左边的缩略图，且不是第一张，向左滑动一位
      thumbsSwiper.slideTo(Math.max(clickedIndex - 1, 0));
    } else if (relativePosition === visibleSlidesCount - 1 && clickedIndex < images.length - 1) {
      // 点击最右边的缩略图，且不是最后一张，向右滑动一位
      thumbsSwiper.slideTo(Math.min(clickedIndex - 1, images.length - visibleSlidesCount));
    } else if (clickedIndex < currentActiveIndex) {
      // 点击的图片在当前可视区域左侧，滑动到让它成为第一个
      thumbsSwiper.slideTo(clickedIndex);
    } else if (clickedIndex >= currentActiveIndex + visibleSlidesCount) {
      // 点击的图片在当前可视区域右侧，滑动到让它成为最后一个
      thumbsSwiper.slideTo(Math.max(clickedIndex - visibleSlidesCount + 1, 0));
    }
  }, 100);
};
```

#### 3.2 智能滑动特点
- **优先级处理**: 主图切换优先，缩略图滑动延后
- **边界检测**: 防止超出有效索引范围
- **用户体验**: 智能判断滑动方向和距离
- **性能优化**: 当图片数量 ≤ 3 时跳过滑动逻辑

## 🎨 UI 设计系统

### 1. 主图区域设计

#### 1.1 布局结构
```typescript
<div className="relative lg:aspect-[4/3] aspect-square overflow-hidden lg:max-w-[600px] group">
  <Swiper
    modules={[Navigation, Thumbs, A11y]}
    thumbs={{
      swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
    }}
    navigation={{
      prevEl: '.custom-prev',
      nextEl: '.custom-next',
    }}
    spaceBetween={0}
    slidesPerView={1}
    speed={300}
    className="h-full w-full"
  >
    {/* 图片幻灯片 */}
  </Swiper>
  
  {/* 自定义导航按钮 */}
</div>
```

#### 1.2 设计特点
- **响应式比例**: 桌面端 4:3，移动端 1:1
- **最大宽度限制**: 桌面端最大 600px
- **过渡效果**: 300ms 平滑切换
- **悬停显示**: group-hover 显示导航按钮

### 2. 自定义导航按钮

#### 2.1 按钮设计
```typescript
<button
  className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-12 backdrop-blur-sm rounded-sm shadow-lg border border-border-one flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-fill-white/90 hover:bg-fill-white hover:scale-110 cursor-pointer"
  aria-label="Previous image"
>
  <svg className="w-5 h-5 text-text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</button>
```

#### 2.2 按钮特性
- **毛玻璃效果**: backdrop-blur-sm 背景模糊
- **悬停显示**: 默认透明，hover 时显示
- **缩放动画**: hover 时 110% 放大
- **无障碍支持**: aria-label 标签
- **视觉层级**: z-10 确保在图片上方

### 3. 缩略图区域设计

#### 3.1 缩略图 Swiper 配置
```typescript
<Swiper
  onSwiper={setThumbsSwiper}
  modules={[Navigation, Thumbs]}
  spaceBetween={0}
  slidesPerView={3}         // 固定显示3个缩略图
  watchSlidesProgress={true}
  className="thumbnail-swiper"
  speed={300}
>
  {images.map((img, index) => (
    <SwiperSlide key={index}>
      <div 
        className="thumbnail-border relative aspect-[4/3] overflow-hidden transition-all duration-300 cursor-pointer border border-transparent"
        onClick={() => {
          // 缩略图点击处理逻辑
        }}
      >
        {/* 缩略图内容 */}
      </div>
    </SwiperSlide>
  ))}
</Swiper>
```

#### 3.2 缩略图交互状态

##### CSS 样式系统
```css
.thumbnail-swiper .swiper-slide {
  opacity: 0.7;                    /* 非活动状态透明度 */
  transition: opacity 0.3s ease;
}

.thumbnail-swiper .swiper-slide-thumb-active {
  opacity: 1;                      /* 活动状态完全不透明 */
}

.thumbnail-swiper .swiper-slide-thumb-active .thumbnail-border {
  border: 1px solid #35530e !important;  /* 活动状态边框 */
}

.thumbnail-swiper .swiper-slide:not(.swiper-slide-thumb-active) .thumbnail-overlay {
  opacity: 1;                      /* 非活动状态遮罩显示 */
}
```

##### 交互状态说明
- **默认状态**: 70% 透明度，无边框
- **活动状态**: 100% 透明度，绿色边框
- **非活动遮罩**: 40% 黑色遮罩覆盖

## 🖼️ 图片优化系统

### 1. 主图优化
```typescript
<Image
  src={img}
  alt={`${productName} - Image ${index + 1}`}
  width={600}
  height={450}
  className="w-full h-full object-cover"
  priority={index === 0}        // 首张图片优先加载
/>
```

### 2. 缩略图优化
```typescript
<Image
  src={img}
  alt={`${productName} thumbnail ${index + 1}`}
  width={120}
  height={90}
  className="w-full h-full object-cover"
/>
```

### 3. 优化特性
- **优先加载**: 首张主图设置 priority={true}
- **合理尺寸**: 主图 600x450，缩略图 120x90
- **响应式**: object-cover 确保图片比例
- **语义化 alt**: 包含产品名称和图片序号

## ♿ 无障碍设计

### 1. ARIA 支持
```typescript
<Swiper
  a11y={{
    prevSlideMessage: 'Previous image',
    nextSlideMessage: 'Next image',
  }}
>
```

### 2. 语义化标签
- **导航按钮**: aria-label 描述按钮功能
- **图片**: 描述性 alt 文本
- **滑动消息**: 屏幕阅读器提示

### 3. 键盘导航
- 支持键盘控制图片切换
- Tab 键焦点管理
- 空格键和回车键操作

## 📱 响应式设计

### 1. 断点适配
```css
/* 主图比例 */
.aspect-square              /* 移动端 1:1 */
.lg:aspect-[4/3]           /* 桌面端 4:3 */

/* 最大宽度 */
.lg:max-w-[600px]          /* 桌面端最大宽度限制 */
```

### 2. 缩略图适配
- **显示数量**: 固定显示 3 个缩略图
- **比例统一**: 始终使用 4:3 比例
- **边框适配**: 响应式边框样式

### 3. 导航按钮适配
- **移动端**: 保持显示，便于触控操作
- **桌面端**: 悬停显示，保持界面简洁

## 🚀 性能优化

### 1. React.memo 优化
```typescript
// 使用 memo 优化性能
export default memo(ProductImageGallery);
```

### 2. 图片加载优化
- **首图优先**: priority={true} 优先加载
- **懒加载**: 非首图自动懒加载
- **尺寸控制**: 合理的图片尺寸设置

### 3. 事件优化
```typescript
// 使用 setTimeout 优化缩略图滑动时机
setTimeout(() => {
  // 滑动逻辑
}, 100);
```

## 🎯 使用场景

### 1. 产品详情页
```typescript
// 在产品详情页中使用
const ProductDetailPage = () => {
  const productImages = [product.image, ...(product.gallery || [])];

  return (
    <div className="lg:grid lg:grid-cols-[600px_1fr] flex flex-col lg:gap-10">
      <ProductImageGallery
        images={productImages}
        productName={product.title || product.model}
        className="w-full"
      />
      {/* 其他产品信息 */}
    </div>
  );
};
```

### 2. 错误处理
```typescript
function ProductImageGallery({ images, productName, className = "" }) {
  // 空数组或无效数据处理
  if (!images || images.length === 0) {
    return null;
  }

  // 单张图片处理
  if (images.length === 1) {
    return (
      <div className={className}>
        <Image src={images[0]} alt={productName} />
      </div>
    );
  }

  // 多张图片正常渲染
  return (
    // 完整的画廊组件
  );
}
```

## 🔧 自定义配置

### 1. Swiper 配置自定义
```typescript
// 可以通过 props 传递 Swiper 配置
interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
  swiperOptions?: {
    speed?: number;
    autoplay?: boolean;
    loop?: boolean;
  };
}
```

### 2. 缩略图数量自定义
```typescript
// 支持自定义缩略图显示数量
interface ProductImageGalleryProps {
  thumbnailsPerView?: number;  // 默认 3
}

<Swiper
  slidesPerView={thumbnailsPerView || 3}
>
```

### 3. 主题样式自定义
```typescript
// 支持主题色自定义
interface ProductImageGalleryProps {
  theme?: {
    activeColor?: string;
    borderColor?: string;
    overlayColor?: string;
  };
}
```

## 🧪 测试建议

### 1. 功能测试
```typescript
describe('ProductImageGallery', () => {
  it('renders all images correctly', () => {
    const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];
    render(<ProductImageGallery images={images} productName="Test Product" />);
    
    expect(screen.getAllByRole('img')).toHaveLength(images.length * 2); // 主图 + 缩略图
  });

  it('handles empty images array', () => {
    render(<ProductImageGallery images={[]} productName="Test Product" />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
```

### 2. 交互测试
```typescript
it('switches main image when thumbnail is clicked', () => {
  const images = ['/img1.jpg', '/img2.jpg'];
  render(<ProductImageGallery images={images} productName="Test Product" />);
  
  const thumbnails = screen.getAllByRole('button');
  fireEvent.click(thumbnails[1]);
  
  // 验证主图切换
});
```

### 3. 无障碍测试
```typescript
it('provides proper accessibility labels', () => {
  render(<ProductImageGallery images={['/img1.jpg']} productName="Test Product" />);
  
  expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
  expect(screen.getByLabelText('Next image')).toBeInTheDocument();
});
```

## 📚 最佳实践

### 1. 图片准备
- **统一比例**: 主图建议 4:3 比例，缩略图保持一致
- **优化尺寸**: 主图 1200x900px，缩略图 240x180px
- **格式选择**: 使用 WebP 或 AVIF 格式提高加载速度
- **CDN 部署**: 使用 CDN 加速图片加载

### 2. 数据处理
```typescript
// 图片数据预处理
const processProductImages = (product: Product): string[] => {
  const images = [product.image];
  
  if (product.gallery && product.gallery.length > 0) {
    images.push(...product.gallery);
  }
  
  // 过滤无效图片
  return images.filter(img => img && img.trim() !== '');
};
```

### 3. 错误边界
```typescript
// 使用 ErrorBoundary 包装组件
<ErrorBoundary fallback={<div>Image gallery failed to load</div>}>
  <ProductImageGallery
    images={productImages}
    productName={productName}
  />
</ErrorBoundary>
```

---

*文档版本: v1.0*
*最后更新: 2025-09-04*
*维护者: Claude Code*