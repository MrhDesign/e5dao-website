'use client';

import NewCard from '../components/NewCard';
import useContent from '../../lib/useContent';
import Button from '../components/Button';
import Link from 'next/link';

export default function News() {
  const { getContent } = useContent();

  // 获取新闻数据，新闻页面显示8个
  const allNewsData: any[] = getContent('news.items') || [];
  const newsData = allNewsData.slice(0, 8);

  // 获取行业应用案例数据，显示6个
  const allIndustryData: any[] = getContent('industryApplications.items') || [];
  const industryData = allIndustryData.slice(0, 6);

  return (
    <section className='lg:px-30 px-5 lg:pb-10 pb-5 bg-fill-two lg:process-section'>
      <div className='flex justify-between items-center'>

        <h1 className="text-[32px] lg:text-[100px] italic font-black lg:py-20 py-5">Media Releases</h1>
        <Link href="/news/articles" className=' hidden lg:block'>
          <Button>View All News</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:gap-y-0 gap-y-2.5">
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
      <div className='py-5 lg:hidden flex'>
        <Link href="/news/articles" className='flex-1'>
          <Button className='w-full'>View All News</Button>
        </Link>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className="text-[32px] lg:text-[100px] italic font-black lg:py-20 py-5">Industry Applications</h1>
        <Link href="/news/articles" className=' hidden lg:block'>
          <Button>View All News</Button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-0 gap-y-2.5">
        {industryData.map((application) => (
          <NewCard
            key={application.id}
            image={application.image}
            alt={application.alt}
            year={application.year}
            date={application.date}
            title={application.title}
            description={application.description}
            slug={application.slug}
            linkType="application"
            className="news-card"
          />
        ))}
      </div>
        <div className='py-5 lg:hidden flex'>
        <Link href="/news/articles" className='flex-1'>
          <Button className='w-full'>View All News</Button>
        </Link>
      </div>
    </section>
  );
}