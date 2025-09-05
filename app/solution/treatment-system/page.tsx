'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useContent } from '@/lib/useContent';
import ProductCard from '../../components/ProductCard';
import type { Product } from '@/lib/types';

interface Point {
  SubTitle?: string;
  Description: string;
}

interface Feature {
  Title: string;
  Points: Point[];
}

interface MedicalTreatment {
  hero?: {
    image: string;
    alt: string;
  };
  overview?: {
    title: string;
    content: string;
  };
  features?: {
    title: string;
    A: Feature;
    B: Feature;
    C: Feature;
  };
  Components?: {
    title: string;
  };
}

export default function CommandSystemPage() {
  const { getContent } = useContent();
  const MedicalTreatment = useMemo(() =>
    getContent<MedicalTreatment>('solution.medicalTreatment'),
    [getContent]
  );

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      {MedicalTreatment?.hero?.image && (
        <div className="relative h-50 md:h-100 mb-8 overflow-hidden">
          <Image
            src={MedicalTreatment.hero.image}
            alt={MedicalTreatment.hero.alt || 'Mobile Command Station System'}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* System Overview */}
      <div className="">

        <h1 className="headline1 text-text-brand mb-5">
          {MedicalTreatment?.overview?.title}
        </h1>
        <div className="space-y-5">
          {MedicalTreatment?.overview?.content?.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index} className="text-display">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-8">
        <h2 className='lg:text-4xl text-xl font-medium'>
          {MedicalTreatment?.features?.title}
        </h2>

        {/* System Features */}
        {MedicalTreatment?.features && (
          <div className="space-y-5 lg:space-y-10">
            {(['A', 'B', 'C'] as const).map((key) => {
              const feature = MedicalTreatment.features![key];
              if (!feature) return null;

              return (
                <div key={key} className="">
                  <h3 className="lg:text-2xl text-base font-medium text-text-brand mb-2.5 lg:mb-5">
                    {feature.Title}
                  </h3>

                  <div className="space-y-6">
                    {feature.Points.map((point, index) => (
                      <div key={index} className="">
                        {point.SubTitle && (
                          <h4 className="text-base lg:text-lg font-medium text-text-black mb-3">
                            {point.SubTitle}
                          </h4>
                        )}
                        <p className="text-display leading-relaxed">
                          {point.Description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Emergency Medical Systems Information Table */}
        <div className="flex justify-center">
          <div className="bg-fill-brand rounded-sm">
            <h3 className="text-xl lg:text-2xl font-semibold text-text-white py-5 text-center">
              Key Information Table of Emergency Medical Systems
            </h3>

            <div className="overflow-hidden border border-border-one">
              <table className="w-full hidden lg:block">
                <thead>
                  <tr className="bg-slate-300">
                    <th className="px-4 py-3 text-left text-sm lg:text-base font-semibold text-text-black border-r border-border-one">
                      System Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm lg:text-base font-semibold text-text-black border-r border-border-one">
                      Core Function
                    </th>
                    <th className="px-4 py-3 text-left text-sm lg:text-base font-semibold text-text-black border-r border-border-one">
                      Technological Highlights
                    </th>
                    <th className="px-4 py-3 text-left text-sm lg:text-base font-semibold text-text-black">
                      Application Scenario
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-border-one">
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one font-medium">
                      All-in-One Emergency Module
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one">
                      Life Support + Monitoring + Resuscitation
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one">
                      10-minute setup<br />
                      8 types of emergency equipment
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base">
                      <span className="bg-yellow-300 px-2 py-1 rounded text-text-black font-medium">
                        Peacekeeping Battlefield
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-border-one bg-slate-50">
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one font-medium">
                      Carbon-Fiber Hospital Kits
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one">
                      Secondary Hospital (Surgery/Testing/Imaging)
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one">
                      31 kits set<br />
                      carbon fiber reduces weight<br />
                      self-powered/water
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black">
                      Disaster Sites
                    </td>
                  </tr>
                  <tr className="border-b border-border-one">
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one font-medium">
                      Maritime Mobile ICU Kit
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one">
                      Respiration + Monitoring + Defibrillation + Ultrasound
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one">
                      Handbag size<br />
                      shockproof design
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black">
                      Maritime Rescue
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one font-medium">
                      Multifunctional Treatment Expert System
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one">
                      Trauma Intelligent Diagnosis (6 Treatment Units)
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black border-r border-border-one">
                      Wireless central control<br />
                      AI-recommended plans
                    </td>
                    <td className="px-4 py-4 text-sm lg:text-base text-text-black">
                      Battlefield Trauma Treatment
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 手机端卡片式布局 */}
              <div className="block lg:hidden bg-white">
                  {/* All-in-One Emergency Module */}
                  <div className="border-b border-border-one p-4 bg-white">
                    <div className="mb-3">
                      <h4 className="text-base font-semibold text-text-brand mb-2">All-in-One Emergency Module</h4>
                      <div className="flex justify-end">
                        <span className="bg-yellow-300 px-2 py-1 rounded text-xs text-text-black font-medium">
                          Peacekeeping Battlefield
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-text-black">Core Function:</span>
                        <p className="text-text-display mt-1">Life Support + Monitoring + Resuscitation</p>
                      </div>
                      <div>
                        <span className="font-medium text-text-black">Technological Highlights:</span>
                        <div className="text-text-display mt-1">
                          <p>• 10-minute setup</p>
                          <p>• 8 types of emergency equipment</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Carbon-Fiber Hospital Kits */}
                  <div className="border-b border-border-one p-4 bg-slate-50">
                    <div className="mb-3">
                      <h4 className="text-base font-semibold text-text-brand mb-2">Carbon-Fiber Hospital Kits</h4>
                      <div className="flex justify-end">
                        <span className="bg-gray-200 px-2 py-1 rounded text-xs text-text-black font-medium">
                          Disaster Sites
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-text-black">Core Function:</span>
                        <p className="text-text-display mt-1">Secondary Hospital (Surgery/Testing/Imaging)</p>
                      </div>
                      <div>
                        <span className="font-medium text-text-black">Technological Highlights:</span>
                        <div className="text-text-display mt-1">
                          <p>• 31 kits set</p>
                          <p>• carbon fiber reduces weight</p>
                          <p>• self-powered/water</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Maritime Mobile ICU Kit */}
                  <div className="border-b border-border-one p-4 bg-white">
                    <div className="mb-3">
                      <h4 className="text-base font-semibold text-text-brand mb-2">Maritime Mobile ICU Kit</h4>
                      <div className="flex justify-end">
                        <span className="bg-blue-200 px-2 py-1 rounded text-xs text-text-black font-medium">
                          Maritime Rescue
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-text-black">Core Function:</span>
                        <p className="text-text-display mt-1">Respiration + Monitoring + Defibrillation + Ultrasound</p>
                      </div>
                      <div>
                        <span className="font-medium text-text-black">Technological Highlights:</span>
                        <div className="text-text-display mt-1">
                          <p>• Handbag size</p>
                          <p>• shockproof design</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Multifunctional Treatment Expert System */}
                  <div className="p-4 bg-slate-50">
                    <div className="mb-3">
                      <h4 className="text-base font-semibold text-text-brand mb-2">Multifunctional Treatment Expert System</h4>
                      <div className="flex justify-end">
                        <span className="bg-red-200 px-2 py-1 rounded text-xs text-text-black font-medium">
                          Battlefield Trauma Treatment
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-text-black">Core Function:</span>
                        <p className="text-text-display mt-1">Trauma Intelligent Diagnosis (6 Treatment Units)</p>
                      </div>
                      <div>
                        <span className="font-medium text-text-black">Technological Highlights:</span>
                        <div className="text-text-display mt-1">
                          <p>• Wireless central control</p>
                          <p>• AI-recommended plans</p>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-display leading-relaxed">
          Kit-based medical systems redefine emergency medicine’s spatiotemporal boundaries by condensing hospital-level capabilities into tactical platforms, securing critical therapeutic windows in logistics-denied environments. Converging breakthroughs in materials science and digital technologies will drive evolution toward lighter, faster, and smarter systems – cementing their role as force-multiplying infrastructure within national emergency support architectures.
        </p>

        <h2 className='lg:text-4xl text-xl font-medium'>
          {MedicalTreatment?.Components?.title}
        </h2>



        {/* 相关产品展示 */}
        <div className="flex flex-col lg:gap-10 gap-5">
          {useMemo(() => {
            const productsData = getContent<Product[]>('products.items') || [];
            // 筛选出 treatment-system 分类的产品 (categoryId = 2)，只显示前8个
            const medicalProducts = productsData
              .filter((product: Product) => product.categoryId === 2)
              .slice(0, 8);

            return medicalProducts.map((product: Product, index: number) => (
              <ProductCard
                key={`medical-product-${product.id || index}`}
                product={product}
                variant="solution"
                className="w-full"
              />
            ));
          }, [getContent])}
        </div>
      </div>
    </div>
  );
}