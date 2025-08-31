import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  image: string;
  alt: string;
  model: string;
  title: string;
  description: string;
  className?: string;
  href?: string;
  id?: number;
}

export default function ProductCard({
  image,
  alt,
  model,
  title,
  description,
  className = "",
  href,
  id
}: ProductCardProps) {
  const productUrl = href || (id ? `/products/${id}` : '#');
  
  const cardContent = (
    <div className={`group flex flex-col cursor-pointer rounded-sm overflow-hidden bg-fill-four transition-all duration-300 hover:shadow-xl ${className}`}>
      {/* 产品图片区域 */}
      <div className="w-full h-full overflow-hidden relative z-0">
        <div className='w-full relative aspect-[4/4] overflow-hidden'>
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-600 group-hover:scale-110"
          />
        </div>
      </div>

      {/* 产品信息区域 */}
      <div className="lg:px-5 px-2.5 lg:py-4 py-2 flex flex-col lg:gap-2">
        {/* 产品型号 */}
        <div className="lg:text-xl text-base text-text-brand">
          {model}
        </div>

        {/* 产品标题 */}
        <div>
          <span className="lg:text-lg text-sm rounded-sm">
            {title}
          </span>
        </div>
        {/* 产品描述 */}
        {/* <p className="text-display line-clamp-2">
          {description}
        </p> */}
      </div>
    </div>
  );

  return (
    <>
      {(href || id) ? (
        <Link href={productUrl}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </>
  );
}