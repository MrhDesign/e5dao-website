'use client';

import Image from 'next/image';

interface ContentSection {
  type: 'heading' | 'paragraph' | 'image' | 'list';
  content: string;
  level?: 1 | 2 | 3 | 4; // 标题级别
  image?: string;
  alt?: string;
  items?: string[]; // 简化的列表项
}

interface ContentRendererProps {
  sections: ContentSection[];
  className?: string;
}

export default function ContentRenderer({ sections, className = "" }: ContentRendererProps) {
  
  const renderSection = (section: ContentSection) => {
    switch (section.type) {
      case 'heading':
        const level = section.level || 3;
        const headingStyles = {
          1: 'text-3xl font-bold text-text-brand',
          2: 'text-2xl font-semibold text-text-brand',
          3: 'text-xl font-semibold ',
          4: 'text-lg font-medium text-text-black'
        };
        
        if (level === 1) return <h1 className={headingStyles[1]}>{section.content}</h1>;
        if (level === 2) return <h2 className={headingStyles[2]}>{section.content}</h2>;
        if (level === 3) return <h3 className={headingStyles[3]}>{section.content}</h3>;
        if (level === 4) return <h4 className={headingStyles[4]}>{section.content}</h4>;
        return <h3 className={headingStyles[3]}>{section.content}</h3>;
        
      case 'paragraph':
        return (
          <div className="prose prose-sm max-w-none text-text-black leading-relaxed">
            {section.content.split('\n').map((paragraph, pIndex) => (
              paragraph.trim() && (
                <p key={pIndex} className="mb-4">
                  {paragraph.trim()}
                </p>
              )
            ))}
          </div>
        );
        
      case 'image':
        return (
          <div className="my-6 w-full">
            <div className="aspect-auto overflow-hidden bg-fill-two lg:w-[80%] mx-auto">
              <Image
                src={section.image!}
                alt={section.alt || 'Content image'}
                width={1920}
                height={1080}
                className="object-contain"
              />
            </div>
            {section.content && (
              <p className="text-sm text-text-secondary mt-3 text-center">
                {section.content}
              </p>
            )}
          </div>
        );
        
      case 'list':
        return (
          <div className="my-4">
            {section.content && (
              <p className="text-text-black leading-relaxed mb-4">
                {section.content}
              </p>
            )}
            {section.items && (
              <ul className="space-y-2 ml-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-text-black">
                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-text-brand rounded-full mt-2"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      {sections.map((section, index) => (
        <div key={index} className="mb-6 last:mb-0">
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
}