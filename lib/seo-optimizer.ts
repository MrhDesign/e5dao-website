// SEO内容优化器，专门处理wangEditor内容的SEO优化

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  content: string;
  publishDate: string;
  modifiedDate: string;
  author: string;
  imageUrl?: string;
}

interface SEOAnalysisResult {
  readingTime: number;
  wordCount: number;
  headingStructure: HeadingInfo[];
  imageCount: number;
  linkCount: number;
  seoScore: number;
}

interface HeadingInfo {
  level: number;
  text: string;
  anchor: string;
}

export class SEOContentOptimizer {
  
  // 自动生成SEO友好的metadata
  generateOptimizedMetadata(data: SEOMetadata, baseUrl: string) {
    const plainTextContent = this.stripHtml(data.content);
    const readingTime = this.calculateReadingTime(plainTextContent);
    const wordCount = this.calculateWordCount(plainTextContent);
    
    return {
      title: `${data.title} | E5DAO Carbon Fiber Technology`,
      description: data.description.length > 160 
        ? data.description.substring(0, 157) + '...' 
        : data.description,
      keywords: data.keywords.join(', '),
      
      // Open Graph优化
      openGraph: {
        type: 'article',
        title: data.title,
        description: data.description,
        url: `${baseUrl}/news/articles/${this.generateSlug(data.title)}`,
        siteName: 'E5DAO',
        images: [
          {
            url: data.imageUrl || `${baseUrl}/images/default-og.png`,
            width: 1200,
            height: 630,
            alt: data.title,
          }
        ],
        publishedTime: data.publishDate,
        modifiedTime: data.modifiedDate,
        authors: [data.author],
        section: 'Technology',
        tags: data.keywords,
      },
      
      // Twitter Cards
      twitter: {
        card: 'summary_large_image',
        site: '@e5dao',
        creator: '@e5dao',
        title: data.title,
        description: data.description,
        images: [data.imageUrl || `${baseUrl}/images/default-twitter.png`],
      },
      
      // 其他SEO标签
      other: {
        'article:published_time': data.publishDate,
        'article:modified_time': data.modifiedDate,
        'article:author': data.author,
        'article:section': 'Technology',
        'article:tag': data.keywords.join(','),
        
        // 阅读时间和字数统计
        'twitter:label1': 'Reading time',
        'twitter:data1': `${readingTime} min`,
        'twitter:label2': 'Word count',
        'twitter:data2': `${wordCount} words`,
        
        // 搜索引擎指令
        'robots': 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
        
        // 内容分类
        'news_keywords': data.keywords.join(','),
        'article:content_tier': 'free',
        
        // 语言和地区
        'content-language': 'en-US',
        'geo.region': 'SG', // 新加坡
        'geo.placename': 'Singapore',
      },
      
      // 规范化URL
      alternates: {
        canonical: `${baseUrl}/news/articles/${this.generateSlug(data.title)}`,
      }
    };
  }
  
  // 生成结构化数据
  generateStructuredData(data: SEOMetadata, baseUrl: string) {
    const plainTextContent = this.stripHtml(data.content);
    const wordCount = this.calculateWordCount(plainTextContent);
    const readingTime = this.calculateReadingTime(plainTextContent);
    const articleUrl = `${baseUrl}/news/articles/${this.generateSlug(data.title)}`;
    
    return {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": data.title,
      "description": data.description,
      "image": {
        "@type": "ImageObject",
        "url": data.imageUrl || `${baseUrl}/images/default-article.png`,
        "width": 1200,
        "height": 630,
        "caption": data.title
      },
      "datePublished": data.publishDate,
      "dateModified": data.modifiedDate,
      "author": {
        "@type": "Organization",
        "name": data.author,
        "url": `${baseUrl}/about`,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 200,
          "height": 60
        },
        "sameAs": [
          "https://linkedin.com/company/e5dao",
          "https://twitter.com/e5dao"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "E5DAO",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 200,
          "height": 60
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "wordCount": wordCount,
      "timeRequired": `PT${readingTime}M`,
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "genre": ["Technology", "Materials Science", "Innovation"],
      "keywords": data.keywords.join(", "),
      
      // 技术文章特有属性
      "proficiencyLevel": "Intermediate",
      "dependencies": data.keywords.filter(k => 
        k.toLowerCase().includes('carbon') || 
        k.toLowerCase().includes('fiber') || 
        k.toLowerCase().includes('composite')
      ),
      
      // 面包屑导航
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "News",
            "item": `${baseUrl}/news`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Articles",
            "item": `${baseUrl}/news/articles`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": data.title
          }
        ]
      },
      
