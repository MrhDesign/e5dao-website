import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/iconfont.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import { generatePageMetadata, PageType, generateStructuredData } from "../lib/global-metadata-generator";
import { generateHreflangTags } from "../lib/i18n-seo";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: "E5DAO - Professional Carbon Fiber Composite Solutions | Singapore",
    description: "Leading Singapore-based manufacturer of high-performance carbon fiber composite materials. Specializing in mobile command systems, emergency medical equipment, and aerospace-grade protective solutions for defense, medical, and industrial applications.",
    keywords: [
      "carbon fiber manufacturer Singapore",
      "composite materials supplier", 
      "mobile command post system",
      "emergency medical equipment",
      "aerospace grade materials",
      "defense equipment",
      "tactical solutions",
      "medical device protection",
      "lightweight materials"
    ],
    type: PageType.HOME,
    url: "/",
    image: "/images/homepage-hero.jpg"
  }),
  title: {
    default: "E5DAO - Professional Carbon Fiber Composite Solutions | Singapore",
    template: "%s | E5DAO"
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://e5dao.com'),
  category: 'Manufacturing',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 生成全局结构化数据
  const organizationData = generateStructuredData({
    type: 'Organization',
    data: {
      name: 'E5DAO',
      description: 'Leading Singapore-based manufacturer of high-performance carbon fiber composite materials',
      foundingDate: '2020',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SG',
        addressLocality: 'Singapore'
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          areaServed: ['SG', 'MY', 'TH', 'ID', 'VN', 'PH', 'Global'],
          availableLanguage: ['English', 'Chinese']
        },
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          areaServed: ['SG', 'MY', 'TH', 'ID', 'VN', 'PH'],
          availableLanguage: ['English', 'Chinese']
        }
      ],
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Carbon Fiber Mobile Command System',
            category: 'Defense Equipment'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product', 
            name: 'Emergency Medical System',
            category: 'Medical Equipment'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Aerospace Carbon Fiber Components',
            category: 'Aerospace Materials'
          }
        }
      ],
      knowsAbout: [
        'Carbon Fiber Manufacturing',
        'Composite Materials',
        'Defense Equipment',
        'Medical Device Protection',
        'Aerospace Materials',
        'Emergency Response Systems'
      ]
    }
  });

  const websiteData = generateStructuredData({
    type: 'WebSite',
    data: {
      name: 'E5DAO',
      alternateName: 'E5DAO New Material',
      description: 'Professional carbon fiber composite solutions for defense, medical, and aerospace industries',
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://e5dao.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    }
  });

  return (
    <html lang="en">
      <head>
        <StructuredData data={organizationData} />
        <StructuredData data={websiteData} />
      </head>
      <body className="">
        <Header />
        <main className="lg:pt-20 pt-12 w-screen min-h-[calc(100vh-520px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
