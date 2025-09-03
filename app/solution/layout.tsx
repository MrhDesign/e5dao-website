'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContent } from '@/lib/useContent';

export default function SolutionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { getContent } = useContent();

    const solutionCategories = getContent('solution.categories') || [];

    const navigationItems = solutionCategories.map((category: any) => ({
        id: category.slug,
        title: category.title,
        href: `/solution/${category.slug}`
    }));

    return (
        <div className="">
            {/* 主内容区域 - 左右分栏布局 */}
            <div className="lg:px-30 px-5 pb-20">
                <div className="flex flex-col lg:flex-row lg:gap-5 lg:items-start">

                    {/* 左侧分类导航 */}
                    <aside className="hidden lg:block lg:w-60 w-full shrink-0 sticky top-[100px]">
                        <div className="pr-5 pb-10 border-r border-border-one">
                            <nav>
                                <ul className="space-y-2">
                                    {navigationItems.map((item: any) => {
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
        </div>
    );
}