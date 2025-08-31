'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import useContent from '../../../../lib/useContent';
import ProductCard from '../../../components/ProductCard';
import Breadcrumb from '../../../components/Breadcrumb';
import ProductImageGallery from '../../../components/ProductImageGallery';

interface ProductData {
  id: number;
  image: string;
  alt: string;
  model: string;
  title: string;
  description: string;
  categoryId: number;
  gallery?: string[];
  specifications?: {
    [key: string]: string;
  };
  systemConfiguration?: {
    title: string;
    description: string;
    images: string[];
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const { getContent } = useContent();
  
  const productId = parseInt(params.id as string);
  const categorySlug = params.category as string;
  
  const productsData: ProductData[] = getContent('products.items') || [];
  const categoriesData = getContent('products.categories') || [];
  
  const product = productsData.find(p => p.id === productId);
  const category = categoriesData.find((cat: any) => cat.slug === categorySlug);
  
  if (!product || !category) {
    return <div>Product not found</div>;
  }

  // 获取同分类其他产品
  const relatedProducts = productsData.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  
  // 产品图片（主图 + 图库）
  const productImages = [product.image, ...(product.gallery || [])];

  // 面包屑数据
  const breadcrumbItems = [
    { label: 'Products', href: '/products/all' },
    { label: category.title, href: `/products/${categorySlug}` },
    { label: product.title, href: `/products/${categorySlug}/${productId}` }
  ];


  return (
    <div className="bg-fill-two">
      {/* 面包屑导航 */}
      <div className="hidden lg:block px-30 pt-5">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* 产品主体内容 */}
      <div className="lg:px-30 px-5 py-10">
        <div className="lg:grid lg:grid-cols-[600px_1fr] flex flex-col gap-10">
          
          {/* 左侧：产品图片 */}
          <ProductImageGallery 
            images={productImages}
            productName={product.title}
          />

          {/* 右侧：产品信息 */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-text-title mb-2">
                {product.title}
              </h1>
              <p className="text-lg text-text-secondary mb-4">
                Model: {product.model}
              </p>
              <div className="prose text-text-black">
                <p>{product.description}</p>
              </div>
            </div>

            {/* 快速规格信息 */}
            {product.specifications && (
              <div className="bg-fill-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Key Specifications</h3>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(product.specifications).slice(0, 6).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border-one last:border-0">
                      <span className="text-text-secondary">{key}:</span>
                      <span className="text-text-title font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 系统配置部分 */}
      {product.systemConfiguration && (
        <div className="lg:px-30 px-5 py-10 border-t border-border-one">
          <h2 className="text-2xl font-bold mb-6">System Configuration Plan</h2>
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-4">{product.systemConfiguration.title}</h3>
              <p className="text-text-black mb-6">{product.systemConfiguration.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.systemConfiguration.images.map((img, index) => (
                <div key={index} className="aspect-square bg-fill-white rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`System component ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 产品详情部分 */}
      <div className="lg:px-30 px-5 py-10 border-t border-border-one">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        <div className="prose max-w-none text-text-black">
          <p>
            Features an advanced COD display screen with an ultra-compact sized form and a submersible cage. The tracker is 
            rated for submersion to 100 meters depth.
          </p>
          <p>
            The cage is small and quick to assemble, simply depends on what, allowing the wearer to quickly deploy and 
            manipulate the tracker in its submersed environment.
          </p>
        </div>
      </div>

      {/* 技术参数表格 */}
      {product.specifications && (
        <div className="lg:px-30 px-5 py-10 border-t border-border-one">
          <h2 className="text-2xl font-bold mb-6">Technical data</h2>
          <div className="bg-fill-white rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <tr key={key} className={index % 2 === 0 ? 'bg-fill-two' : 'bg-fill-white'}>
                    <td className="px-6 py-4 text-text-secondary font-medium w-1/3">{key}</td>
                    <td className="px-6 py-4 text-text-title">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 相关产品推荐 */}
      {relatedProducts.length > 0 && (
        <div className="lg:px-30 px-5 py-10 border-t border-border-one">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                categoryId={relatedProduct.categoryId}
                image={relatedProduct.image}
                alt={relatedProduct.alt}
                model={relatedProduct.model}
                title={relatedProduct.title}
                description={relatedProduct.description}
                className="w-full"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}