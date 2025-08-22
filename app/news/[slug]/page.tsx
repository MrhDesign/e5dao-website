'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../components/Button';
import Breadcrumb, { BreadcrumbItem } from '../../components/Breadcrumb';

interface NewsArticle {
  id: number;
  slug: string;
  image: string;
  alt: string;
  year: string;
  date: string;
  title: string;
  description: string;
  content: string;
  author?: string;
  category?: string;
}

// 模拟新闻数据（实际项目中应该从API或数据库获取）
const allNewsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: "carbon-fiber-advantages",
    image: "/images/House.png",
    alt: "Carbon Fiber Building",
    year: "2025",
    date: "June 11",
    title: "What are the advantages of using carbon fiber?",
    description: "Carbon fiber offers numerous advantages, including remarkable strength-to-weight ratio, resistance to corrosion, and excellent fatigue properties.",
    content: `
      <p>Carbon fiber has revolutionized industries ranging from aerospace to automotive, offering unprecedented performance characteristics that make it one of the most sought-after materials in modern engineering.</p>
      
      <h2>Exceptional Strength-to-Weight Ratio</h2>
      <p>One of the most significant advantages of carbon fiber is its remarkable strength-to-weight ratio. Carbon fiber composites can be up to five times stronger than steel while being significantly lighter. This property makes it invaluable in applications where weight reduction is critical, such as in aircraft, racing cars, and high-performance sports equipment.</p>
      
      <h2>Corrosion Resistance</h2>
      <p>Unlike metals, carbon fiber does not rust or corrode when exposed to moisture, chemicals, or extreme environmental conditions. This resistance to corrosion makes it ideal for marine applications, chemical processing equipment, and infrastructure in harsh environments.</p>
      
      <h2>Fatigue Properties</h2>
      <p>Carbon fiber exhibits excellent fatigue properties, meaning it can withstand repeated loading and unloading cycles without significant degradation. This characteristic is crucial in applications where components are subject to constant stress variations, such as wind turbine blades and aircraft components.</p>
      
      <h2>Design Flexibility</h2>
      <p>The manufacturing process of carbon fiber allows for complex geometries and intricate designs that would be difficult or impossible to achieve with traditional materials. This flexibility enables engineers to optimize component design for specific performance requirements.</p>
      
      <h2>Applications Across Industries</h2>
      <p>Today, carbon fiber is used extensively in:</p>
      <ul>
        <li>Aerospace industry for aircraft structures and components</li>
        <li>Automotive sector for lightweight vehicle parts</li>
        <li>Sports equipment including bicycles, tennis rackets, and golf clubs</li>
        <li>Renewable energy for wind turbine blades</li>
        <li>Construction for structural reinforcement</li>
      </ul>
      
      <h2>Future Outlook</h2>
      <p>As manufacturing processes continue to improve and costs decrease, we can expect to see even broader adoption of carbon fiber across various industries. The development of recycling technologies for carbon fiber is also opening new possibilities for sustainable applications.</p>
    `,
    author: "Dr. Maria Chen",
    category: "Materials Science"
  },
  {
    id: 2,
    slug: "modern-construction-materials",
    image: "/images/House.png",
    alt: "Advanced Materials",
    year: "2025",
    date: "June 10",
    title: "Revolutionary Materials in Modern Construction",
    description: "Modern construction industry is witnessing a revolution with advanced materials offering superior performance, sustainability, and cost-effectiveness.",
    content: `
      <p>The construction industry is undergoing a significant transformation driven by innovative materials that promise to reshape how we build and design structures for the future.</p>
      
      <h2>Advanced Composite Materials</h2>
      <p>Modern composites combine multiple materials to create superior properties that exceed those of individual components. These materials offer enhanced durability, reduced weight, and improved thermal performance.</p>
      
      <h2>Smart Materials</h2>
      <p>Self-healing concrete, shape-memory alloys, and thermochromic materials are revolutionizing construction by providing adaptive capabilities that respond to environmental changes.</p>
      
      <h2>Sustainable Solutions</h2>
      <p>Bio-based materials and recycled composites are becoming increasingly important as the industry moves toward more sustainable construction practices.</p>
    `,
    author: "James Rodriguez",
    category: "Construction Technology"
  },
  {
    id: 3,
    slug: "sustainable-technology-solutions",
    image: "/images/House.png",
    alt: "Sustainable Technology",
    year: "2025",
    date: "June 09",
    title: "Sustainable Technology Solutions for Tomorrow",
    description: "Sustainability is at the forefront of technological advancement. From renewable energy integration to eco-friendly manufacturing processes.",
    content: `
      <p>Sustainable technology is no longer just an option—it's becoming a necessity as we face global environmental challenges and resource constraints.</p>
      
      <h2>Renewable Energy Integration</h2>
      <p>Advanced materials are enabling more efficient solar panels, wind turbines, and energy storage systems, making renewable energy more viable and cost-effective.</p>
      
      <h2>Eco-Friendly Manufacturing</h2>
      <p>New manufacturing processes reduce waste, energy consumption, and environmental impact while maintaining high-quality standards.</p>
    `,
    author: "Dr. Sarah Johnson",
    category: "Sustainability"
  },
  {
    id: 4,
    slug: "innovation-hub-technologies",
    image: "/images/House.png",
    alt: "Innovation Hub",
    year: "2025",
    date: "June 08",
    title: "Innovation Hub: Driving Future Technologies",
    description: "Our innovation hub serves as the catalyst for breakthrough technologies, bringing together researchers, engineers, and visionaries.",
    content: `
      <p>Innovation hubs are becoming the cornerstone of technological advancement, fostering collaboration between academia, industry, and government to drive breakthrough innovations.</p>
      
      <h2>Collaborative Research</h2>
      <p>By bringing together diverse expertise, innovation hubs accelerate the development of cutting-edge technologies and solutions.</p>
      
      <h2>Technology Transfer</h2>
      <p>These hubs facilitate the transition of research discoveries into practical applications that benefit society and industry.</p>
    `,
    author: "Prof. Michael Zhang",
    category: "Innovation"
  }
];

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const article = allNewsArticles.find(article => article.slug === slug);
  
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="headline1 mb-4">Article Not Found</h1>
          <p className="text-display mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // 创建面包屑导航项
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'News',
      href: '/news'
    },
    {
      label: article.title,
      isCurrentPage: true
    }
  ];

  return (
    <main className="min-h-screen bg-fill-one">
      {/* Hero Section */}
      <section className="relative lg:h-96 h-64 overflow-hidden">
        <Image
          src={article.image}
          alt={article.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-5">
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="text-2xl font-bold">{article.year}</span>
              <span className="text-lg">{article.date}</span>
              {article.category && (
                <span className="bg-fill-brand text-white px-3 py-1 rounded-full text-sm">
                  {article.category}
                </span>
              )}
            </div>
            <h1 className="headline1 text-white">{article.title}</h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section className="bg-fill-two">
        <div className="lg:px-30 px-5 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </section>

      {/* Article Content */}
      <section className="lg:px-30 px-5 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Article Meta */}
          <div className="mb-8 pb-8 border-b border-border-one">
            <p className="text-display text-lg mb-6">{article.description}</p>
            {article.author && (
              <div className="flex items-center gap-2 text-text-display">
                <span>By</span>
                <span className="font-medium text-text-black">{article.author}</span>
              </div>
            )}
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none text-display"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Back to Home Button */}
          <div className="mt-12 pt-8 border-t border-border-one">
            <Link href="/">
              <Button>← Back to Home</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}