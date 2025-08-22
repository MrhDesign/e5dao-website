'use client';

import React from 'react';
import Link from 'next/link';
import Icon from './Icon';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fill-three">
      <div className="lg:px-30 px-5 py-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-10 lg:gap-20">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="mb-8">
              <Icon name="Logo" className="text-4xl text-text-black" />
              <div className="text-lg font-medium text-text-black mt-2">E50DAO</div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-text-black mb-6">Solutions</h3>
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
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-text-black mb-6">Products</h3>
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
          <div className="flex flex-col">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-text-black mb-6">About US</h3>
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
              <h3 className="text-lg font-semibold text-text-black mb-6">Contact</h3>
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
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border-one">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-text-display text-center lg:text-left">
              Copyright © {currentYear} Vazyme International LLC. All Rights Reserved
            </div>
            <div className="flex gap-6">
              <Link 
                href="/privacy-policy" 
                className="text-text-display hover:text-text-black transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-use" 
                className="text-text-display hover:text-text-black transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;