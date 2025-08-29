'use client';

import NewCard from '../components/NewCard';
import useContent from '../../lib/useContent';
import Button from '../components/Button';

export default function News() {
  const { getContent } = useContent();
  
  // 获取新闻数据，新闻页面显示8个
  const allNewsData: any[] = getContent('news.items') || [];
  const newsData = allNewsData.slice(0, 8);

  return (
    <section className='px-30 pb-20 bg-fill-two lg:process-section'>
      <div className='flex justify-between items-center'>
        <h1 className="text-[100px] italic font-black py-20 lg:text-left">Media Releases</h1>
        <Button className='relative'>{getContent('home.hero.button')}</Button>
      </div>
      <div className="grid grid-cols-1 lg:gap-x-5">
        {newsData.map((news) => (
          <NewCard
            key={news.id}
            image={news.image}
            alt={news.alt}
            year={news.year}
            date={news.date}
            title={news.title}
            description={news.description}
            slug={news.slug}
            className="news-card"
          />
        ))}
      </div>
      <div className='flex justify-between items-center'>
        <h1 className="text-[100px] italic font-black py-20 lg:text-left">Industry Applications</h1>
        <Button className='relative'>{getContent('home.hero.button')}</Button>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-5">
        {newsData.map((news) => (
          <NewCard
            key={news.id}
            image={news.image}
            alt={news.alt}
            year={news.year}
            date={news.date}
            title={news.title}
            description={news.description}
            slug={news.slug}
            className="news-card"
          />
        ))}
      </div>
    </section>
  );
}