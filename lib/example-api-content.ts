// 示例：API方式获取内容
import { useState, useEffect } from 'react';

interface ContentResponse {
  [key: string]: unknown;
}

export const useApiContent = () => {
  const [content, setContent] = useState<ContentResponse>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content');
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const getContent = (path: string): string => {
    const keys = path.split('.');
    let result: unknown = content;
    
    for (const key of keys) {
      result = (result as Record<string, unknown>)?.[key];
    }
    
    return typeof result === 'string' ? result : path;
  };

  return { getContent, loading };
};