'use client';

import { useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './components/Button';
import NewCard from './components/NewCard';
import ProductCard from './components/ProductCard';
import ProcessFlow from './components/ProcessFlow';
import useContent from '../lib/useContent';
import { useScrollRevealMultiple } from '../lib/useScrollReveal';
import ContactForm from './components/ContactForm';
import type { Product, ApplicationItem } from '../lib/types';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { getContent } = useContent();


  // 获取产品数据，按3个分类各显示4个产品，保留分类信息
  const homeProductsData = useMemo(() => {
    const productsData = getContent<Product[]>('products.items') || [];
    const categories = getContent<Array<{ id: number, title: string, slug: string }>>('products.categories') || [];

    // 返回分类及其产品的结构 - 显示所有4个分类
    const categorizedProducts = categories.map((category) => {
      const categoryProducts = productsData
        .filter((product: Product) => product.categoryId === category.id)
        .slice(0, 4);
      return {
        category,
        products: categoryProducts
      };
    });

    return categorizedProducts;
  }, [getContent]);

  // 获取行业应用数据，首页显示4个
  const paginatedData = useMemo(() => {
    const allIndustryData = getContent<ApplicationItem[]>('news.applications') || [];
    return allIndustryData.slice(0, 4);
  }, [getContent]);

  // 配置ScrollReveal动画
  const scrollRevealConfig = useMemo(() => [
    {
      selector: '.hero-section',
      config: {
        origin: 'top' as const,
        distance: '50px',
        duration: 800,
        delay: 100
      }
    },
    {
      selector: '.about-section',
      config: {
        origin: 'bottom' as const,
        distance: '30px',
        duration: 600,
        delay: 200
      }
    },
    {
      selector: '.about-title',
      config: {
        origin: 'left' as const,
        distance: '50px',
        duration: 800,
        delay: 300
      }
    },
    {
      selector: '.about-description',
      config: {
        origin: 'right' as const,
        distance: '50px',
        duration: 800,
        delay: 400
      }
    },
    {
      selector: '.solution-card',
      config: {
        origin: 'bottom' as const,
        distance: '40px',
        duration: 700,
        delay: 200,
        interval: 100
      }
    },
    {
      selector: '.solution-image',
      config: {
        origin: 'left' as const,
        distance: '60px',
        duration: 800,
        delay: 300,
        scale: 0.8
      }
    },
    {
      selector: '.solution-content',
      config: {
        origin: 'right' as const,
        distance: '60px',
        duration: 800,
        delay: 400
      }
    },
    {
      selector: '.news-card',
      config: {
        origin: 'bottom' as const,
        distance: '40px',
        duration: 600,
        delay: 300
      }
    },
    {
      selector: '.product-card',
      config: {
        origin: 'bottom' as const,
        distance: '40px',
        duration: 700,
        delay: 200,
        interval: 100
      }
    },
    {
      selector: '.process-section',
      config: {
        origin: 'bottom' as const,
        distance: '50px',
        duration: 800,
        delay: 300
      }
    },
    {
      selector: '.contact-form',
      config: {
        origin: 'right' as const,
        distance: '60px',
        duration: 800,
        delay: 400
      }
    }
  ], []);

  useScrollRevealMultiple(scrollRevealConfig);

  // 缓存常用的内容获取
  const readMoreText = useMemo(() => getContent('common.readMore') as string, [getContent]);
  const aboutDescription = useMemo(() => getContent('aboutUs.about.description') as string, [getContent]);
  // 获取指挥系统数据
  const commandSystemTitle = useMemo(() => getContent('solution.commandSystem.overview.title') as string, [getContent]);
  const commandSystemContent = useMemo(() => getContent('solution.commandSystem.overview.content') as string, [getContent]);
  const commandSystemHeroImage = useMemo(() => getContent('solution.commandSystem.hero.image') as string, [getContent]);
  const commandSystemHeroAlt = useMemo(() => getContent('solution.commandSystem.hero.alt') as string, [getContent]);

  // 获取医疗系统数据
  const medicalTreatmentTitle = useMemo(() => getContent('solution.medicalTreatment.overview.title') as string, [getContent]);
  const medicalTreatmentContent = useMemo(() => getContent('solution.medicalTreatment.overview.content') as string, [getContent]);
  const medicalTreatmentHeroImage = useMemo(() => getContent('solution.medicalTreatment.hero.image') as string, [getContent]);
  const medicalTreatmentHeroAlt = useMemo(() => getContent('solution.medicalTreatment.hero.alt') as string, [getContent]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 尝试自动播放
    const attemptAutoplay = async () => {
      try {
        await video.play();
      } catch {
        // 自动播放失败是正常情况，静默处理
      }
    };

    // 移动设备优化：监听视口变化
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        attemptAutoplay();
      }
    };

    // Intersection Observer 用于检测视频是否在视口中
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            attemptAutoplay();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 确保视频加载后尝试播放
    if (video.readyState >= 2) {
      attemptAutoplay();
    } else {
      video.addEventListener('canplay', attemptAutoplay);
      video.addEventListener('loadedmetadata', attemptAutoplay);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('canplay', attemptAutoplay);
      video.removeEventListener('loadedmetadata', attemptAutoplay);
    };
  }, []);



  return (
    <>
      <div className=' overflow-x-hidden'>

        <section className="relative hero-section">
          {/* <div>
            <video
              ref={videoRef}
              src="/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              webkit-playsinline="true"
              x-webkit-airplay="allow"
              className="w-full object-cover"
            />

            {!canAutoplay && (
              <button
                onClick={playVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300"
              >
                <div className="bg-white/90 hover:bg-white text-black p-4 rounded-full transition-all duration-200 shadow-lg">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}

            <button
              onClick={toggleMute}
              className="absolute top-6 right-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              title={isMuted ? '开启声音' : '关闭声音'}
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.54-.77 2.2-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.33-1.71-.7L7 9H4c-.55 0-1-.45-1-1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            <div className='absolute lg:bottom-10 bottom-5 left-1/2 -translate-x-1/2'>
              <Button className='relative'>{readMoreText}</Button>
            </div>
          </div> */}

          <div
            className='w-full md:aspect-[16/5] aspect-[440/280] bg-contain bg-no-repeat md:bg-[url(/images/Homehero-wb.png)] bg-[url(/images/Homehero-mb.png)] lg:pt-15 lg:pl-15 md:pt-10 md:pl-10 p-5'
          >
            <div className='lg:w-10/12 w-full md:px-10 md:py-5 p-2.5 bg-fill-black/40  text-text-white md:space-y-5 space-x-2.5'>
              <h1 className='2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-black italic uppercase'>Advancing the World with High-Performance Composites</h1>
              <p className='2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-base'>Customized Solutions for Aerospace, Defense, Medical, Emergency Response, and Advanced Transportation</p>
            </div>
          </div>


        </section>

        {/* E50dao企业介绍 */}
        <section className="lg:px-30 lg:py-10 p-5 about-section">
          <div className="w-full flex lg:flex-row flex-col items-start justify-between lg:py-10 py-5 lg:gap-10 gap-2.5">
            <div className='lg:w-[660px] lg:h-[200px] w-[249px] h-[82px] about-title'>
              <Image
                src="/images/about-title.png"
                alt="About Title"
                width={512}
                height={181}
                className="w-full h-auto object-cover lg:pr-0 "
                priority
              />
            </div>

            <div className='flex-1'>
              <p className='text-display  lg:line-clamp-8 line-clamp-6' style={{ whiteSpace: 'pre-line' }}>{aboutDescription}</p>
              <div className='mt-10'>
                <Link href="/aboutUs">
                  <Button className='relative'>{readMoreText}</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 指挥系统解决方案模块 */}
        <section className='bg-fill-three solution-card'>
          <div className='px-30 py-20 lg:flex hidden gap-10 justify-between'>
            <div className='w-[660px] h-[660px] relative image-hover-zoom solution-image'>
              <Image
                src={commandSystemHeroImage}
                alt={commandSystemHeroAlt}
                fill
                sizes="100vw, 50vw"
                className="w-full h-auto object-cover  lg:pr-0 pr-20 rounded-sm"
                priority
              />
            </div>
            <div className='flex-1 flex flex-col gap-5 solution-content'>
              <h1 className='headline1'>{commandSystemTitle}</h1>
              <p className='text-display line-clamp-10' style={{ whiteSpace: 'pre-line' }}>{commandSystemContent}</p>
              <div className='mt-auto'>
                <Link href="/solution/command-system">
                  <Button className='relative'>{readMoreText}</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className='lg:hidden p-5 flex flex-col gap-2.5'>
            <div className='w-full aspect-[4/3]'>
              <Image
                src={commandSystemHeroImage}
                alt={commandSystemHeroAlt}
                width={512}
                height={512}
                className="w-full object-cover aspect-[4/3]  lg:pr-0 rounded-sm"
                priority
              />
            </div>
            <h1 className='headline1'>{commandSystemTitle}</h1>
            <p className='text-display line-clamp-10'>{commandSystemContent}</p>
            <div>
              <Link href="/solution/command-system">
                <Button className='relative'>{readMoreText}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 医疗系统解决方案模块 */}
        <section className='bg-fill-two'>
          <div className='px-30 py-20 lg:flex hidden gap-10 justify-between'>
            <div className='lg:order-1 w-[660px] relative h-[660px] image-hover-zoom solution-image'>
              <Image
                src={medicalTreatmentHeroImage}
                alt={medicalTreatmentHeroAlt}
                fill
                sizes="100vw, 50vw"
                className="w-full h-auto object-cover  lg:pr-0 pr-20 rounded-sm"
                priority
              />
            </div>
            <div className='flex-1 flex flex-col gap-5 solution-content'>
              <h1 className='headline1'>{medicalTreatmentTitle}</h1>
              <p className='text-display line-clamp-10' style={{ whiteSpace: 'pre-line' }}>{medicalTreatmentContent}</p>
              <div className='mt-auto'>
                <Link href="/solution/treatment-system">
                  <Button className='relative'>{readMoreText}</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className='lg:hidden p-5 flex flex-col gap-2.5'>
            <div className='w-full aspect-[4/3]'>
              <Image
                src={medicalTreatmentHeroImage}
                alt={medicalTreatmentHeroAlt}
                width={512}
                height={512}
                className="w-full object-cover aspect-[4/3]  lg:pr-0 rounded-sm"
                priority
              />
            </div>
            <h1 className='headline1'>{medicalTreatmentTitle}</h1>
            <p className='text-display line-clamp-10'>{medicalTreatmentContent}</p>
            <div>
              <Link href="/solution/treatment-system">
                <Button className='relative'>{readMoreText}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 行业案例展示，暂时取消 */}
        {/* <section className="lg:px-30 lg:pb-10 lg:pt-0 bg-fill-two p-5">
          <div className="flex flex-col">
            <h1 className="block lg:hidden headline1 leading-10 pb-2.5">Industry Application</h1>
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-0 gap-y-5">
              {paginatedData.map((application) => (
                <NewCard
                  key={application.id}
                  image={application.image}
                  alt={application.alt}
                  year={application.publishedDate.year}
                  date={`${application.publishedDate.month}/${application.publishedDate.day}`}
                  title={application.title}
                  description={application.description}
                  slug={application.slug}
                  linkType="application"
                  className="news-card"
                />
              ))}
            </div>
          </div>
        </section> */}

        <section className='lg:px-30 lg:py-20 px-5 py-10 bg-fill-three'>
          <h1 className="headline1 leading-10 lg:mb-8 mb-2.5 lg:text-left">Products</h1>
          <div className="space-y-10">
            {homeProductsData.map((categoryData) => (
              <div key={categoryData.category.id}>
                {/* 分类标题 */}
                <h2 className="lg:text-3xl text-lg font-semibold mb-5 text-text-primary">
                  {categoryData.category.title}
                </h2>
                {/* 该分类下的产品网格 */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-10">
                  {categoryData.products.map((product, index) => (
                    <ProductCard
                      key={product.id || index}
                      product={product}
                      className="product-card w-full"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* 查看更多按钮 */}
          <div className="flex justify-center lg:mt-10 mt-5 product-card">
            <Link href="/products/all">
              <Button className="relative">View All Products</Button>
            </Link>
          </div>
        </section>

        <section className='lg:pl-30 lg:pr-0 px-5 lg:py-20 py-10 bg-fill-two lg:process-section'>
          <h1 className="headline1 leading-10 lg:mb-20 mb-10 lg:text-left">Contact</h1>
          <div className='flex lg:flex-row flex-col lg:gap-[100px] gap-10'>
            <div className="lg:w-[640px] lg:headline2 text-2xl">
              <p className='lg:mb-10 mb-5'>- Standard Products</p>
              <p className='mb-5'>- Customization Process</p>
              <ProcessFlow />
            </div>
            <div className="flex-1 lg:bg-fill-white lg:p-10 rounded-l-sm">
              <h1 className='headline1 mb-8'>Any Query? Please contact us</h1>
              <ContactForm className="contact-form" />
            </div>
          </div>
        </section>
      </div>

    </>
  );
}
