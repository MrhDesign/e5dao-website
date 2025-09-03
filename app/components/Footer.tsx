'use client';

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
                href="/solution/command-system"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Carbon Fiber Modular Mobile Command Post System
              </Link>
              <Link
                href="/solution/treatment-system"
                className="block text-text-display hover:text-text-black transition-colors"
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
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Command System Products
              </Link>
              <Link
                href="/products/treatment-system"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Medical Treatment Products
              </Link>
              <Link
                href="/products/universal-gear"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Universal Gear Series
              </Link>
            </div>
          </div>

          <div>
            <Link
              href="/news"
              className="block text-text-display hover:text-text-black transition-colors"
            >
              <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">News</h3>
            </Link>

            <div className="space-y-3">
              <Link
                href="/news/articles"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                articles
              </Link>
              <Link
                href="/news/applications"
                className="block text-text-display hover:text-text-black transition-colors"
              >
                Industry Applications
              </Link>
            </div>
          </div>

          <div>
            <Link
              href="/contact"
              className="block text-text-display hover:text-text-black transition-colors mb-3"
            >
              <h3 className="text-lg font-semibold text-text-black lg:mb-5 mb-2.5">Contact</h3>
            </Link>
            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <Icon name="phone-line" className="text-text-display flex-shrink-0" />
                <span className="text-text-display">Tel: +65-6xxx-xxxx</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="mail-line" className="text-text-display flex-shrink-0" />
                <a
                  href="mailto:info@e5dao.com"
                  className="text-text-display hover:text-text-black transition-colors"
                >
                  Email: info@e5dao.com
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
            Copyright © {currentYear} E5DAO Singapore. All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;