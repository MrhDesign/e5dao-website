import Image from 'next/image';
import ProductCard from '../../components/ProductCard';
import { SEO } from '../../../lib/seo';
import { Product } from '../../../lib/types';
import contentData from '../../../lib/content.json';

// 生成元数据 - 使用新的统一SEO系统
export const metadata = SEO.metadata.solution(
  "Carbon Fiber Mobile Command Post System",
  "Military-grade mobile command post system with carbon fiber construction. Rapid 5-minute deployment, EMI shielding, MIL-STD-810H certified.",
  {
    url: "/solution/command-system",
    image: "/images/mobile-command-hero.png",
    category: "Defense Solutions",
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
    ]
  }
);

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

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      {commandSystemData?.hero?.image && (
        <div className="relative mb-8 overflow-hidden">
          <Image
            src={commandSystemData.hero.image}
            alt={commandSystemData.hero.alt || 'Mobile Command Station System'}
            className="object-cover h-50 md:h-100"
            width={1568}
            height={672}
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
              const productsData = ((contentData as Record<string, unknown>).pages as Record<string, unknown>)?.products as {items: Array<Product>} | undefined;
              const items = productsData?.items || [];
              
              // 筛选出 command-system 分类的自研产品 (categoryId = 1 && productType = 'independent-rd')
              const commandSystemProducts = items.filter((product: Product) => 
                product.categoryId === 1 && product.productType === 'independent-rd'
              );
              
              return commandSystemProducts.map((product, index: number) => (
                <ProductCard
                  key={`command-product-${product.id || index}`}
                  product={product}
                  variant="solution"
                  className="w-full"
                />
              ));
            })()}
        </div>
      </div>
      </div>
  );
}