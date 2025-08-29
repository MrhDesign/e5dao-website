'use client';

import { useState, useEffect } from 'react';
import IndustryCard from './IndustryCard';
import MobileIndustryCard from './MobileIndustryCard';

interface Industry {
  id: number;
  title: string;
  subtitle: string; // 改为必需属性
  backgroundImage: string;
}

interface IndustrySectionProps {
  industries: Industry[];
}

export default function IndustrySection({ industries }: IndustrySectionProps) {
  const [selectedId, setSelectedId] = useState<number>(1); // 默认选中第一个
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);

  // 自动轮循效果
  useEffect(() => {
    if (isUserInteracting) return; // 如果用户正在交互，暂停自动轮循

    const interval = setInterval(() => {
      setSelectedId(prev => {
        const currentIndex = industries.findIndex(industry => industry.id === prev);
        const nextIndex = (currentIndex + 1) % industries.length;
        return industries[nextIndex].id;
      });
    }, 3000); // 每3秒切换一次

    return () => clearInterval(interval);
  }, [industries, isUserInteracting]);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
    setIsUserInteracting(true);
    
    // 用户交互后5秒恢复自动轮循
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  const handleMouseEnter = () => {
    setIsUserInteracting(true);
  };

  const handleMouseLeave = () => {
    // 鼠标离开后2秒恢复自动轮循
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      {/* 桌面端：交互式组件 */}
      <div className="hidden lg:block">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {industries.map((industry) => (
            <IndustryCard
              key={industry.id}
              id={industry.id}
              title={industry.title}
              subtitle={industry.subtitle}
              backgroundImage={industry.backgroundImage}
              isSelected={selectedId === industry.id}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {/* 移动端：简化组件 */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 gap-4">
          {industries.map((industry) => (
            <MobileIndustryCard
              key={industry.id}
              id={industry.id}
              title={industry.title}
              subtitle={industry.subtitle}
              backgroundImage={industry.backgroundImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}