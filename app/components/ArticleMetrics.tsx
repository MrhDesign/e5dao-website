'use client';

import React, { useMemo } from 'react';

interface ArticleMetricsProps {
  content: string;
  className?: string;
}

export default function ArticleMetrics({ content, className = '' }: ArticleMetricsProps) {
  const metrics = useMemo(() => {
    // 移除HTML标签
    const plainText = content.replace(/<[^>]*>/g, '');
    
    // 字符数统计
    const charCount = plainText.length;
    
    // 词数统计（英文）
    const wordCount = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // 段落数统计
    const paragraphCount = (content.match(/<p[^>]*>/g) || []).length;
    
    // 图片数统计
    const imageCount = (content.match(/<img[^>]*>/g) || []).length;
    
    // 表格数统计
    const tableCount = (content.match(/<table[^>]*>/g) || []).length;
    
    // 代码块数统计
    const codeBlockCount = (content.match(/<pre[^>]*>/g) || []).length;
    
    // 阅读时间估算（基于每分钟250个单词）
    const readingTime = Math.ceil(wordCount / 250);
    
    return {
      charCount,
      wordCount,
      paragraphCount,
      imageCount,
      tableCount,
      codeBlockCount,
      readingTime
    };
  }, [content]);

  return (
    <div className={`article-metrics ${className}`}>
      <div className="metrics-grid grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="metric-item text-center">
          <div className="metric-value text-2xl font-bold text-blue-600">
            {metrics.readingTime}
          </div>
          <div className="metric-label text-xs text-gray-600 uppercase tracking-wide">
            Min Read
          </div>
        </div>
        
        <div className="metric-item text-center">
          <div className="metric-value text-2xl font-bold text-green-600">
            {metrics.wordCount.toLocaleString()}
          </div>
          <div className="metric-label text-xs text-gray-600 uppercase tracking-wide">
            Words
          </div>
        </div>
        
        <div className="metric-item text-center">
          <div className="metric-value text-2xl font-bold text-purple-600">
            {metrics.imageCount}
          </div>
          <div className="metric-label text-xs text-gray-600 uppercase tracking-wide">
            Images
          </div>
        </div>
        
        <div className="metric-item text-center">
          <div className="metric-value text-2xl font-bold text-orange-600">
            {metrics.paragraphCount}
          </div>
          <div className="metric-label text-xs text-gray-600 uppercase tracking-wide">
            Paragraphs
          </div>
        </div>
      </div>
      
      {(metrics.tableCount > 0 || metrics.codeBlockCount > 0) && (
        <div className="additional-metrics mt-4 flex justify-center gap-6 text-sm text-gray-600">
          {metrics.tableCount > 0 && (
            <span>📊 {metrics.tableCount} Table{metrics.tableCount > 1 ? 's' : ''}</span>
          )}
          {metrics.codeBlockCount > 0 && (
            <span>💻 {metrics.codeBlockCount} Code Block{metrics.codeBlockCount > 1 ? 's' : ''}</span>
          )}
        </div>
      )}
    </div>
  );
}