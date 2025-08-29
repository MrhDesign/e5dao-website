import Image from 'next/image';
import FeatureCard from '../components/FeatureCard';
import IndustrySection from '../components/IndustrySection';
import ProductionLineSection from '../components/ProductionLineSection';
import content from '../../lib/content.json';


export default function AboutUs() {
  return (
    <>
      <section className="lg:px-30 px-5  lg:space-y-20 space-y-5">

        {/* 标语与产品图 */}
        <div className='flex lg:pt-20 pt-5'>
          <div className="italic font-black flex flex-col justify-center lg:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px]">Global professional</h1>
            <h2 className="text-sm sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[68px]">composite material solution provider</h2>
          </div>
          <div>
            <Image
              src="/images/about-banner.png"
              alt="About Title"
              width={668}
              height={480}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* 企业特性 */}
        <div className='lg:px-10 lg:py-5 lg:bg-fill-four grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2.5 rounded-sm'>
          {content.pages.aboutUs.features.map((feature) => (
            <FeatureCard
              key={feature.id}
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* 公司介绍 */}
        <div className='flex lg:flex-row flex-col lg:gap-10 gap-2.5'>
          <div className='flex-1'>
            <Image
              src="/images/House.png"
              alt="About Title"
              width={800}
              height={548}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div className='flex-1'>
            <div className='lg:mb-10 mb-2.5'>
              <Image
                src="/images/about-title-2.png"
                alt="About Title"
                width={570}
                height={110}
                className="h-auto object-cover"
                priority
              />
            </div>
            <p className='text-display'>Singapore E50DAO is a technology company that focuses on the research, development, production and sales of high-end composite materials such as carbon fiber and Kevlar. The company has modern factories and a complete industrial chain service system, covering the entire process of product design, molding, manufacturing, assembly and testing. Through the deep integration of digital technology and advanced processes, E5DAO can efficiently respond to customer customization needs and provide lightweight, high-strength, and excellent weather-resistant professional composite material solutions. The products are widely used in military, aerospace, medical, rescue, outdoor equipment, and high-end transportation.</p>
          </div>
        </div>

        {/* 应用行业介绍 */}
        <div className="">
          <h2 className="text-3xl lg:text-4xl font-bold lg:mb-10 mb-2.5">Application Industries</h2>
          <IndustrySection industries={content.pages.aboutUs.industries} />
        </div>

          {/* 生产线介绍 */}
         <div className="">
          <h2 className="text-3xl lg:text-4xl font-bold lg:mb-10 mb-2.5">Production Line Showcase</h2>
          <ProductionLineSection productionLines={content.pages.aboutUs.productionLines} />
        </div>

                {/* 愿景与使命 */}
        <div className='pb-20'>
           <h2 className="text-3xl lg:text-6xl font-bold lg:text-center text-left lg:mb-5">Mission & Vision</h2>
           <p className=' text-base lg:text-3xl leading-relaxed'>To promote the global application of high-performance composite materials, building lighter, stronger,and more reliable future structures,and to become the world's most influential provider of composite material solutions.</p>
        </div>
      </section>
    </>
  );
}