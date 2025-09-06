'use client';

import Image from 'next/image';
import Link from 'next/link';
import ViewCounter from './ViewCounter';

// 工具函数：去除HTML标签并限制文本长度
function stripHtmlTags(html: string, maxLength: number = 150): string {
  if (!html) return '';
  
  // 移除HTML标签
  const textContent = html.replace(/<[^>]*>/g, '');
  
  // 解码HTML实体
  const decodedText = textContent
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // 移除多余的空白字符
  const cleanText = decodedText.replace(/\s+/g, ' ').trim();
  
  // 限制长度并添加省略号
  if (cleanText.length > maxLength) {
    // 避免在单词中间截断
    const truncated = cleanText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.8) { // 如果最后一个空格距离不太远，就在那里截断
      return truncated.substring(0, lastSpace) + '...';
    }
    return truncated + '...';
  }
  
  return cleanText;
}

interface NewCardProps {
  image: string;
  alt?: string;
  year?: string;
  date?: string;
  title: string;
  description: string;
  className?: string;
  slug?: string;
  linkType?: 'news' | 'application'; // 新增：指定链接类型
}

const NewCard: React.FC<NewCardProps> = ({
  image,
  alt = '',
  year = '2025',
  date = 'June 11',
  title,
  description,
  className = '',
  slug,
  linkType = 'news' // 默认为新闻类型
}) => {
  // 处理描述文本，去除HTML标签
  const cleanDescription = stripHtmlTags(description, 120);
  const cardContent = (
    <>
      {/* web组件 */}
      <div className={`hidden p-5 lg:flex hover:bg-fill-three rounded-sm ${className}`}>
        {/* 左侧图片区域 */}
        <div className="flex border-r border-border-one">
          <div className='w-[180px]'>
            <Image
              src={image}
              alt={alt}
              width={800}
              height={548}
              className="object-contain  rounded-sm"
              priority
            />
          </div>

          {/* 日期信息 */}
          <div className="flex flex-col justify-center gap-5 px-5">
            <div className="text-2xl font-bold text-text-black ">
              {year}
            </div>
            <div className="text-xl text-text-display font-normal">
              {date}
            </div>
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 flex flex-col gap-2.5 pl-5">
          {/* 标题 */}
          <h2 className="headline2 line-clamp-1">
            {title}
          </h2>
          {/* 描述文本 */}
          <p className="text-display line-clamp-2">
            {cleanDescription}
          </p>
          {/* 浏览量 */}
          {slug && (
            <div className="mt-auto pt-2">
              <ViewCounter 
                slug={slug}
                className="text-gray-500 text-xs"
                autoIncrement={false}
              />
            </div>
          )}
        </div>
      </div>


      {/* mobile */}
      <div className='lg:hidden flex'>
        <div className='w-[140px]'>
          <Image
            src={image}
            alt={alt}
            width={800}
            height={548}
            className="object-contain  rounded-sm"
            priority
          />
        </div>
        <div className='flex-1 pl-5'>
          <h2 className="headline2 line-clamp-1">
            {title}
          </h2>

          <div className="flex gap-5 text-text-black text-xs">
            <div className=" ">
              {year}
            </div>
            <div className="  font-normal">
              {date}
            </div>
          </div>

          <p className="text-display line-clamp-2">
            {cleanDescription}
          </p>
          
          {/* 移动端浏览量 */}
          {slug && (
            <div className="mt-2">
              <ViewCounter 
                slug={slug}
                className="text-gray-500 text-xs"
                autoIncrement={false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (slug) {
    const linkPath = linkType === 'application' ? `/news/applications/${slug}` : `/news/articles/${slug}`;
    return <Link href={linkPath}>{cardContent}</Link>;
  }

  return cardContent;
};

export default NewCard;