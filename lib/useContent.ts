import { useMemo } from 'react';
import contentData from './content.json';

type ContentPath = string[];

export const useContent = () => {
  const getContent = useMemo(() => {
    return (path: string): string => {
      const keys = path.split('.');
      let result: any = contentData.pages;
      
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          console.warn(`Content path not found: ${path}`);
          return path; // 返回路径作为fallback
        }
      }
      
      return typeof result === 'string' ? result : path;
    };
  }, []);

  return { getContent };
};

export default useContent;