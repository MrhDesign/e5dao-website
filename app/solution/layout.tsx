'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContent } from '@/lib/useContent';
import NewCard from '../components/NewCard';
import type { NewsItem } from '@/lib/types';

export default function SolutionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { getContent } = useContent();

    const navigationItems = useMemo(() => {
        const solutionCategories = getContent<{id: number, title: string, slug: string}[]>('solution.categories') || [];
        return solutionCategories.map((category) => ({
            id: category.slug,
            title: category.title,
            href: `/solution/${category.slug}`
        }));
    }, [getContent]);

    return (
        <div className="">
            {/* 主内容区域 - 左右分栏布局 */}
            <div className="lg:px-30 px-5">
                <div className="flex flex-col lg:flex-row lg:gap-5 lg:items-start">

                    {/* 左侧分类导航 */}
                    <aside className="hidden lg:block lg:w-60 w-full shrink-0 sticky top-[100px]">
                        <div className="pr-5 pb-10 border-r border-border-one">
                            <nav>
                                <ul className="space-y-2">
                                    {navigationItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <li key={item.id}>
                                                <Link
                                                    href={item.href}
                                                    className={`w-full text-left px-4 py-3 rounded transition-all duration-300 block ${isActive
                                                        ? 'bg-fill-brand text-text-white shadow-md'
                                                        : 'bg-fill-two text-text-black hover:bg-fill-three cursor-pointer'
                                                        }`}
                                                >
                                                    <div className="font-medium text-sm">
                                                        {item.title}
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* 右侧内容展示区域 */}
                    <section className="flex-1 pt-5">
                        {children}
                    </section>

                </div>
            </div>

            {/* Related News Section */}
            <div className="lg:px-30 px-5">
                <div className="flex flex-col lg:py-20 py-5">
                    <h1 className="headline1 leading-10 lg:pb-10 pb-2.5">Related News</h1>
                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-0 gap-y-5">
                        {useMemo(() => {
                            const articles = getContent<NewsItem[]>('news.articles') || [];
                            return articles.slice(0, 4).map((article: NewsItem) => (
                                <NewCard
                                    key={article.id}
                                    image={article.image}
                                    alt={article.alt}
                                    year={article.publishedDate?.year}
                                    date={`${article.publishedDate?.month}/${article.publishedDate?.day}`}
                                    title={article.title}
                                    description={article.description}
                                    slug={article.slug}
                                    linkType="news"
                                    className="news-card"
                                />
                            ));
                        }, [getContent])}
                    </div>
                </div>
            </div>
        </div>
    );
}