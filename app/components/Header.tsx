'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Solution', href: '/solution' },
    { name: 'Products', href: '/products' },
    { name: 'News', href: '/news' },
    { name: 'About Us', href: '/aboutUs' },
  ];

  const isCurrentPage = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="fixed w-full z-50 bg-fill-one/95 backdrop-blur-md lg:px-10 px-5 lg:h-20 h-12 ">
      <div className="h-full">
        <div className="w-full h-full flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
          <Icon name="Logo" className="lg:text-[60px] text-[36px]" />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative navbtn flex justify-center h-20 px-2 pt-8 pb-5 transition-colors duration-200 group ${
                  isCurrentPage(item.href)
                    ? 'text-text-brand'
                    : 'text-text-title hover:text-text-brand'
                }`}
              >
                {item.name}
                {/* Bottom line - grows from center to both ends */}
                <span 
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-fill-brand transition-all duration-300 ease-out ${
                    isCurrentPage(item.href) 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full bg-fill-brand'
                  }`}
                />
              </a>
            ))}
          </div>
          
          {/* Contact Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="/contact"
              className={`relative navbtn flex justify-center h-20 px-2 pt-8 pb-5 transition-colors duration-200 group ${
                isCurrentPage('/contact')
                  ? 'text-text-brand'
                    : 'text-text-title hover:text-text-brand'
              }`}
            >
              Contact
              {/* Bottom line - grows from center to both ends */}
              <span 
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-fill-brand transition-all duration-300 ease-out ${
                  isCurrentPage('/contact') 
                    ? 'w-full' 
                      : 'w-0 group-hover:w-full bg-fill-brand'
                }`}
              />
            </a>
          </div>


          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-black focus:outline-none p-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <div className="px-4 py-4 space-y-2 bg-white">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative block py-3 px-4 text-base font-medium transition-colors duration-200 group ${
                    isCurrentPage(item.href)
                      ? 'text-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  {/* Left line - grows on hover, always visible when active */}
                  <span 
                    className={`absolute left-0 top-0 w-1 bg-black transition-all duration-300 ease-out ${
                      isCurrentPage(item.href) 
                        ? 'h-full' 
                        : 'h-0 group-hover:h-full'
                    }`}
                  />
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href="/contact"
                  className={`relative block w-full px-4 py-3 rounded-lg text-center text-sm font-medium transition-colors duration-200 group ${
                    isCurrentPage('/contact')
                      ? 'bg-gray-800 text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                  {/* Left line for mobile Contact */}
                  <span 
                    className={`absolute left-0 top-0 w-1 bg-white transition-all duration-300 ease-out rounded-r-sm ${
                      isCurrentPage('/contact') 
                        ? 'h-full' 
                        : 'h-0 group-hover:h-full'
                    }`}
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}