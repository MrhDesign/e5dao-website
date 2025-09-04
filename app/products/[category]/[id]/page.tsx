'use client';

import { useParams } from 'next/navigation';
import useContent from '../../../../lib/useContent';
import Breadcrumb from '../../../components/Breadcrumb';
import ProductImageGallery from '../../../components/ProductImageGallery';
import ContentRenderer from '../../../components/ContentRenderer';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { getCategoryByProduct, getCategoryBySlug, getProductsByCategory } from '../../../../lib/productUtils';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, ProductCategory, StandardProductOverviewItem, BreadcrumbItem } from '../../../../lib/types';

export default function ProductDetailPage() {
  const params = useParams();
  const { getContent } = useContent();

  const productId = parseInt(params.id as string);
  const categorySlug = params.category as string;

  const productsData = getContent<Product[]>('products.items') || [];
  const categoriesData = getContent<ProductCategory[]>('products.categories') || [];

  const product = productsData.find(p => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  // 使用工具函数获取分类信息
  const category = getCategoryByProduct(product, categoriesData);
  const currentCategory = getCategoryBySlug(categorySlug, categoriesData);

  // 验证URL中的分类是否正确
  if (!category || !currentCategory || category.id !== currentCategory.id) {
    return <div>Product not found</div>;
  }

  // 获取当前分类下的所有产品
  const categoryProducts = getProductsByCategory(productsData, product.categoryId);

  // 获取当前产品在数组中的索引
  const currentIndex = categoryProducts.findIndex(p => p.id === product.id);

  // 构建展示产品数组：循环推荐逻辑 (前一个 + 后续产品 + 从头开始的产品)
  const displayProducts: Product[] = [];
  const maxProducts = 6; // 设置最大推荐产品数量

  // 1. 添加前一个产品（如果存在）
  if (currentIndex > 0) {
    displayProducts.push(categoryProducts[currentIndex - 1]);
  }

  // 2. 添加后面的产品
  for (let i = currentIndex + 1; i < categoryProducts.length && displayProducts.length < maxProducts; i++) {
    displayProducts.push(categoryProducts[i]);
  }

  // 3. 如果还有剩余空间，从数组开头循环添加产品（排除当前产品和已添加的前一个产品）
  if (displayProducts.length < maxProducts) {
    for (let i = 0; i < currentIndex && displayProducts.length < maxProducts; i++) {
      // 跳过前一个产品（已经添加过了）
      if (i !== currentIndex - 1) {
        displayProducts.push(categoryProducts[i]);
      }
    }
  }

  // 从 content.json 获取标准产品通用详情数据
  const standardProductOverview = getContent<StandardProductOverviewItem[]>('products.standardProductOverview') || [];

  // 产品图片（主图 + 图库）
  const productImages = [product.image, ...(product.gallery || [])];

  // 面包屑数据
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Products', href: '/products/all' },
    { label: category.title, href: `/products/${categorySlug}` },
    { label: ('title' in product ? product.title : product.model) || 'Product', href: `/products/${categorySlug}/${productId}` }
  ];



  return (
    <div className="bg-fill-two">
      {/* 面包屑导航 */}
      <div className="hidden lg:block px-30 pt-5">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* 产品主体内容 */}
      <div className="lg:px-30 lg:py-20">
        <div className="lg:grid lg:grid-cols-[600px_1fr] flex flex-col lg:gap-10">

          {/* 左侧：产品图片 */}
          <ErrorBoundary>
            <ProductImageGallery
              images={productImages}
              productName={('title' in product ? product.title : product.model) || 'Product'}
            />
          </ErrorBoundary>

          {/* 右侧：产品信息 */}
          <div className='lg:p-0 px-5 pt-5 flex flex-col'>
            {/* 根据产品类型显示不同内容 */}
            {product.productType === 'independent-rd' ? (
              <>
                {/* 自研产品：显示标题和描述 */}
                <div>
                  <h1 className="headline1 text-text-brand mb-2">
                    {'title' in product ? product.title : 'Product Title'}
                  </h1>
                  <div className="text-display">
                    <p>{'description' in product ? product.description : 'Product description not available'}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 标准产品：显示规格与类别 */}
                <h1 className="headline1 text-text-brand mb-2">
                  {'model' in product ? product.model : 'Product Model'}
                </h1>
                <div className="text-display">
                  <p>{'description' in product ? product.description : ''}</p>
                </div>

                {/* 标准产品显示快速规格信息 */}
                {product.specifications && (
                  <div className="">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-[30%_1fr] items-center py-2 border-b border-border-one lg:text-base text-sm font-medium">
                        <span className="text-text-display">{key}:</span>
                        <span className="text-text-title">{value || ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {displayProducts.length > 0 && (
              <div className='mt-auto w-full'>
                <h2 className='py-5 lg:pt-0 text-lg font-medium'>Product Showcase</h2>
                {/* 产品推荐区域 */}
                <div className='w-full lg:h-[150px] lg:flex lg:flex-wrap lg:gap-2.5 grid grid-cols-[repeat(3,1fr)] gap-x-2.5 gap-y-2.5 overflow-hidden'>
                  {/* 动态产品图片 */}
                  {displayProducts.map((relatedProduct) => {
                    const productUrl = `/products/${categorySlug}/${relatedProduct.id}`;
                    return (
                      <Link key={relatedProduct.id} href={productUrl}>
                        <div className='aspect-[4/3] bg-fill-white border border-border-one overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer lg:w-[200px] lg:flex-shrink-0'>
                          <Image
                            src={relatedProduct.image}
                            alt={relatedProduct.alt}
                            width={200}
                            height={150}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </div>


        </div>
      </div>

      {/* 下方区域 */}
      <section className='lg:px-30 lg:py-0 p-5  '>

        <div className='lg:pt-10 pt-5 border-t border-border-one lg:grid lg:grid-cols-[1fr_200px]'>
          <div className='lg:p-10 lg:space-y-10 space-y-5'>

            {/* 产品详情 */}
            <div id="product-details" className=' lg:space-y-5 space-y-2.5'>
              <h2 className='lg:text-3xl text-xl font-medium'>Product Details</h2>
              <div>
                {product.productType === 'independent-rd' ? (
                  // 自研产品展示
                  product.details ? (
                    <ContentRenderer sections={product.details} />
                  ) : (
                    <div className="space-y-4">
                      <p className="text-text-black leading-relaxed">
                        This product delivers exceptional performance through advanced composite materials technology.
                        Our engineering team has carefully designed every aspect to meet the highest industry standards.
                      </p>
                      <p className="text-text-black leading-relaxed">
                        Key benefits include superior strength-to-weight ratio, excellent durability,
                        and resistance to environmental factors. Perfect for demanding applications
                        where performance and reliability are critical.
                      </p>
                    </div>
                  )
                ) : (
                  // 标准产品展示
                  <>
                    {/* 标准产品有详情模版数据就展示详情模版数据和通用详情信息，没有详情模版数据就只展示通用详情信息 */}
                    {product.details && <ContentRenderer sections={product.details} />}

                    {/* 标准产品通用详情 */}
                    <div className="space-y-5">
                      <p className="text-text-black leading-relaxed">
                        To guarantee outstanding reliability in extreme environments, each carbon fiber case undergoes rigorous quality and performance testing. All evaluations are conducted in accordance with international standards, covering impact resistance, scratch and abrasion resistance, immersion, high-altitude adaptability, vibration resistance, and flammability. These tests ensure superior protection and durability during transportation, storage, and field operations.
                      </p>

                      <div className='grid lg:grid-cols-3 grid-cols-2 lg:gap-5 gap-2.5 lg:px-30'>
                        {standardProductOverview.map((item, index) => (
                          <div key={index} className='space-y-2.5 rounded-sm bg-fill-three border border-border-one overflow-hidden lg:p-5 p-2.5'>
                            <div className='aspect-[4/3] overflow-hidden rounded-sm border border-border-one'>
                              <Image
                                src={item.image}
                                alt={item.alt}
                                width={300}
                                height={225}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className='lg:text-lg text-base font-medium text-text-title'>{item.title}</h3>
                          </div>
                        ))}
                      </div>
                      <p className='text-center font-medium lg:text-2xl text-base lg:py-10 py-2.5'>Tested and Certified to U.S. Military Standards (MIL-STD)</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 产品参数 */}
            <div id="technical-data" className='space-y-5'>
              <h2 className='lg:text-3xl text-xl font-medium'>Technical data</h2>
              <div className='w-full lg:pr-[20%]'>
                {/* 添加产品详细参数表格 */}
                {product.specifications ? (
                  <table className="w-full border-collapse bg-fill-four  overflow-hidden border border-border-one">
                    <tbody className='w-full text-sm'>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? 'bg-fill-two' : 'bg-fill-white'}>
                          <td className="lg:px-4 lg:py-2 p-2  font-medium w-1/3 border-b border-r border-border-one">{key}</td>
                          <td className="lg:px-4 lg:py-2 p-2 text-text-black border-b border-border-one">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-text-secondary">No technical specifications available.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}