'use client';

import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import useContent from '../../lib/useContent';

interface ProductData {
  id: number;
  image: string;
  alt: string;
  model: string;
  title: string;
  description: string;
  category?: string;
}

interface ProductCategory {
  title: string;
  products: ProductData[];
}

export default function Products() {
  const { getContent } = useContent();
  const productsData: ProductData[] = getContent('products.items') || [];
  const categoriesData = getContent('products.categories') || [];

  // 按分类组织产品数据
  const productCategories: ProductCategory[] = [
    {
      title: "All Products",
      products: productsData // 显示所有产品
    },
    // 从 content.json 中获取分类数据，并按 categoryId 分组产品
    ...categoriesData.map((category: any) => ({
      title: category.title,
      products: productsData.filter((product: any) => product.categoryId === category.id)
    }))
  ];

  // 当前选中的分类索引，默认显示所有产品
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const currentCategory = productCategories[selectedCategoryIndex];

  // 处理分类切换并滚动到顶部
  const handleCategoryChange = (index: number) => {
    setSelectedCategoryIndex(index);
    // 平滑滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <div className="">

      {/* 消失点遮罩 */}
      <div className='h-10 bg-fill-two sticky top-20 z-30'/>

      {/* 主内容区域 - 左右分栏布局 */}
      <div className="lg:px-30 px-5 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-5 lg:items-start">

          {/* 左侧分类导航 */}
          <aside className="lg:w-60 w-full shrink-0 sticky top-[120px]">
            <div className=" pr-5 pb-10 border-r border-border-one">
              {/* All Products 作为独立标题 */}
              <button
                onClick={() => handleCategoryChange(0)}
                className={`w-full text-left px-4 py-3 rounded  transition-all duration-300 ${selectedCategoryIndex === 0
                    ? ' text-text-brand'
                    : 'bg-fill-two text-text-black hover:bg-fill-three cursor-pointer'
                  }`}
              >
                <div className="font-medium text-xl">
                  All Products
                </div>
              </button>

              <nav>
                <ul className="space-y-2">
                  {productCategories.slice(1).map((category, index) => (
                    <li key={index + 1}>
                      <button
                        onClick={() => handleCategoryChange(index + 1)}
                        className={`w-full text-left px-4 py-3 rounded transition-all duration-300 ${selectedCategoryIndex === index + 1
                            ? 'bg-fill-brand text-text-white shadow-md'
                            : 'bg-fill-two text-text-black hover:bg-fill-three cursor-pointer'
                          }`}
                      >
                        <div className="font-medium text-sm mb-1">
                          {category.title}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* 右侧产品展示区域 */}
          <main className="flex-1 min-h-screen">
            {/* 当前分类标题 - 只在非All Products时显示 */}
            {selectedCategoryIndex !== 0 && (
              <div className="">
                <h1 className="headline2 py-3">{currentCategory.title}</h1>
              </div>
            )}

            {/* 根据是否是"All Products"显示不同布局 */}
            {selectedCategoryIndex === 0 ? (
              /* All Products 视图 - 按分类分组显示 */
              <div className="space-y-12">
                {productCategories.slice(1).map((category, categoryIndex) => (
                  category.products.length > 0 && (
                    <div key={categoryIndex + 1}>
                      {/* 分类标题 - 可点击切换到分类视图 */}
                      <div className="flex items-center justify-between py-3 sticky top-[120px] z-30 bg-fill-two">
                        <h2 className="headline2 text-text-black">{category.title}</h2>
                        <button 
                          onClick={() => handleCategoryChange(categoryIndex + 1)}
                          className="text-sm text-text-brand hover:text-text-black transition-colors duration-300"
                        >
                          View All →
                        </button>
                      </div>

                      {/* 该分类的产品网格 */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                        {category.products.map((product: ProductData, index: number) => (
                          <ProductCard
                            key={`all-${categoryIndex + 1}-${product.id || index}`}
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
                    </div>
                  )
                ))}
              </div>
            ) : (
              /* 单个分类视图 */
              <>
                {/* 产品网格 */}
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
                  {currentCategory.products.map((product: ProductData, index: number) => (
                    <ProductCard
                      key={`${selectedCategoryIndex}-${product.id || index}`}
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

                {/* 如果该分类没有产品 */}
                {(!currentCategory.products || currentCategory.products.length === 0) && (
                  <div className="text-center py-20">
                    <p className="text-display text-text-secondary">
                      No products available in this category yet
                    </p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}