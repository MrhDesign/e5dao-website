'use client';

import React from 'react';
import Link from 'next/link';
import Icon from './Icon';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fill-three">
      <div className="lg:px-30 px-5 flex flex-col gap-5">
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
                href="/solutions/carbon-fiber"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Carbon Fiber Overall Solution Plan
              </Link>
              <Link
                href="/solutions/carbon-fiber-2"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Carbon Fiber Overall Solution Plan
              </Link>
            </div>
          </div>

          {/* Products Column */}
          <div>
              <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">Products</h3>
            <div className="space-y-3">
              <Link
                href="/products/medical-box"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Medical box body combination
              </Link>
              <Link
                href="/products/communication-box"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Communication box body
              </Link>
            </div>
          </div>

          {/* About US & Contact Column */}
          <div>
             <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">About US</h3>
            <div className="space-y-3">
              <Link
                href="/about/culture"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Business Culture
              </Link>
              <Link
                href="/about/qualification"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Certificate of Qualification
              </Link>
            </div>
          </div>

          <div>
             <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Icon name="phone-line" className="text-text-display flex-shrink-0" />
                <span className="text-text-display">Tel: 20-23124324</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="mail-line" className="text-text-display flex-shrink-0" />
                <a
                  href="mailto:info@e50dao.com"
                  className="text-text-display hover:text-text-black transition-colors"
                >
                  Email: info@e50dao.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="building-2-line" className="text-text-display flex-shrink-0" />
                <span className="text-text-display">Address: Singapore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="lg:py-10 py-5 border-t border-border-one text-center">
            <span className="text-text-display  lg:text-left">
              Copyright © {currentYear} Vazyme International LLC. All Rights Reserved
            </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;