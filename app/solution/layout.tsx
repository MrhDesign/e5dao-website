'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContent } from '@/lib/useContent';
import NewCard from '../components/NewCard';
import type { ApplicationItem } from '@/lib/types';

export default function SolutionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { getContent } = useContent();

    const solutionCategories = getContent<{id: number, title: string, slug: string}[]>('solution.categories') || [];

    const navigationItems = solutionCategories.map((category) => ({
        id: category.slug,
        title: category.title,
        href: `/solution/${category.slug}`
    }));

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

            {/* Industry Application Section */}
            <div className="lg:px-30 px-5">
                <div className="flex flex-col lg:py-20 py-5">
                    <h1 className="headline1 leading-10 lg:pb-10 pb-2.5">Industry Application</h1>
                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-0 gap-y-5">
                        {(() => {
                            const applications = getContent<ApplicationItem[]>('industryApplications.items') || [];
                            return applications.slice(0, 4).map((application: ApplicationItem) => (
                                <NewCard
                                    key={application.id}
                                    image={application.image}
                                    alt={application.alt}
                                    year={application.publishedDate?.year}
                                    date={`${application.publishedDate?.month}/${application.publishedDate?.day}`}
                                    title={application.title}
                                    description={application.description}
                                    slug={application.slug}
                                    linkType="application"
                                    className="news-card"
                                />
                            ));
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
}