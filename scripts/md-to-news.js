// Markdown 到新闻格式转换脚本
const fs = require('fs');
const path = require('path');

// 简单的 Markdown 到 HTML 转换函数
function markdownToHtml(markdown) {
  let html = markdown
    // 处理标题
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    
    // 处理列表
    .replace(/^\- \*\*(.*?)\*\*: (.*$)/gm, '<li><strong>$1</strong>: $2</li>')
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    
    // 处理段落 - 先处理列表项，然后处理普通段落
    .replace(/(<li>.*<\/li>\s*)+/gs, (match) => {
      return '<ul>' + match + '</ul>';
    })
    
    // 处理加粗文本
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // 处理段落
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim();
      if (paragraph === '' || 
          paragraph.startsWith('<h') || 
          paragraph.startsWith('<ul>') ||
          paragraph.startsWith('<li>')) {
        return paragraph;
      }
      return '<p>' + paragraph + '</p>';
    })
    .join('\n\n');
  
  return html;
}

// 生成 URL slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// 提取文章描述（前150个字符）
function extractDescription(content) {
  return content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 200) + '...';
}

// 处理单篇 Markdown 文档
function processMarkdownFile(filePath, id, baseDate) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const title = lines[0].replace(/^# /, '').trim();
  
  const htmlContent = markdownToHtml(content);
  const description = extractDescription(content);
  const slug = generateSlug(title);
  
  // 计算发布日期（每篇文章间隔一天）
  const publishDate = new Date(baseDate);
  publishDate.setDate(publishDate.getDate() - (id - 25)); // 从ID 25开始
  
  return {
    id,
    slug,
    image: "/images/House.png",
    alt: title,
    publishedDate: {
      year: publishDate.getFullYear().toString(),
      month: (publishDate.getMonth() + 1).toString().padStart(2, '0'),
      day: publishDate.getDate().toString().padStart(2, '0')
    },
    title,
    description: htmlContent
  };
}

// 主处理函数
function processAllMarkdownFiles() {
  const mdDir = path.join(__dirname, '../news-md');
  const files = [
    'AirDrop_Boxes_Overview.markdown',
    'Carbon_Fiber_Aircraft_Manufacturing.markdown', 
    'Electromagnetic_Shielding_Overview.markdown',
    'Thermoplastic_Composites_Robotics.markdown'
  ];
  
  const baseDate = new Date('2025-09-10'); // 最新文章的日期
  const newsArticles = [];
  
  files.forEach((file, index) => {
    const filePath = path.join(mdDir, file);
    if (fs.existsSync(filePath)) {
      const article = processMarkdownFile(filePath, 25 + index, baseDate);
      newsArticles.push(article);
      console.log(`✅ 处理完成: ${article.title}`);
    }
  });
  
  return newsArticles;
}

// 执行转换
const newArticles = processAllMarkdownFiles();
console.log('\n📰 转换完成的新闻文章:');
newArticles.forEach((article, index) => {
  console.log(`${index + 1}. ${article.title}`);
  console.log(`   Slug: ${article.slug}`);
  console.log(`   发布日期: ${article.publishedDate.year}-${article.publishedDate.month}-${article.publishedDate.day}`);
  console.log('');
});

// 输出 JSON 格式供复制
console.log('\n📋 请将以下 JSON 数据添加到 content.json 的 news.articles 数组中:');
console.log(JSON.stringify(newArticles, null, 2));

module.exports = { processAllMarkdownFiles, newArticles };