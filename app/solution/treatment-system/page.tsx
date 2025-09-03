'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useContent } from '@/lib/useContent';
import ProductCard from '../../components/ProductCard';
import type { Product } from '@/lib/types';

export default function TreatmentSystemPage() {
  const { getContent } = useContent();
  const treatmentData = useMemo(() => 
    getContent('solution.treatmentSystem'), 
    [getContent]
  );

  return (
    <div className="lg:pt-10 pt-5">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="relative h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
          <Image
            src={treatmentData?.hero?.image || '/images/treatment-system-hero.png'}
            alt={treatmentData?.hero?.title || 'Medical Treatment System'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Modular Containerized Medical Treatment System
            </h1>
            <p className="text-lg opacity-90">
              Advanced portable medical facilities for critical care
            </p>
          </div>
        </div>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          State-of-the-art modular medical treatment systems designed for rapid deployment in emergency situations. 
          Our carbon fiber containerized units provide fully equipped medical facilities that can be quickly 
          transported and assembled to deliver critical care in remote or disaster-affected areas.
        </p>
      </div>

      {/* System Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          System Overview
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            Our modular containerized medical treatment system represents a breakthrough in portable healthcare 
            infrastructure. Each unit is constructed using advanced carbon fiber composites, ensuring maximum 
            strength while maintaining minimal weight. The system is designed to provide comprehensive medical 
            care capabilities in challenging environments where traditional medical facilities are unavailable 
            or compromised.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-red-600 rounded" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Rapid Deployment
            </h3>
            <p className="text-gray-600 text-sm">
              Quick setup and deployment in emergency situations with minimal setup time required.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Modular Design
            </h3>
            <p className="text-gray-600 text-sm">
              Configurable modules that can be combined to create customized medical facilities.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-green-600 rounded" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Advanced Materials
            </h3>
            <p className="text-gray-600 text-sm">
              Carbon fiber construction provides superior strength-to-weight ratio and durability.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-yellow-600 rounded" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Climate Control
            </h3>
            <p className="text-gray-600 text-sm">
              Integrated HVAC systems maintain optimal conditions for medical procedures.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Power Systems
            </h3>
            <p className="text-gray-600 text-sm">
              Self-contained power generation and backup systems ensure continuous operation.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-indigo-600 rounded" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Medical Equipment
            </h3>
            <p className="text-gray-600 text-sm">
              Pre-installed medical equipment and storage systems for comprehensive care delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Module Configurations */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Module Configurations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h3 className="text-xl font-semibold text-white">Emergency Care Module</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-gray-700">
                <li>• Emergency treatment bay</li>
                <li>• Trauma stabilization equipment</li>
                <li>• Diagnostic imaging capabilities</li>
                <li>• Patient monitoring systems</li>
                <li>• Emergency medication storage</li>
              </ul>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
              <h3 className="text-xl font-semibold text-white">Surgical Module</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-gray-700">
                <li>• Sterile operating theater</li>
                <li>• Surgical equipment suite</li>
                <li>• Anesthesia systems</li>
                <li>• LED surgical lighting</li>
                <li>• Instrument sterilization unit</li>
              </ul>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <h3 className="text-xl font-semibold text-white">Recovery Module</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-gray-700">
                <li>• Patient recovery beds</li>
                <li>• Vital sign monitoring</li>
                <li>• IV fluid management</li>
                <li>• Oxygen delivery systems</li>
                <li>• Nurse station with communications</li>
              </ul>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
              <h3 className="text-xl font-semibold text-white">Support Module</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-gray-700">
                <li>• Medical supplies storage</li>
                <li>• Pharmacy and medication prep</li>
                <li>• Staff rest area</li>
                <li>• Water treatment system</li>
                <li>• Waste management system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Technical Specifications
        </h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Container Specifications</h3>
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-medium">Material:</span> Carbon Fiber Composite</li>
                <li><span className="font-medium">Dimensions:</span> Standard ISO Container Compatible</li>
                <li><span className="font-medium">Weight:</span> 50% lighter than steel equivalent</li>
                <li><span className="font-medium">Setup Time:</span> &lt; 30 minutes per module</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-medium">Temperature:</span> -40°C to +60°C operating range</li>
                <li><span className="font-medium">Insulation:</span> High-performance thermal barrier</li>
                <li><span className="font-medium">Sealing:</span> Weatherproof and dust-tight</li>
                <li><span className="font-medium">Ventilation:</span> Filtered air circulation system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-5">
          {useMemo(() => {
            const productsData = getContent<Product[]>('products.items') || [];
            // 筛选出 treatment-system 分类的自研产品 (categoryId = 2 && productType = 'independent-rd')
            const treatmentSystemProducts = productsData.filter((product: Product) => 
              product.categoryId === 2 && product.productType === 'independent-rd'
            );
            
            return treatmentSystemProducts.map((product: Product, index: number) => (
              <ProductCard
                key={`treatment-product-${product.id || index}`}
                product={product}
                variant="solution"
                className="w-full"
              />
            ));
          }, [getContent])}
        </div>
      </div>

      {/* Applications */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">Disaster Response</h3>
            <p className="text-red-800">
              Emergency medical care in natural disasters, providing immediate medical support where infrastructure is damaged.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Military Medical Support</h3>
            <p className="text-blue-800">
              Forward medical facilities for military operations, providing surgical and emergency care in combat zones.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Remote Healthcare</h3>
            <p className="text-green-800">
              Medical services in remote areas lacking permanent healthcare infrastructure or during humanitarian missions.
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">Event Medical Support</h3>
            <p className="text-yellow-800">
              Temporary medical facilities for large events, construction sites, or other situations requiring on-site medical care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}