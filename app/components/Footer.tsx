'use client';

import Link from 'next/link';
import Icon from './Icon';
import SocialMedia from './SocialMedia';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fill-three">
      <div className="lg:px-30 px-5 flex flex-col gap-5 lg:text-base text-sm">
        {/* Logo Section */}
        <div className="px-2.5 lg:pt-10 pt-5 pb-5 border-b border-border-one">
          <Icon name="Logo" className="text-[60px] text-text-black" />
        </div>

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 lg:gap-20">
          {/* Solutions Column */}
          <div className="">
            <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">Solutions</h3>
            <div className="space-y-3">
              <Link
                href="/solution/command-system"
                className="block  hover:text-text-black transition-colors"
              >
                Carbon Fiber Modular Mobile Command Post System
              </Link>
              <Link
                href="/solution/treatment-system"
                className="block  hover:text-text-black transition-colors"
              >
                Modular Containerized Medical Treatment System
              </Link>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">Products</h3>
            <div className="space-y-3">
              <Link
                href="/products/command-system"
                className="block  hover:text-text-black transition-colors"
              >
                Carbon Fiber Modular Mobile Command Post System
              </Link>
              <Link
                href="/products/treatment-system"
                className="block  hover:text-text-black transition-colors"
              >
                Modular Containerized Medical Treatment System
              </Link>
              <Link
                href="/products/universal-gear"
                className="block  hover:text-text-black transition-colors"
              >
                Universal Gear Series
              </Link>
              <Link
                href="/products/Sports-Equipment"
                className="block  hover:text-text-black transition-colors"
              >
                Sports-Equipment
              </Link>
            </div>
          </div>

          {/* <div>
            <Link
              href="/news"
              className="block  hover:text-text-black transition-colors"
            >
              <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">News</h3>
            </Link>

            <div className="space-y-3">
              <Link
                href="/news/articles"
                className="block  hover:text-text-black transition-colors"
              >
                articles
              </Link>
              隐藏 applications 链接但保留备用
              <Link
                href="/news/applications"
                className="block  hover:text-text-black transition-colors"
              >
                Industry Applications
              </Link>
             
            </div>
          </div> */}

          <div>
            <Link
              href="/contact"
              className="block  hover:text-text-black transition-colors mb-3"
            >
              <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">Contact</h3>
            </Link>
            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <Icon name="phone-line" className=" flex-shrink-0" />
                <span className="">Tel: +65 62436371</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="mail-line" className=" flex-shrink-0" />
                <a
                  href="mailto:info@e5dao.com"
                  className=" hover:text-text-black transition-colors"
                >
                  Email: info@e5dao.com
                </a>
              </div>
              <div className="">
                <Icon name="building-2-line" className=" flex-shrink-0 mr-3" />
                <span className="">Address: 2 Bukit Batok Street 24 #05-10 Skytech Singapore S659480</span>

              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">Follow us</h3>
            <SocialMedia showLabel={true} iconSize="medium" className='hidden lg:grid grid-cols-4 grid-row-2 gap-5 justify-items-center' />
            <SocialMedia showLabel={true} iconSize="small" className='grid lg:hidden grid-cols-4 grid-row-2 gap-5 justify-items-center' />
          </div>
        </div>


        {/* Bottom Section */}
        <div className="lg:py-10 py-5 border-t border-border-one text-center">
          <span className="  lg:text-left">
            Copyright © {currentYear} E5DAO Singapore. All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;