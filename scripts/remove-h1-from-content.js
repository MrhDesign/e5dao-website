// 删除新闻内容中的H1标题脚本
const fs = require('fs');
const path = require('path');

// 读取现有的content.json
const contentPath = path.join(__dirname, '../lib/content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

console.log('🔧 开始删除内容中的H1标题...');

// 处理函数：删除HTML内容中的H1标签
function removeH1FromHtml(htmlContent) {
  if (!htmlContent) return htmlContent;
  
  // 删除H1标签及其内容
  return htmlContent.replace(/<h1>.*?<\/h1>/g, '').trim();
}

// 处理新闻文章
let articlesProcessed = 0;
content.pages.news.articles.forEach((article, index) => {
  const originalContent = article.description;
  const cleanedContent = removeH1FromHtml(originalContent);
  
  if (originalContent !== cleanedContent) {
    article.description = cleanedContent;
    articlesProcessed++;
    console.log(`✅ 已处理文章 ${index + 1}: ${article.title}`);
  }
});

// 处理行业应用案例
let applicationsProcessed = 0;
content.pages.news.applications.forEach((app, index) => {
  const originalContent = app.description;
  const cleanedContent = removeH1FromHtml(originalContent);
  
  if (originalContent !== cleanedContent) {
    app.description = cleanedContent;
    applicationsProcessed++;
    console.log(`✅ 已处理应用 ${index + 1}: ${app.title}`);
  }
});

console.log(`\n📊 处理结果统计:`);
console.log(`   - 新闻文章: 处理了 ${articlesProcessed} 篇`);
console.log(`   - 行业应用: 处理了 ${applicationsProcessed} 个`);

// 保存清理后的数据
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8');

console.log(`\n💾 数据已保存到 ${contentPath}`);
console.log(`🎉 H1标题删除完成！`);

// 验证JSON格式
try {
  JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  console.log('✅ JSON格式验证通过');
} catch (error) {
  console.error('❌ JSON格式验证失败:', error.message);
}

// 显示处理后的内容示例（第一篇文章的前100字符）
if (content.pages.news.articles.length > 0) {
  const firstArticle = content.pages.news.articles[0];
  console.log(`\n📝 处理后内容示例 (${firstArticle.title}):`);
  console.log(`   "${firstArticle.description.substring(0, 100)}..."`);
}