import { useMemo } from 'react';
import contentData from './content.json';
import type { UseContentReturn } from './types';

export const useContent = (): UseContentReturn => {
  const getContent = useMemo(() => {
    return <T = unknown>(path: string): T => {
      const keys = path.split('.');
      let result: unknown = (contentData as { pages: unknown }).pages;
      
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = (result as Record<string, unknown>)[key];
        } else {
          console.warn(`Content path not found: ${path}`);
          return (typeof result === 'string' ? path : null) as T;
        }
      }
      
      return result as T;
    };
  }, []);

  return { getContent };
};

export default useContent;