      // 评分和互动
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/ReadAction",
          "userInteractionCount": 0
        }
      ],
      
      // 相关主题
      "about": [
        {
          "@type": "Thing",
          "name": "Carbon Fiber",
          "sameAs": "https://en.wikipedia.org/wiki/Carbon_fiber"
        },
        {
          "@type": "Thing",
          "name": "Composite Materials",
          "sameAs": "https://en.wikipedia.org/wiki/Composite_material"
        }
      ]
    };
  }
  
  // 分析内容SEO质量
  analyzeContent(content: string): SEOAnalysisResult {
    const plainText = this.stripHtml(content);
    const headings = this.extractHeadingStructure(content);
    
    return {
      readingTime: this.calculateReadingTime(plainText),
      wordCount: this.calculateWordCount(plainText),
      headingStructure: headings,
      imageCount: (content.match(/<img[^>]*>/g) || []).length,
      linkCount: (content.match(/<a[^>]*>/g) || []).length,
      seoScore: this.calculateSEOScore(content, headings)
    };
  }
  
  // 生成文章摘要用于SEO
  generateSEOSummary(content: string, maxLength: number = 300): string {
    const plainText = this.stripHtml(content);
    const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 20);
    
    let summary = '';
    for (const sentence of sentences) {
      const newSummary = summary + (summary ? '. ' : '') + sentence.trim();
      if (newSummary.length > maxLength) break;
      summary = newSummary;
    }
    
    return summary || plainText.substring(0, maxLength);
  }
  
  // 自动提取关键词
  extractKeywords(content: string, maxKeywords: number = 10): string[] {
    const plainText = this.stripHtml(content).toLowerCase();
    
    // 常见的碳纤维相关术语
    const technicalTerms = [
      'carbon fiber', 'composite materials', 'kevlar', 'aerospace',
      'lightweight', 'high-strength', 'modular', 'manufacturing',
      'quality control', 'innovation', 'technology', 'materials science'
    ];
    
    const foundKeywords: string[] = [];
    
    // 查找技术术语
    technicalTerms.forEach(term => {
      if (plainText.includes(term)) {
        foundKeywords.push(term);
      }
    });
    
    // 基本词频分析（简化版）
    const words = plainText.split(/\s+/).filter(word => 
      word.length > 4 && 
      !this.isStopWord(word) &&
      !foundKeywords.includes(word)
    );
    
    const wordFreq: {[key: string]: number} = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // 按频率排序并取前N个
    const sortedWords = Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, maxKeywords - foundKeywords.length)
      .map(([word]) => word);
    
    return [...foundKeywords, ...sortedWords].slice(0, maxKeywords);
  }
  
  // 私有辅助方法
  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }
  
  private calculateReadingTime(text: string): number {
    const wordsPerMinute = 250;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
  
  private calculateWordCount(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }
  
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .substring(0, 50);
  }
  
  private extractHeadingStructure(html: string): HeadingInfo[] {
    const headingRegex = /<(h[1-6])[^>]*>([^<]+)<\/h[1-6]>/gi;
    const headings: HeadingInfo[] = [];
    let match;
    
    while ((match = headingRegex.exec(html)) !== null) {
      const level = parseInt(match[1].charAt(1));
      const text = match[2].trim();
      const anchor = this.generateSlug(text);
      
      headings.push({ level, text, anchor });
    }
    
    return headings;
  }
  
  private calculateSEOScore(content: string, headings: HeadingInfo[]): number {
    let score = 0;
    const maxScore = 100;
    
    const plainText = this.stripHtml(content);
    const wordCount = this.calculateWordCount(plainText);
    
    // 内容长度评分（30分）
    if (wordCount >= 500 && wordCount <= 2000) {
      score += 30;
    } else if (wordCount >= 300 && wordCount <= 3000) {
      score += 20;
    } else if (wordCount >= 100) {
      score += 10;
    }
    
    // 标题结构评分（25分）
    const hasH1 = headings.some(h => h.level === 1);
    const hasH2 = headings.some(h => h.level === 2);
    const headingCount = headings.length;
    
    if (hasH1) score += 10;
    if (hasH2) score += 10;
    if (headingCount >= 3) score += 5;
    
    // 图片数量评分（15分）
    const imageCount = (content.match(/<img[^>]*>/g) || []).length;
    if (imageCount >= 1 && imageCount <= 10) {
      score += 15;
    } else if (imageCount >= 1) {
      score += 10;
    }
    
    // 链接数量评分（15分）
    const linkCount = (content.match(/<a[^>]*>/g) || []).length;
    if (linkCount >= 1 && linkCount <= 5) {
      score += 15;
    } else if (linkCount >= 1) {
      score += 10;
    }
    
    // 列表和表格评分（15分）
    const hasLists = /<(ul|ol)[^>]*>/i.test(content);
    const hasTables = /<table[^>]*>/i.test(content);
    
    if (hasLists) score += 8;
    if (hasTables) score += 7;
    
    return Math.min(score, maxScore);
  }
  
  private isStopWord(word: string): boolean {
    const stopWords = [
      'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
      'by', 'this', 'that', 'these', 'those', 'a', 'an', 'is', 'are', 'was',
      'were', 'been', 'be', 'have', 'has', 'had', 'will', 'would', 'could',
      'should', 'may', 'might', 'can', 'shall', 'must', 'do', 'does', 'did',
      'get', 'got', 'make', 'made', 'take', 'took', 'come', 'came', 'go', 'went'
    ];
    return stopWords.includes(word.toLowerCase());
  }
}

export type { SEOMetadata, SEOAnalysisResult, HeadingInfo };