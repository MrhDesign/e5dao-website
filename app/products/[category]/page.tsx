'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import useContent from '../../../lib/useContent';

interface ProductData {
  id: number;
  image: string;
  alt: string;
  model: string;
  title: string;
  description: string;
  categoryId: number;
}

interface ProductCategory {
  id?: number;
  title: string;
  slug: string;
  products: ProductData[];
}

export default function ProductsPage() {
  const params = useParams();
  const { getContent } = useContent();
  const categorySlug = params.category as string;

  const productsData: ProductData[] = getContent('products.items') || [];
  const categoriesData = getContent('products.categories') || [];

  // 构建所有分类（包括 All Products）
  const allCategories: ProductCategory[] = [
    {
      title: "All Products",
      slug: "all",
      products: productsData
    },
    ...categoriesData.map((category: any) => ({
      id: category.id,
      title: category.title,
      slug: category.slug,
      products: productsData.filter((product: any) => product.categoryId === category.id)
    }))
  ];

  // 找到当前选中的分类
  const currentCategory = allCategories.find(cat => cat.slug === categorySlug);

  // 如果分类未找到，显示错误
  if (!currentCategory) {
    return <div>Category not found</div>;
  }


  return (
    <div className="">

      {/* 主内容区域 - 左右分栏布局 */}
      <div className="lg:px-30 px-5 pb-20">
        <div className="flex flex-col lg:flex-row lg:gap-5 lg:items-start">

          {/* 左侧分类导航 */}
          <aside className="hidden lg:block lg:w-60 w-full shrink-0 sticky top-[136px]">
            <div className="pr-5 pb-10 border-r border-border-one">
              <nav>
                {/* All Products - 单独处理 */}
                <div className="mb-4">
                  <Link
                    href="/products/all"
                    className={`w-full text-left px-4 py-3 rounded transition-all duration-300 block ${categorySlug === 'all'
                        ? 'text-text-brand'
                        : 'bg-fill-two text-text-black hover:bg-fill-three cursor-pointer'
                      }`}
                  >
                    <div className="font-medium headline2">
                      All Products
                    </div>
                  </Link>
                </div>

                {/* 其他分类 */}
                <ul className="space-y-2">
                  {allCategories.slice(1).map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/products/${category.slug}`}
                        className={`w-full text-left px-4 py-3 rounded transition-all duration-300 block ${categorySlug === category.slug
                            ? 'bg-fill-brand text-text-white shadow-md'
                            : 'bg-fill-two text-text-black hover:bg-fill-three cursor-pointer'
                          }`}
                      >
                        <div className="font-medium text-sm">
                          {category.title}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* 右侧产品展示区域 */}
          <main className="flex-1">
            {categorySlug === 'all' ? (
              /* All Products 视图 - 按分类分组显示 */
              <div className="lg:pt-10 pt-5">
                {allCategories.slice(1).map((category) => (
                  category.products.length > 0 && (
                    <div key={category.slug}>
                      {/* 分类标题 */}
                      <div className="flex items-center justify-between py-5 sticky lg:top-20 top-10 z-30 bg-fill-two border-b border-border-one">
                        <h2 className="headline2 text-text-black">{category.title}</h2>
                        <Link href={`/products/${category.slug}`}>
                          <Button>View All</Button>
                        </Link>
                      </div>

                      {/* 该分类的产品网格 - 只显示前4个 */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-5 pt-5">
                        {category.products.slice(0, 4).map((product: ProductData, index: number) => (
                          <ProductCard
                            key={`${category.slug}-${product.id || index}`}
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
              <div className="space-y-10 lg:pt-10 pt-5">
                <div>
                  {/* 分类标题 */}
                  <div className="flex items-center justify-between py-5 z-30 bg-fill-two border-b border-border-one">
                    <h2 className="headline2 text-text-black">{currentCategory.title}</h2>
                      <Button className='invisible'>View All</Button>
                  </div>

                  {/* 该分类的产品网格 */}
                  {currentCategory.products.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-5 pt-5">
                      {currentCategory.products.map((product: ProductData, index: number) => (
                        <ProductCard
                          key={`${currentCategory.slug}-${product.id || index}`}
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
                  ) : (
                    /* 空状态 */
                    <div className="text-center py-20">
                      <p className="text-display text-text-secondary">
                        No products available in this category yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}