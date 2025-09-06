'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface RichContentRendererProps {
  content: string;
  className?: string;
  enhanceContent?: boolean; // 是否启用内容增强
  generateTOC?: boolean;    // 是否生成目录
  onTOCGenerated?: (toc: TOCItem[]) => void;
}

interface TOCItem {
  id: string;
  level: number;
  title: string;
  anchor: string;
}

export default function RichContentRenderer({
  content,
  className = '',
  enhanceContent = true,
  generateTOC = false,
  onTOCGenerated
}: RichContentRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 安全清理HTML内容并预处理表格
  const sanitizedContent = useMemo(() => {
    let cleanContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'div', 'span',
        'strong', 'b', 'em', 'i', 'u', 'del', 's',
        'ul', 'ol', 'li',
        'blockquote',
        'pre', 'code',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'img',
        'a',
        'hr'
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel',
        'src', 'alt', 'width', 'height', 'style',
        'class', 'id',
        'colspan', 'rowspan'
      ],
      ALLOW_DATA_ATTR: false
    });
    
    // 预处理：将表格包装在响应式容器中
    if (enhanceContent) {
      cleanContent = cleanContent.replace(
        /<table(.*?)>([\s\S]*?)<\/table>/gi,
        '<div class="responsive-table-wrapper"><table$1>$2</table></div>'
      );
    }
    
    return cleanContent;
  }, [content, enhanceContent]);
  
  // 内容增强处理
  useEffect(() => {
    if (!containerRef.current || !enhanceContent) return;
    
    const container = containerRef.current;
    
    // 使用 setTimeout 确保 DOM 已经完全渲染
    const timeoutId = setTimeout(() => {
      const tasks: Promise<void>[] = [];
      
      // 1. 代码块高亮增强
      tasks.push(enhanceCodeBlocks(container));
      
      // 2. 图片处理增强
      tasks.push(enhanceImages(container));
      
      // 3. 表格响应式处理
      tasks.push(enhanceTables(container));
      
      // 4. 外链安全处理
      tasks.push(enhanceLinks(container));
      
      // 5. 标题锚点生成
      tasks.push(enhanceHeadings(container));
      
      // 6. 生成目录
      if (generateTOC) {
        tasks.push(generateTableOfContents(container, onTOCGenerated));
      }
      
      Promise.all(tasks).catch(console.error);
    }, 0);
    
    // 清理函数
    return () => clearTimeout(timeoutId);
  }, [sanitizedContent, enhanceContent, generateTOC, onTOCGenerated]);
  
  return (
    <div 
      ref={containerRef}
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}

// 代码块增强函数
async function enhanceCodeBlocks(container: HTMLElement): Promise<void> {
  const codeBlocks = container.querySelectorAll('pre code');
  
  codeBlocks.forEach((codeElement) => {
    const code = codeElement.textContent || '';
    const language = codeElement.className.match(/language-(\w+)/)?.[1] || 'text';
    
    // 创建增强的代码块容器
    const enhancedWrapper = document.createElement('div');
    enhancedWrapper.className = 'enhanced-code-block';
    
    // 添加语言标签
    const languageLabel = document.createElement('div');
    languageLabel.className = 'code-language-label';
    languageLabel.textContent = language.toUpperCase();
    enhancedWrapper.appendChild(languageLabel);
    
    // 添加复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"/>
      </svg>
      Copy
    `;
    
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code);
        copyButton.innerHTML = '✓ Copied';
        setTimeout(() => {
          copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"/>
            </svg>
            Copy
          `;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    });
    
    enhancedWrapper.appendChild(copyButton);
    
    // 创建高亮的代码容器
    const highlightedPre = document.createElement('pre');
    highlightedPre.className = 'highlighted-code';
    highlightedPre.innerHTML = `<code class="language-${language}">${code}</code>`;
    
    enhancedWrapper.appendChild(highlightedPre);
    
    // 替换原始代码块
    codeElement.parentElement?.replaceWith(enhancedWrapper);
  });
}

