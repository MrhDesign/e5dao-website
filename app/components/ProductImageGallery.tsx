'use client';

import React, { useState, useRef, memo } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// 导入 Swiper 样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

function ProductImageGallery({ 
  images, 
  productName, 
  className = "" 
}: ProductImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const [, setCurrentSlideIndex] = useState(0);

  // 处理缩略图点击时的智能滑动
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

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .thumbnail-swiper .swiper-slide {
            opacity: 0.7;
            transition: opacity 0.3s ease;
          }
          .thumbnail-swiper .swiper-slide-thumb-active {
            opacity: 1;
          }
          .thumbnail-swiper .swiper-slide-thumb-active .thumbnail-border {
            border: 1px solid #35530e !important;
          }
          .thumbnail-swiper .swiper-slide:not(.swiper-slide-thumb-active) .thumbnail-overlay {
            opacity: 1;
          }
        `
      }} />
      
      {/* 主图 Swiper */}
      <div className="relative aspect-[4/3]  overflow-hidden lg:max-w-[600px] group ">
        <Swiper
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setCurrentSlideIndex(swiper.activeIndex);
          }}
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
          a11y={{
            prevSlideMessage: 'Previous image',
            nextSlideMessage: 'Next image',
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`${productName} - Image ${index + 1}`}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* 自定义导航按钮 */}
        <button
          className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-12 backdrop-blur-sm rounded-sm shadow-lg border border-border-one flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-fill-white/90 hover:bg-fill-white hover:scale-110 cursor-pointer"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5 text-text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-12 backdrop-blur-sm rounded-sm shadow-lg border border-border-one flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-fill-white/90 hover:bg-fill-white hover:scale-110 cursor-pointer"
          aria-label="Next image"
        >
          <svg className="w-5 h-5 text-text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* 缩略图 Swiper */}
      {images.length > 1 && (
        <div className="border border-border-one">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Navigation, Thumbs]}
            spaceBetween={0}
            slidesPerView={3}
            watchSlidesProgress={true}
            className="thumbnail-swiper"
            speed={300}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="thumbnail-border relative aspect-[4/3] overflow-hidden transition-all duration-300 cursor-pointer border border-transparent"
                  onClick={() => {
                    // 首先切换主图
                    if (mainSwiperRef.current) {
                      mainSwiperRef.current.slideTo(index);
                    }
                    // 然后处理缩略图的智能滑动
                    handleThumbnailClick(index);
                  }}
                >
                  <Image
                    src={img}
                    alt={`${productName} thumbnail ${index + 1}`}
                    width={120}
                    height={90}
                    className="w-full h-full object-cover"
                  />
                  {/* 未选中状态的遮罩 */}
                  <div className="thumbnail-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

// 使用 memo 优化性能
export default memo(ProductImageGallery);