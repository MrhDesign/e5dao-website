// Markdown 到行业应用案例转换脚本
const fs = require('fs');
const path = require('path');

// 简单的 Markdown 到 HTML 转换函数（保留图片）
function markdownToHtml(markdown) {
  let html = markdown
    // 处理图片 - 保留并转换为 HTML img 标签
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')
    
    // 处理标题
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# \*\*(.*)\*\*$/gm, '<h1>$1</h1>')
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
    .trim()
    .substring(0, 50);
}

// 处理单篇 Markdown 文档
function processApplicationMarkdown(filePath, id, baseDate) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  // 提取标题 - 处理可能的粗体格式
  let title = lines[0].replace(/^# /, '').replace(/\*\*(.*?)\*\*/g, '$1').trim();
  
  const htmlContent = markdownToHtml(content);
  const slug = generateSlug(title);
  
  // 根据文件名确定图片
  const imageMap = {
    'Carbon_Fiber_Command_Post': '/images/news/applications/application-1.png',
    'Carbon_Fiber_Disaster_Command_Post': '/images/news/applications/application-2.png', 
    'Carbon_Fiber_Emergency_Module': '/images/news/applications/application-3.png',
    'Maritime_Mobile_ICU_Kit': '/images/news/applications/application-4.png'
  };
  
  const fileName = path.basename(filePath, '.markdown');
  const image = imageMap[fileName] || '/images/news/applications/application-1.png';
  
  // 计算发布日期（每篇应用间隔一天，从更早的日期开始）
  const publishDate = new Date(baseDate);
  publishDate.setDate(publishDate.getDate() - (id - 21)); // 从ID 21开始，比新闻更早
  
  return {
    id,
    slug,
    image,
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
function processAllApplicationMarkdowns() {
  const mdDir = path.join(__dirname, '../news-md');
  const applicationFiles = [
    'Carbon_Fiber_Command_Post.markdown',
    'Carbon_Fiber_Disaster_Command_Post.markdown',
    'Carbon_Fiber_Emergency_Module.markdown',
    'Maritime_Mobile_ICU_Kit.markdown'
  ];
  
  const baseDate = new Date('2025-08-30'); // 应用案例的基础日期
  const applications = [];
  
  applicationFiles.forEach((file, index) => {
    const filePath = path.join(mdDir, file);
    if (fs.existsSync(filePath)) {
      const application = processApplicationMarkdown(filePath, 21 + index, baseDate);
      applications.push(application);
      console.log(`✅ 处理完成: ${application.title}`);
    }
  });
  
  return applications;
}

// 执行转换
const newApplications = processAllApplicationMarkdowns();
console.log('\n📰 转换完成的行业应用案例:');
newApplications.forEach((app, index) => {
  console.log(`${index + 1}. ${app.title}`);
  console.log(`   Slug: ${app.slug}`);
  console.log(`   发布日期: ${app.publishedDate.year}-${app.publishedDate.month}-${app.publishedDate.day}`);
  console.log('');
});

// 输出 JSON 格式供复制
console.log('\n📋 请将以下 JSON 数据添加到 content.json 的 news.applications 数组中:');
console.log(JSON.stringify(newApplications, null, 2));

module.exports = { processAllApplicationMarkdowns, newApplications };