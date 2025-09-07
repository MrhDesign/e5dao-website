import { Metadata } from 'next';
import Image from 'next/image';
import ProductCard from '../../components/ProductCard';
import StructuredData from '../../components/StructuredData';
import { generatePageMetadata, PageType, generateStructuredData } from '../../../lib/global-metadata-generator';
import contentData from '../../../lib/content.json';

// 生成元数据
export const metadata: Metadata = generatePageMetadata({
  title: "Carbon Fiber Mobile Command Post System - Advanced Tactical Solutions",
  description: "Military-grade mobile command post system with carbon fiber construction. Rapid 5-minute deployment, EMI shielding, MIL-STD-810H certified. Professional tactical command solutions for defense and emergency response.",
  keywords: [
    "mobile command post",
    "tactical command center", 
    "military command system",
    "carbon fiber command station",
    "portable headquarters",
    "field command unit",
    "MIL-STD-810H certified",
    "EMI shielding system",
    "rapid deployment command"
  ],
  type: PageType.SOLUTION,
  url: "/solution/command-system",
  image: "/images/mobile-command-hero.png",
  category: "Defense Solutions"
});

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
  // 直接从 contentData 获取数据
  const commandSystemData = contentData.pages.solution?.commandSystem as CommandSystemData;

  // 生成结构化数据
  const productStructuredData = generateStructuredData({
    type: 'Product',
    data: {
      name: commandSystemData?.overview?.title || 'Carbon Fiber Mobile Command Post System',
      description: commandSystemData?.overview?.content || 'Military-grade mobile command post system with rapid deployment capabilities',
      category: 'Defense Equipment',
      material: 'Carbon Fiber Composite',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'E5DAO'
        }
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Deployment Time',
          value: 'Under 5 minutes'
        },
        {
          '@type': 'PropertyValue', 
          name: 'Standard Compliance',
          value: 'MIL-STD-810H & IP67'
        },
        {
          '@type': 'PropertyValue',
          name: 'EMI Shielding',
          value: 'Fully shielded design'
        }
      ],
      applicationCategory: [
        'Military Operations',
        'Emergency Response', 
        'Disaster Management',
        'Tactical Communications'
      ]
    }
  });

  return (
    <>
      <StructuredData data={productStructuredData} />
      <div className="space-y-10">
      {/* Hero Section */}
      {commandSystemData?.hero?.image && (
        <div className="relative h-50 md:h-100 mb-8 overflow-hidden">
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
            {(() => {
              const productsData = ((contentData as Record<string, unknown>).products as {items: Array<{id: number; categoryId: number; productType: string}>})?.items || [];
              // 筛选出 command-system 分类的自研产品 (categoryId = 1 && productType = 'independent-rd')
              const commandSystemProducts = productsData.filter((product: {id: number; categoryId: number; productType: string}) => 
                product.categoryId === 1 && product.productType === 'independent-rd'
              );
              
              return commandSystemProducts.map((product, index: number) => (
                <ProductCard
                  key={`command-product-${product.id || index}`}
                  product={product as unknown as import('@/lib/types').Product}
                  variant="solution"
                  className="w-full"
                />
              ));
            })()}
        </div>
      </div>
      </div>
    </>
  );
}