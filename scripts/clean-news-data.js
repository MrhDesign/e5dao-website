// 清理新闻数据脚本，只保留MD生成的内容
const fs = require('fs');
const path = require('path');

// 读取现有的content.json
const contentPath = path.join(__dirname, '../lib/content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

console.log('🧹 开始清理新闻数据...');

// 原有的articles数量
const originalArticlesCount = content.pages.news.articles.length;
const originalApplicationsCount = content.pages.news.applications.length;

console.log(`📊 原有数据统计:`);
console.log(`   - 新闻文章: ${originalArticlesCount} 篇`);
console.log(`   - 行业应用: ${originalApplicationsCount} 个`);

// 只保留ID 25-28的新闻文章（从MD生成）
content.pages.news.articles = content.pages.news.articles.filter(article => {
  return article.id >= 25 && article.id <= 28;
});

// 行业应用保持不变（ID 1-4，已经更新为MD生成的内容）

console.log(`\n✅ 清理完成:`);
console.log(`   - 保留新闻文章: ${content.pages.news.articles.length} 篇 (ID 25-28)`);
console.log(`   - 保留行业应用: ${content.pages.news.applications.length} 个 (ID 1-4)`);

console.log(`\n📝 保留的新闻文章:`);
content.pages.news.articles.forEach((article, index) => {
  console.log(`   ${index + 1}. [ID ${article.id}] ${article.title}`);
});

console.log(`\n🏭 保留的行业应用:`);
content.pages.news.applications.forEach((app, index) => {
  console.log(`   ${index + 1}. [ID ${app.id}] ${app.title}`);
});

// 保存清理后的数据
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8');

console.log(`\n💾 数据已保存到 ${contentPath}`);
console.log(`🎉 清理完成！删除了 ${originalArticlesCount - content.news.articles.length} 篇旧文章`);

// 验证JSON格式
try {
  JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  console.log('✅ JSON格式验证通过');
} catch (error) {
  console.error('❌ JSON格式验证失败:', error.message);
}