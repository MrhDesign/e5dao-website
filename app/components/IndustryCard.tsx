'use client';

import { useState, useCallback, useMemo } from 'react';

interface IndustryCardProps {
  id: number;
  title: string;
  subtitle: string; // 改为必需属性，因为内容总是要显示
  backgroundImage: string;
  isSelected?: boolean;
  onClick?: (id: number) => void;
}

export default function IndustryCard({ 
  id, 
  title, 
  subtitle, 
  backgroundImage, 
  isSelected = false, 
  onClick 
}: IndustryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    onClick?.(id);
  }, [onClick, id]);

  // 判断是否应该显示选中效果（选中状态或悬停状态）
  const showSelectedEffect = useMemo(() => isSelected || isHovered, [isSelected, isHovered]);

  return (
    <div
      className={`
        relative h-[640px] rounded-sm cursor-pointer transition-all duration-500 ease-out
        bg-cover bg-center bg-no-repeat
        ${showSelectedEffect ? '' : 'grayscale'}
        hover:transform
      `}
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 遮罩层 - 只覆盖底部1/3高度 */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0 h-1/3 transition-all duration-500 ease-out rounded-sm
          ${showSelectedEffect 
            ? 'bg-gradient-to-t from-lime-900/80 via-lime-900/30 to-transparent' 
            : 'bg-gradient-to-t from-black/60 via-black/0 to-transparent'
          }
        `}
      />
      
      {/* 内容区域 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white overflow-hidden">
        {/* 标题 - 始终显示 */}
        <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mb-2 line-clamp-2 transition-all duration-300">
          {title}
        </h3>
        {/* 内容 - 从底部向上生长动画 */}
        <div className={`
          transition-all duration-500 ease-out overflow-hidden
          ${showSelectedEffect ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <p className="text-xs lg:text-lg opacity-90 leading-relaxed line-clamp-3 transform transition-transform duration-500 ease-out">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}