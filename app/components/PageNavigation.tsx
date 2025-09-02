'use client';

import { useCallback, useState, useEffect } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  targetId?: string;
}

interface PageNavigationProps {
  title?: string;
  items: NavigationItem[];
  headerHeight?: number;
  className?: string;
}

export default function PageNavigation({
  title = "ON THIS PAGE",
  items,
  headerHeight = 160,
  className = ""
}: PageNavigationProps) {
  const [activeId, setActiveId] = useState<string>('top');

  // 监听滚动位置，更新当前激活的导航项
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + headerHeight + 50; // 额外偏移量

      // 检查是否在页面顶部
      if (window.scrollY < 100) {
        setActiveId('top');
        return;
      }

      // 获取所有目标元素的位置
      const elementsWithPositions = items
        .filter(item => item.targetId)
        .map(item => {
          const element = document.getElementById(item.targetId!);
          return {
            id: item.id,
            position: element ? element.offsetTop : 0,
            element
          };
        })
        .filter(item => item.element)
        .sort((a, b) => a.position - b.position);

      // 找到当前应该激活的项
      let currentActiveId = 'top';
      
      for (let i = elementsWithPositions.length - 1; i >= 0; i--) {
        if (scrollPosition >= elementsWithPositions[i].position) {
          currentActiveId = elementsWithPositions[i].id;
          break;
        }
      }

      setActiveId(currentActiveId);
    };

    // 节流处理
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    handleScroll(); // 初始化

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [items, headerHeight]);
  
  // 滚动到页面顶部
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 滚动到指定元素
  const scrollToElement = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, [headerHeight]);

  // 处理导航项点击
  const handleItemClick = useCallback((item: NavigationItem) => {
    if (item.targetId) {
      scrollToElement(item.targetId);
    } else if (item.id === 'top') {
      scrollToTop();
    }
  }, [scrollToElement, scrollToTop]);

  return (
    <div className={`hidden lg:block pt-5 pb-10 space-y-5 sticky top-30 h-fit ${className}`}>
      <h4 className="text-base font-bold text-text-black">{title}</h4>
      <ul className="font-medium py-5 border-l-2 border-border-one space-y-5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`pl-5 cursor-pointer transition-all duration-200 relative ${
                isActive 
                  ? 'text-text-brand font-semibold' 
                  : 'text-text-black hover:text-text-brand'
              }`}
              onClick={() => handleItemClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleItemClick(item);
                }
              }}
            >
              {/* 选中状态的指示器 */}
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-text-brand transform -translate-x-0.5"></span>
              )}
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}