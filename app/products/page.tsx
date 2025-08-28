'use client';

import ProductCard from '../components/ProductCard';
import useContent from '../../lib/useContent';

interface ProductData {
  id: number;
  image: string;
  alt: string;
  model: string;
  title: string;
  description: string;
}

export default function Products() {
  const { getContent } = useContent();
  const productsData: ProductData[] = getContent('products.items') || [];
  const pageTitle: string = getContent('products.page.title') || 'Products';
  const pageDescription: string = getContent('products.page.description') || '';

  return (
    <div className="min-h-screen bg-fill-one">
      {/* 页面标题区域 */}
      <section className="lg:px-30 px-5 pt-10 pb-5">
        <h1 className="headline1 text-black">{pageTitle}</h1>
        <p className="text-display text-neutral-600 mt-4 max-w-2xl">
          {pageDescription}
        </p>
      </section>

      {/* 产品网格区域 */}
      <section className="lg:px-30 px-5 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {productsData.map((product: ProductData) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              alt={product.alt}
              model={product.model}
              title={product.title}
              description={product.description}
              className="w-full"
            />
          ))}
        </div>
      </section>
    </div>
  );
}