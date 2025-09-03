'use client';

import ContactForm from "../components/ContactForm";
import ProcessFlow from "../components/ProcessFlow";

export default function Contact() {

  return (
    <section className='lg:px-30 lg:pb-20 p-5 bg-fill-two lg:process-section'>
      <h1 className="text-[32px] lg:text-[100px] italic font-black lg:py-10 py-5">Contact</h1>

      <div className='flex lg:flex-row flex-col lg:gap-[100px] gap-10'>
        <div className="lg:w-[640px] lg:headline2 text-2xl lg:order-1 order-3">
          <p className='lg:mb-10 mb-5'>- Standard Products</p>
          <p className='mb-5'>- Customization Process</p>
          <ProcessFlow />
        </div>
        <div className="flex-1 lg:bg-fill-white lg:p-10 rounded-l-sm lg:order-2">
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