import Image from 'next/image';

interface ProductCardProps {
  image: string;
  alt: string;
  model: string;
  title: string;
  description: string;
  className?: string;
}

export default function ProductCard({
  image,
  alt,
  model,
  title,
  description,
  className = ""
}: ProductCardProps) {
  return (
    <>
      <div className={`group flex flex-col cursor-pointer rounded-sm overflow-hidden bg-fill-four transition-all duration-300 hover:shadow-xl ${className}`}>
        {/* 产品图片区域 */}
        <div className="w-full h-full overflow-hidden">
          <div className='w-full relative aspect-[4/4]'>
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-125"
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

    </>
  );
}