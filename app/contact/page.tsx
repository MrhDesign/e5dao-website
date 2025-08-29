'use client';

import ContactForm from "../components/ContactForm";
import ProcessFlow from "../components/ProcessFlow";
import MapComponent from "../components/MapComponent";
import useContent from "../../lib/useContent";

export default function Contact() {
  const { getContent } = useContent();

  // 公司位置坐标 (请根据实际位置修改)
  const companyLocation = {
    latitude: 31.2304,    // 上海纬度示例
    longitude: 121.4737,  // 上海经度示例
    name: "E5DAO",
    address: "上海市浦东新区" // 请根据实际地址修改
  };

  return (
    <section className='px-30 pb-20 bg-fill-two lg:process-section'>
      <h1 className="text-[100px] italic font-black py-20 lg:text-left">Contact</h1>

      <div className='flex lg:flex-row flex-col lg:gap-[100px] gap-10'>
        <div className="lg:w-[640px] lg:headline2 text-2xl">
          <p className='lg:mb-10 mb-5'>- Standard Products</p>
          <p className='mb-5'>- Customization Process</p>
          <ProcessFlow />
        </div>
        <div className="flex-1 lg:bg-fill-white lg:p-10 rounded-l-sm">
          <h1 className='headline1 mb-8'>Any Query? Please contact us</h1>
          <ContactForm className="contact-form" />
        </div>
      </div>

      {/* 地图组件 */}
      {/* <div className="mt-20">
        <h2 className="headline1 mb-8">Find Us</h2>
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
          <MapComponent
            latitude={companyLocation.latitude}
            longitude={companyLocation.longitude}
            companyName={companyLocation.name}
            address={companyLocation.address}
            className="w-full h-full"
          />
        </div>
      </div> */}
    </section>
  );
}