'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useContent } from '@/lib/useContent';
import ProductCard from '../../components/ProductCard';
import type { Product } from '@/lib/types';

interface CommandSystemData {
  hero?: {
    image: string;
    alt: string;
  };
  overview?: {
    title: string;
    content: string;
  };
  features?: {
    title: string;
    content: string;
    image: string;
    alt: string;
  };
  Components?: {
    title: string;
  };
}

export default function CommandSystemPage() {
  const { getContent } = useContent();
  const commandSystemData = useMemo(() => 
    getContent<CommandSystemData>('solution.commandSystem'), 
    [getContent]
  );

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      {commandSystemData?.hero?.image && (
        <div className="relative h-64 md:h-80 mb-8 overflow-hidden">
          <Image
            src={commandSystemData.hero.image}
            alt={commandSystemData.hero.alt || 'Mobile Command Station System'}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* System Overview */}
      <div className="">

        <h1 className="headline1 text-text-brand mb-5">
          {commandSystemData?.overview?.title}
        </h1>
        <div className="space-y-5">
          {commandSystemData?.overview?.content?.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index} className="text-display">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-8">
        <h2 className='lg:text-4xl text-xl font-medium'>
          {commandSystemData?.features?.title}
        </h2>

        {commandSystemData?.features?.image && (
          <Image
            src={commandSystemData.features.image}
            alt={commandSystemData.features.alt || 'System Features'}
            width={1380}
            height={702}
            className="object-cover rounded-lg"
            priority
          />
        )}

         {/* Features List */}
        <div className="grid lg:grid-cols-2 gap-5">
          {commandSystemData?.features?.content?.split('\n').map((feature: string, index: number) => {
            const [title, description] = feature.split(': ');
            return (
              <div key={index} className="rounded-sm lg:p-2.5 hover:bg-fill-three transition-colors duration-200">
                <h3 className="lg:text-2xl text-base font-medium text-text-brand">
                  {title}
                </h3>
                <p className="text-display leading-relaxed">
                  {description}
                </p>
              </div>
            );
          })}
        </div>

        <h2 className='lg:text-4xl text-xl font-medium'>
          {commandSystemData?.Components?.title}
        </h2>

        {/* 相关产品展示 */}
        <div className="flex flex-col lg:gap-10 gap-5">
            {useMemo(() => {
              const productsData = getContent<Product[]>('products.items') || [];
              // 筛选出 command-system 分类的自研产品 (categoryId = 1 && productType = 'independent-rd')
              const commandSystemProducts = productsData.filter((product: Product) => 
                product.categoryId === 1 && product.productType === 'independent-rd'
              );
              
              return commandSystemProducts.map((product: Product, index: number) => (
                <ProductCard
                  key={`command-product-${product.id || index}`}
                  product={product}
                  variant="solution"
                  className="w-full"
                />
              ));
            }, [getContent])}
        </div>
      </div>
    </div>
  );
}