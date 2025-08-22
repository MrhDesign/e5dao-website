import { useEffect } from 'react';

interface ScrollRevealConfig {
  delay?: number;
  distance?: string;
  duration?: number;
  easing?: string;
  interval?: number;
  opacity?: number;
  origin?: 'top' | 'right' | 'bottom' | 'left';
  rotate?: { x?: number; y?: number; z?: number };
  scale?: number;
  cleanup?: boolean;
  container?: string | HTMLElement;
  desktop?: boolean;
  mobile?: boolean;
  reset?: boolean;
  useDelay?: 'always' | 'once' | 'onload';
  viewFactor?: number;
  viewOffset?: { top?: number; right?: number; bottom?: number; left?: number };
  afterReveal?: (el: HTMLElement) => void;
  afterReset?: (el: HTMLElement) => void;
  beforeReveal?: (el: HTMLElement) => void;
  beforeReset?: (el: HTMLElement) => void;
}

const defaultConfig: ScrollRevealConfig = {
  delay: 200,
  distance: '20px',
  duration: 600,
  easing: 'ease-out',
  opacity: 0,
  origin: 'bottom',
  scale: 1,
  cleanup: false,
  desktop: true,
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor: 0.1,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }
};

export const useScrollReveal = (selector: string, config?: ScrollRevealConfig) => {
  useEffect(() => {
    // 确保在客户端环境中运行
    if (typeof window === 'undefined') return;

    // 动态导入ScrollReveal
    import('scrollreveal').then((ScrollRevealModule) => {
      const ScrollReveal = ScrollRevealModule.default;
      
      const sr = ScrollReveal({
        ...defaultConfig,
        ...config
      });

      // 应用动画到指定元素
      sr.reveal(selector, {
        ...defaultConfig,
        ...config
      });

      // 清理函数在组件卸载时执行
      return () => {
        if (config?.cleanup !== false) {
          sr.destroy();
        }
      };
    }).catch((error) => {
      console.error('Failed to load ScrollReveal:', error);
    });
  }, [selector, config]);
};

export const useScrollRevealMultiple = (reveals: Array<{ selector: string; config?: ScrollRevealConfig }>) => {
  useEffect(() => {
    // 确保在客户端环境中运行
    if (typeof window === 'undefined') return;

    // 动态导入ScrollReveal
    import('scrollreveal').then((ScrollRevealModule) => {
      const ScrollReveal = ScrollRevealModule.default;
      
      const sr = ScrollReveal();

      // 为每个元素应用动画配置
      reveals.forEach(({ selector, config }) => {
        sr.reveal(selector, {
          ...defaultConfig,
          ...config
        });
      });
    }).catch((error) => {
      console.error('Failed to load ScrollReveal:', error);
    });

    // 清理函数
    return () => {
      // 在清理时也需要动态导入来销毁实例
      import('scrollreveal').then((ScrollRevealModule) => {
        const ScrollReveal = ScrollRevealModule.default;
        const sr = ScrollReveal();
        sr.destroy();
      }).catch(() => {
        // 静默处理清理时的错误
      });
    };
  }, [reveals]);
};

export default useScrollReveal;