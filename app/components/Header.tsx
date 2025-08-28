'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from './Icon';
import useContent from '../../lib/useContent';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { getContent } = useContent();

  const navigation = [
    { name: getContent('navigation.home'), href: '/' },
    { 
      name: getContent('navigation.solution'), 
      href: '/solution',
      submenu: [
        { name: 'AI Solutions', href: '/solution/ai' },
        { name: 'Cloud Services', href: '/solution/cloud' },
        { name: 'Data Analytics', href: '/solution/analytics' }
      ]
    },
    { 
      name: getContent('navigation.products'), 
      href: '/products',
      submenu: [
        { name: 'Enterprise Software', href: '/products/enterprise' },
        { name: 'Mobile Apps', href: '/products/mobile' },
        { name: 'Web Platform', href: '/products/web' }
      ]
    },
    { name: getContent('navigation.news'), href: '/news' },
    { name: getContent('navigation.aboutUs'), href: '/aboutUs' }
  ];

  const mobileNavigation = [
    ...navigation,
    { name: getContent('navigation.contact'), href: '/contact' }
  ];

  const isCurrentPage = (href: string) => {
    return pathname === href;
  };

  // 检查当前页面是否在某个子菜单中
  const isSubMenuActive = (item: any) => {
    if (!item.submenu) return false;
    return item.submenu.some((subItem: any) => pathname === subItem.href);
  };

  // 获取当前活跃的父菜单
  const getActiveParentMenu = () => {
    for (const item of navigation) {
      if (item.submenu && item.submenu.some((subItem: any) => pathname === subItem.href)) {
        return item.name;
      }
    }
    return null;
  };

  // 当路径改变时，自动展开包含当前页面的子菜单
  useEffect(() => {
    const activeParent = getActiveParentMenu();
    if (activeParent && isMobileMenuOpen) {
      setExpandedSubmenu(activeParent);
    }
  }, [pathname, isMobileMenuOpen]);

  const toggleSubmenu = (itemName: string) => {
    setExpandedSubmenu(expandedSubmenu === itemName ? null : itemName);
  };

  const handleMenuItemClick = (item: any) => {
    if (item.submenu) {
      toggleSubmenu(item.name);
    } else {
      setIsMobileMenuOpen(false);
      setExpandedSubmenu(null);
    }
  };

  return (
    <nav className="fixed w-screen z-50 bg-fill-one/95 backdrop-blur-md  lg:h-20 h-12 ">
      <div className="h-full">
        <div className="w-full h-full lg:px-10 px-5 flex justify-between items-center">
          
          {/* Logo */}
          <div className="w-20 flex items-center">
            <Link href="/" className="flex items-center">
              <Icon name="Logo" className="lg:text-[60px] text-[36px] text-text-black" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-2">
            {navigation.map((item) => (
              <Link
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
              </Link>
            ))}
          </div>
          
          {/* Contact Button */}
          <div className="w-20 hidden lg:flex items-center">
            <Link
              href="/contact"
              className={`relative navbtn flex justify-center h-20 px-2 pt-8 pb-5 transition-colors duration-200 group ${
                isCurrentPage('/contact')
                  ? 'text-text-brand'
                  : 'text-text-title hover:text-text-brand'
              }`}
            >
              {getContent('navigation.contact')}
              {/* Bottom line - grows from center to both ends */}
              <span 
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-fill-brand transition-all duration-300 ease-out ${
                  isCurrentPage('/contact') 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full bg-fill-brand'
                }`}
              />
            </Link>
          </div>


          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => {
                const newState = !isMobileMenuOpen;
                setIsMobileMenuOpen(newState);
                // 当打开菜单时，自动展开包含当前页面的子菜单
                if (newState) {
                  const activeParent = getActiveParentMenu();
                  if (activeParent) {
                    setExpandedSubmenu(activeParent);
                  }
                }
              }}
              className="text-text-black hover:text-black focus:outline-none p-2 transition-colors duration-300"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`absolute transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                >
                  <Icon name="crumbs" className="text-[26px]" />
                </div>
                <div
                  className={`absolute transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'
                  }`}
                >
                  <Icon name="close" className="text-[26px]" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden w-full bg-fill-one overflow-hidden transition-all duration-600 ease-in-out ${
            isMobileMenuOpen 
              ? 'opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-fill-one pt-5">
            {mobileNavigation.map((item, index) => (
              <div key={item.name}>
                {/* Main menu item */}
                {item.submenu ? (
                  <button
                    onClick={() => handleMenuItemClick(item)}
                    className={`navbtn relative flex justify-between items-center py-3 px-5 h-12 border-b border-border-one w-full transition-all duration-600 group transform ${
                      isCurrentPage(item.href) || isSubMenuActive(item)
                        ? 'text-text-brand'
                        : 'text-text-black hover:text-text-brand'
                    } ${
                      isMobileMenuOpen 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                    }}
                  >
                    <span>{item.name}</span>
                    <Icon 
                      name="right" 
                      className={`text-[26px] transition-transform duration-300 ${
                        expandedSubmenu === item.name ? 'rotate-90' : ''
                      }`} 
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => handleMenuItemClick(item)}
                    className={`navbtn relative flex items-center py-3 px-5 h-12 border-b border-border-one transition-all duration-600 group transform ${
                      isCurrentPage(item.href)
                        ? 'text-text-brand'
                        : 'text-text-black hover:text-text-brand'
                    } ${
                      isMobileMenuOpen 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                    }}
                  >
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Submenu */}
                {item.submenu && (
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedSubmenu === item.name
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setExpandedSubmenu(null);
                        }}
                        className={`navbtn relative flex justify-between items-center py-3 px-5 h-12 border-b border-border-one transition-all duration-600 group transform ${
                          isCurrentPage(subItem.href)
                            ? 'text-text-brand'
                            : 'text-text-black hover:text-text-brand'
                        } ${
                          expandedSubmenu === item.name
                            ? 'translate-x-0 opacity-100' 
                            : '-translate-x-4 opacity-0'
                        }`}
                        style={{
                          transitionDelay: expandedSubmenu === item.name ? `${subIndex * 30}ms` : '0ms'
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}