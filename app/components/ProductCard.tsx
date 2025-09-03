import Image from 'next/image';
import Link from 'next/link';
import useContent from '../../lib/useContent';
import Button from './Button';

// 产品核心数据类型 - 使用条件类型
interface BaseProduct {
  id: number;
  categoryId: number;
  image: string;
  alt: string;
  productType: 'independent-rd' | 'standard';
}

interface IndependentRDProduct extends BaseProduct {
  productType: 'independent-rd';
  title: string;        // 自研产品必需
  description: string;  // 自研产品必需
  model?: string;       // 自研产品可选（技术标识）
}

interface StandardProduct extends BaseProduct {
  productType: 'standard';
  model: string;               // 标准产品必需
  standardCategory: string;    // 标准产品必需
  title?: string;             // 标准产品可选（向后兼容）
  description?: string;       // 标准产品可选（向后兼容）
}

type ProductCore = IndependentRDProduct | StandardProduct;

// 组件Props支持两种方式
interface ProductCardProps {
  // 方式1：传递完整产品对象
  product?: ProductCore;
  
  // 方式2：逐字段传递（向后兼容）
  image?: string;
  alt?: string;
  model?: string;
  title?: string;
  description?: string;
  productType?: 'independent-rd' | 'standard';
  standardCategory?: string;
  id?: number;
  categoryId?: number;
  
  // 通用属性
  className?: string;
  href?: string;
  variant?: 'default' | 'solution';
}

export default function ProductCard(props: ProductCardProps) {
  // 智能解析数据来源，处理可选字段
  const productData = props.product ? {
    id: props.product.id,
    categoryId: props.product.categoryId,
    image: props.product.image,
    alt: props.product.alt,
    model: 'model' in props.product ? props.product.model : undefined,
    title: 'title' in props.product ? props.product.title : undefined,
    description: 'description' in props.product ? props.product.description : undefined,
    productType: props.product.productType,
    standardCategory: 'standardCategory' in props.product ? props.product.standardCategory : undefined,
  } : {
    id: props.id || 0,
    categoryId: props.categoryId || 0,
    image: props.image || '',
    alt: props.alt || '',
    model: props.model,
    title: props.title,
    description: props.description,
    productType: props.productType || 'independent-rd' as const,
    standardCategory: props.standardCategory,
  };

  const { 
    id, categoryId, image, alt, model, title, 
    description, productType, standardCategory 
  } = productData;
  
  const { className = "", href, variant = 'default' } = props;
  
  const { getContent } = useContent();
  
  // 使用工具函数生成产品URL
  const getProductUrl = () => {
    if (href) return href;
    if (!id || !categoryId) return '#';
    
    const categoriesData = getContent('products.categories') || [];
    const category = categoriesData.find((cat: any) => cat.id === categoryId);
    
    if (!category) {
      console.warn(`Category not found for categoryId ${categoryId}`);
      return '#';
    }
    
    return `/products/${category.slug}/${id}`;
  };
  
  const productUrl = getProductUrl();
  
  // Solution variant - 解决方案专用变体
  if (variant === 'solution') {
    const solutionCardContent = (
      <div className={`group flex lg:flex-row flex-col lg:gap-10 gap-5 cursor-pointer lg:py-5 hover:bg-fill-three border-b border-border-one ${className}`}>
        {/* 产品图片区域 - 解决方案变体 */}
        <div className='flex-1 aspect-[4/3]'>
          <Image
            src={image}
            alt={alt}
            width={600}
            height={450}
            className="aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>



        {/* 产品信息区域 - 解决方案变体 */}
        <div className="lg:p-5 py-5 flex-2 flex flex-col gap-2.5">
          {productType === 'independent-rd' ? (
            <>
              {title && (
                <h3 className="lg:text-3xl text-base font-medium text-text-brand group-hover:text-text-brand-hover transition-colors duration-200 line-clamp-2">
                  {title}
                </h3>
              )}
              {description && (
                <p className="lg:text-xl text-sm lg:text-text-display font-normal line-clamp-6 leading-relaxed">
                  {description}
                </p>
              )}
            </>
          ) : (
            <>
              {model && (
                <h3 className="lg:text-3xl text-base font-medium text-text-brand group-hover:text-text-brand-hover transition-colors duration-200 line-clamp-2">
                  {model}
                </h3>
              )}
              {standardCategory && (
                <p className="lg:text-xl text-sm lg:text-text-display font-normal line-clamp-6 leading-relaxed">
                  {standardCategory}
                </p>
              )}
            </>
          )}
          
          {/* 查看详情按钮 */}
          <div className="mt-auto">
            <Button 
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    );

    return (
      <>
        {(href || id) ? (
          <Link href={productUrl}>
            {solutionCardContent}
          </Link>
        ) : (
          solutionCardContent
        )}
      </>
    );
  }
  
  // Default variant - 默认变体（原有样式）
  const cardContent = (
    <div className={`group flex flex-col cursor-pointer rounded-sm overflow-hidden bg-fill-four transition-all duration-300 hover:shadow-xl ${className}`}>
      {/* 产品图片区域 */}
      <div className="w-full h-full overflow-hidden relative z-0">
        <div className='w-full relative aspect-square bg-fill-one overflow-hidden'>
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
        {/* 根据产品类型显示不同内容 */}
        {productType === 'independent-rd' ? (
          <>
            {/* 自主研发产品：显示 title + description */}
            {title && (
              <div className="lg:text-xl text-base text-text-brand">
                <span className="line-clamp-1">
                  {title}
                </span>
              </div>
            )}
            {description && (
              <p className="text-display line-clamp-1">
                {description}
              </p>
            )}
          </>
        ) : (
          <>
            {/* 标准产品：显示 model + standardCategory */}
            {model && (
              <div className="lg:text-xl text-base text-text-brand">
                <span className="line-clamp-1">
                  {model}
                </span>
              </div>
            )}
            {standardCategory && (
              <p className="text-display line-clamp-1">
                {standardCategory}
              </p>
            )}
          </>
        )}
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