'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export default function ProductImageGallery({ 
  images, 
  productName, 
  className = "" 
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  
  // 处理缩略图点击 - 简单的移动效果
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    
    // 如果图片总数少于等于3张，不需要滑动
    if (images.length <= 3) return;
    
    // 计算当前可见的缩略图索引
    const currentVisibleIndices = [];
    for (let i = 0; i < 3; i++) {
      currentVisibleIndices.push((thumbnailStartIndex + i) % images.length);
    }
    
    const clickedPosition = currentVisibleIndices.indexOf(index);
    
    // 点击移动逻辑：
    if (clickedPosition === 2) {
      // 点击右边的缩略图，向左滑动
      slideThumbnailNext();
    } else if (clickedPosition === 0) {
      // 点击左边的缩略图，向右滑动  
      slideThumbnailPrev();
    }
    // 点击中间的缩略图，不滑动
  };

  // 简单的移动逻辑 - 有边界限制
  const slideThumbnailNext = () => {
    if (images.length <= 3) return;
    setThumbnailStartIndex(prev => Math.min(prev + 1, images.length - 3));
  };

  const slideThumbnailPrev = () => {
    if (images.length <= 3) return;
    setThumbnailStartIndex(prev => Math.max(prev - 1, 0));
  };


  // 左右滑动控制 - 有边界限制
  const slidePrev = () => {
    setSelectedImageIndex(prev => Math.max(prev - 1, 0));
  };

  const slideNext = () => {
    setSelectedImageIndex(prev => Math.min(prev + 1, images.length - 1));
  };

  // 基于边界的按钮显示逻辑
  const canSlidePrev = selectedImageIndex > 0;
  const canSlideNext = selectedImageIndex < images.length - 1;


  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {/* 主图显示 */}
      <div className="relative aspect-[4/3] bg-fill-white overflow-hidden max-w-[600px] group border border-border-one border-b-0">
        <Image
          src={images[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          width={600}
          height={450}
          className="w-full h-full object-cover"
          priority={selectedImageIndex === 0}
        />
        
        {/* 主图上的左滑动按钮 */}
        <button
          onClick={slidePrev}
          disabled={!canSlidePrev}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-12 backdrop-blur-sm rounded-sm shadow-lg border border-border-one flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            canSlidePrev
              ? 'bg-fill-white/90 hover:bg-fill-white hover:scale-110 cursor-pointer'
              : 'bg-fill-white/50 cursor-not-allowed'
          }`}
          aria-label="Previous image"
        >
          <svg className={`w-5 h-5 ${canSlidePrev ? 'text-text-black' : 'text-text-black/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 主图上的右滑动按钮 */}
        <button
          onClick={slideNext}
          disabled={!canSlideNext}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-12 backdrop-blur-sm rounded-sm shadow-lg border border-border-one flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            canSlideNext
              ? 'bg-fill-white/90 hover:bg-fill-white hover:scale-110 cursor-pointer'
              : 'bg-fill-white/50 cursor-not-allowed'
          }`}
          aria-label="Next image"
        >
          <svg className={`w-5 h-5 ${canSlideNext ? 'text-text-black' : 'text-text-black/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* 缩略图列表 */}
      {images.length > 1 && (
        <div className="relative">
          <div className="overflow-hidden border border-border-one bg-border-one">
            <div 
              ref={thumbnailContainerRef}
              className="flex transition-transform duration-500 ease-out "
              style={{
                // 简单的百分比偏移
                transform: `translateX(-${(thumbnailStartIndex * 100) / 3}%)`
              }}
            >
              {/* 普通数组，不需要循环 */}
              {images.map((img, i) => {
                return (
                  <button
                    key={`thumb-${i}`}
                    onClick={() => handleThumbnailClick(i)}
                    className="flex-none w-1/3 group/thumb transition-all duration-300"
                    aria-label={`View image ${i + 1}`}
                  >
                    <div className={`relative aspect-[4/3] overflow-hidden transition-all duration-300 bg-fill-white ${
                      selectedImageIndex === i 
                        ? 'border-1 border-fill-brand' 
                        : 'border border-transparent'
                    }`}>
                      <Image
                        src={img}
                        alt={`${productName} thumbnail ${i + 1}`}
                        width={120}
                        height={90}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* 未选中状态的遮罩 */}
                      {selectedImageIndex !== i && (
                        <div className="absolute inset-0 bg-fill-black/10"></div>
                      )}
                      
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}