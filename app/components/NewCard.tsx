'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewCardProps {
  image: string;
  alt?: string;
  year?: string;
  date?: string;
  title: string;
  description: string;
  className?: string;
  slug?: string;
}

const NewCard: React.FC<NewCardProps> = ({
  image,
  alt = '',
  year = '2025',
  date = 'June 11',
  title,
  description,
  className = '',
  slug
}) => {
  const cardContent = (
    <>
      {/* web组件 */}
      <div className={`hidden p-5 lg:flex hover:bg-fill-three rounded-sm ${className}`}>
        {/* 左侧图片区域 */}
        <div className="flex border-r border-border-one">
          <div className='w-[280px]'>
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
          <p className="text-display line-clamp-3">
            {description}
          </p>
        </div>
      </div>


      {/* mobile */}
      <div className='lg:hidden flex px-5 py-2.5'>
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
            {description}
          </p>
        </div>
      </div>
    </>
  );

  if (slug) {
    return <Link href={`/news/${slug}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default NewCard;