import { useMemo } from 'react';
import contentData from './content.json';

type ContentPath = string[];

export const useContent = () => {
  const getContent = useMemo(() => {
    return (path: string): any => {
      const keys = path.split('.');
      let result: any = contentData.pages;
      
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          console.warn(`Content path not found: ${path}`);
          return typeof result === 'string' ? path : null; // 返回null作为fallback
        }
      }
      
      return result;
    };
  }, []);

  return { getContent };
};

export default useContent;