// 图片增强函数
async function enhanceImages(container: HTMLElement): Promise<void> {
  const images = container.querySelectorAll('img');
  
  images.forEach((img, index) => {
    // 检查图片是否已经被增强过
    if (img.parentNode && (img.parentNode as HTMLElement).classList?.contains('enhanced-image-wrapper')) {
      return;
    }
    
    // 创建图片容器
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'enhanced-image-wrapper';
    
    // 图片懒加载
    img.loading = 'lazy';
    
    // 添加点击放大功能
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      openImageModal(img.src, img.alt || '');
    });
    
    // 包装原始图片
    const parentNode = img.parentNode;
    if (parentNode) {
      parentNode.insertBefore(imageWrapper, img);
      imageWrapper.appendChild(img);
      
      // 添加图片标题（如果alt存在）- 在图片后面添加
      if (img.alt && img.alt.trim()) {
        const caption = document.createElement('p');
        caption.className = 'image-caption';
        caption.textContent = img.alt;
        imageWrapper.appendChild(caption);
      }
    }
  });
}

// 表格增强函数 - 现在只处理滚动提示
async function enhanceTables(container: HTMLElement): Promise<void> {
  const tableWrappers = container.querySelectorAll('.responsive-table-wrapper');
  
  tableWrappers.forEach((wrapper) => {
    const table = wrapper.querySelector('table');
    if (!table) return;
    
    // 使用短延迟确保CSS加载完成
    setTimeout(() => {
      const tableWidth = table.scrollWidth;
      const wrapperWidth = wrapper.clientWidth;
      
      // 检查是否需要滚动提示
      if (tableWidth > wrapperWidth) {
        // 检查是否已经有滚动提示
        if (!wrapper.querySelector('.table-scroll-hint')) {
          const scrollHint = document.createElement('div');
          scrollHint.className = 'table-scroll-hint';
          scrollHint.textContent = '← Scroll to see more →';
          wrapper.appendChild(scrollHint);
        }
      }
    }, 100);
  });
}

// 链接增强函数
async function enhanceLinks(container: HTMLElement): Promise<void> {
  const links = container.querySelectorAll('a');
  
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // 外部链接处理
    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer nofollow');
      
      // 添加外部链接图标
      const icon = document.createElement('span');
      icon.className = 'external-link-icon';
      icon.innerHTML = '↗';
      link.appendChild(icon);
    }
    
    // 内部链接处理
    else if (href.startsWith('/')) {
      link.className = 'internal-link';
    }
  });
}

// 标题锚点生成函数
async function enhanceHeadings(container: HTMLElement): Promise<void> {
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  headings.forEach((heading) => {
    const text = heading.textContent || '';
    const id = generateSlug(text);
    heading.id = id;
    
    // 添加锚点链接
    const anchor = document.createElement('a');
    anchor.href = `#${id}`;
    anchor.className = 'heading-anchor';
    anchor.setAttribute('aria-label', `Link to ${text}`);
    anchor.innerHTML = '#';
    
    heading.appendChild(anchor);
  });
}

// 目录生成函数
async function generateTableOfContents(
  container: HTMLElement, 
  onTOCGenerated?: (toc: TOCItem[]) => void
): Promise<void> {
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const toc: TOCItem[] = [];
  
  headings.forEach((heading, index) => {
    const text = heading.textContent || '';
    const level = parseInt(heading.tagName.charAt(1));
    const id = heading.id || generateSlug(text);
    
    if (!heading.id) {
      heading.id = id;
    }
    
    toc.push({
      id: `toc-${index}`,
      level,
      title: text,
      anchor: id
    });
  });
  
  onTOCGenerated?.(toc);
}

// 辅助函数
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 50);
}

// 图片模态框函数
function openImageModal(src: string, alt: string): void {
  const modal = document.createElement('div');
  modal.className = 'image-modal-overlay';
  modal.innerHTML = `
    <div class="image-modal">
      <button class="image-modal-close">&times;</button>
      <img src="${src}" alt="${alt}" class="image-modal-content">
      ${alt ? `<p class="image-modal-caption">${alt}</p>` : ''}
    </div>
  `;
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
    }
  });
  
  modal.querySelector('.image-modal-close')?.addEventListener('click', () => {
    document.body.removeChild(modal);
    document.body.style.overflow = '';
  });
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

export type { TOCItem };