'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';
import Breadcrumb from '../../components/Breadcrumb';
import useContent from '../../../lib/useContent';
import { useScrollRevealMultiple } from '../../../lib/useScrollReveal';

interface ProductData {
  id: number;
  image: string;
  alt: string;
  model: string;
  title: string;
  description: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const { getContent } = useContent();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('specifications');

  // 获取产品数据
  const productsData: ProductData[] = getContent('products.items') || [];
  const product = productsData.find(p => p.id.toString() === id);
  const relatedProducts = productsData.filter(p => p.id.toString() !== id).slice(0, 4);

  // 面包屑数据
  const breadcrumbItems = [
    { label: 'Products', href: '/products', position: 1 },
    { label: product?.title || 'Product Detail', position: 2, isCurrentPage: true }
  ];

  // 产品图片数组（现在使用同一张图片，可以后续扩展）
  const productImages = [
    product?.image || '/images/products.png',
    product?.image || '/images/products.png',
    product?.image || '/images/products.png'
  ];

  // 产品规格数据
  const specifications = [
    { label: 'Material', value: 'Carbon Fiber Composite' },
    { label: 'Dimensions', value: '45 x 35 x 20 cm' },
    { label: 'Weight', value: '2.5 kg' },
    { label: 'Capacity', value: '25 L' },
    { label: 'Temperature Range', value: '-20°C to +60°C' },
    { label: 'Water Resistance', value: 'IP67' },
    { label: 'Certification', value: 'ISO 9001, CE, FDA' }
  ];

  // ScrollReveal动画
  useScrollRevealMultiple([
    {
      selector: '.product-detail-section',
      config: {
        origin: 'bottom',
        distance: '30px',
        duration: 600,
        delay: 200
      }
    },
    {
      selector: '.related-product-card',
      config: {
        origin: 'bottom',
        distance: '40px',
        duration: 700,
        delay: 200,
        interval: 100
      }
    }
  ]);

  // 如果产品不存在，显示404
  if (!product) {
    return (
      <div className="min-h-screen bg-fill-one flex items-center justify-center">
        <div className="text-center">
          <h1 className="headline1 mb-4">Product Not Found</h1>
          <p className="text-display mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fill-one">
      {/* 面包屑导航 */}
      <section className="lg:px-30 px-5 pt-5">
        <Breadcrumb 
          items={breadcrumbItems} 
          separator="slash"
          enableStructuredData={true}
        />
      </section>

      {/* 产品主要信息区域 */}
      <section className="lg:px-30 px-5 lg:py-10 py-5 product-detail-section">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 lg:gap-20">
          {/* 产品图片区域 */}
          <div className="space-y-4">
            {/* 主图片 */}
            <div className="aspect-square bg-fill-two rounded-lg overflow-hidden">
              <Image
                src={productImages[currentImageIndex]}
                alt={product.alt}
                width={600}
                height={600}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* 缩略图 */}
            <div className="flex gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? 'border-lime-600'
                      : 'border-transparent hover:border-neutral-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.alt} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 产品信息区域 */}
          <div className="space-y-6">
            {/* 产品型号 */}
            <div className="text-lime-600 text-lg font-medium">
              {product.model}
            </div>

            {/* 产品标题 */}
            <h1 className="headline1 text-black">
              {product.title}
            </h1>

            {/* 产品描述 */}
            <p className="text-display text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* 主要特性 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-black">Key Features</h3>
              <ul className="space-y-2 text-display">
                <li className="flex items-start gap-2">
                  <span className="text-lime-600 mt-1">•</span>
                  <span>Multi-functional design for various medical equipment storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-600 mt-1">•</span>
                  <span>Lightweight carbon fiber construction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-600 mt-1">•</span>
                  <span>Weather-resistant and impact-proof</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-600 mt-1">•</span>
                  <span>Meets international medical device standards</span>
                </li>
              </ul>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4 pt-4">
              <Button className="relative">Contact for Quote</Button>
              <Button variant="outline" className="relative">Download Specs</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 详细信息选项卡 */}
      <section className="lg:px-30 px-5 py-10 product-detail-section">
        <div className="bg-fill-two rounded-lg p-6 lg:p-8">
          {/* 选项卡标题 */}
          <div className="flex border-b border-border-one mb-6">
            <button
              onClick={() => setSelectedTab('specifications')}
              className={`pb-3 px-4 text-lg font-medium transition-colors ${
                selectedTab === 'specifications'
                  ? 'text-lime-600 border-b-2 border-lime-600'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setSelectedTab('applications')}
              className={`pb-3 px-4 text-lg font-medium transition-colors ${
                selectedTab === 'applications'
                  ? 'text-lime-600 border-b-2 border-lime-600'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setSelectedTab('certifications')}
              className={`pb-3 px-4 text-lg font-medium transition-colors ${
                selectedTab === 'certifications'
                  ? 'text-lime-600 border-b-2 border-lime-600'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Certifications
            </button>
          </div>

          {/* 选项卡内容 */}
          <div className="min-h-[300px]">
            {selectedTab === 'specifications' && (
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-border-one last:border-b-0">
                    <span className="font-medium text-black">{spec.label}:</span>
                    <span className="text-display">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'applications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-black">Ideal Applications</h3>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-black">Military & Defense</h4>
                    <ul className="space-y-2 text-display">
                      <li>• Field medical stations</li>
                      <li>• Combat medic equipment</li>
                      <li>• Emergency response units</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-black">Healthcare Facilities</h4>
                    <ul className="space-y-2 text-display">
                      <li>• Hospital emergency departments</li>
                      <li>• Ambulance medical storage</li>
                      <li>• Disaster relief operations</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'certifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-black">Quality Certifications</h3>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
                  <div className="text-center p-4 bg-fill-one rounded-lg">
                    <div className="text-2xl font-bold text-lime-600 mb-2">ISO 9001</div>
                    <p className="text-display">Quality Management System</p>
                  </div>
                  <div className="text-center p-4 bg-fill-one rounded-lg">
                    <div className="text-2xl font-bold text-lime-600 mb-2">CE</div>
                    <p className="text-display">European Conformity</p>
                  </div>
                  <div className="text-center p-4 bg-fill-one rounded-lg">
                    <div className="text-2xl font-bold text-lime-600 mb-2">FDA</div>
                    <p className="text-display">US Food & Drug Administration</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 相关产品推荐 */}
      <section className="lg:px-30 px-5 py-10 bg-fill-three product-detail-section">
        <div className="flex flex-col">
          <h2 className="headline1 leading-10 mb-8 text-center lg:text-left">Related Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                image={relatedProduct.image}
                alt={relatedProduct.alt}
                model={relatedProduct.model}
                title={relatedProduct.title}
                description={relatedProduct.description}
                className="related-product-card w-full hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}