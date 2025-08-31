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
  
  // 动态获取产品分类数据
  const productCategories = getContent('products.categories') || [];

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
      href: '/products/all',
      submenu: productCategories.map((category: any) => ({
        name: category.title,
        href: `/products/${category.slug}`
      }))
    },
    { 
      name: getContent('navigation.news'), 
      href: '/news',
      submenu: [
        { name: 'Articles', href: '/news/articles' },
        { name: 'Industry Applications', href: '/news/applications' }
      ]
    },
    { name: getContent('navigation.aboutUs'), href: '/aboutUs' }
  ];

  const mobileNavigation = [
    ...navigation,
    { name: getContent('navigation.contact'), href: '/contact' }
  ];

  const isCurrentPage = (href: string) => {
    return pathname === href;
  };

  // 检查是否是主导航的激活状态（包括子页面）
  const isMainNavActive = (item: any) => {
    if (pathname === item.href) return true;
    if (!item.submenu) return false;
    
    // 检查是否在子页面中
    if (item.href === '/products' && pathname.startsWith('/products')) return true;
    if (item.href === '/news' && pathname.startsWith('/news')) return true;
    if (item.href === '/solution' && pathname.startsWith('/solution')) return true;
    
    return item.submenu.some((subItem: any) => pathname === subItem.href);
  };


  // 获取当前活跃的父菜单
  const getActiveParentMenu = () => {
    for (const item of navigation) {
      if (!item.submenu) continue;
      
      // 检查是否在子菜单项中
      const hasActiveSubmenu = item.submenu.some((subItem: any) => pathname === subItem.href);
      if (hasActiveSubmenu) {
        return item.name;
      }
      
      // 特殊处理产品页面的URL参数
      if (item.href === '/products' && pathname.startsWith('/products')) {
        return item.name;
      }
      
      // 特殊处理新闻页面的子路径
      if (item.href === '/news' && pathname.startsWith('/news') && pathname !== '/news') {
        return item.name;
      }
      
      // 特殊处理解决方案页面的子路径
      if (item.href === '/solution' && pathname.startsWith('/solution') && pathname !== '/solution') {
        return item.name;
      }
    }
    return null;
  };

  // 当路径改变时，自动展开包含当前页面的子菜单
  useEffect(() => {
    const activeParent = getActiveParentMenu();
    if (activeParent) {
      setExpandedSubmenu(activeParent);
    }
  }, [pathname]);

  // 当移动菜单打开时，确保当前页面的父菜单展开
  useEffect(() => {
    if (isMobileMenuOpen) {
      const activeParent = getActiveParentMenu();
      if (activeParent) {
        setExpandedSubmenu(activeParent);
      }
    }
  }, [isMobileMenuOpen]);

  // 控制移动菜单打开时禁用背景滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // 清理函数，组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
    <nav className="fixed w-screen z-50 bg-fill-one/90 backdrop-blur-sm  lg:h-20 h-12 ">
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
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`relative navbtn flex justify-center h-20 px-2 pt-8 pb-5 transition-colors duration-200 ${
                    isMainNavActive(item)
                      ? 'text-text-brand'
                      : 'text-text-title hover:text-text-brand'
                  }`}
                >
                  {item.name}
                  {/* Bottom line - grows from center to both ends */}
                  <span 
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-fill-brand transition-all duration-300 ease-out ${
                      isMainNavActive(item)
                        ? 'w-full' 
                        : 'w-0 group-hover:w-full bg-fill-brand'
                    }`}
                  />
                </Link>
                
                {/* Desktop Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-fill-white shadow-lg rounded-sm border border-border-one opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
                    <div className="py-2">
                      {item.submenu.map((subItem: any) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                            isCurrentPage(subItem.href)
                              ? 'text-text-brand bg-fill-three'
                              : 'text-text-black hover:text-text-brand hover:bg-fill-two'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
          className={`lg:hidden w-full  overflow-hidden transition-all duration-600 ease-in-out ${
            isMobileMenuOpen 
              ? 'opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-fill-one/95 backdrop-blur-md pt-5 h-[calc(100vh-48px)]">
            {mobileNavigation.map((item, index) => (
              <div key={item.name}>
                {/* Main menu item */}
                {item.submenu ? (
                  <div className={`border-b border-border-one transition-all duration-600 transform ${
                    isMobileMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : '-translate-x-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                  }}>
                    {/* 主菜单项 - 可点击进入主页 */}
                    <div className="flex">
                      <Link
                        href={item.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setExpandedSubmenu(null);
                        }}
                        className={`navbtn flex-1 flex items-center py-3 px-5 h-12 transition-all duration-300 ${
                          isMainNavActive(item)
                            ? 'text-text-brand bg-fill-three'
                            : 'text-text-black'
                        }`}
                      >
                        <span>{item.name}</span>
                      </Link>
                      {/* 展开按钮 */}
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={`flex items-center justify-center w-12 h-12 text-text-black transition-colors duration-300 ${
                          isMainNavActive(item) ? 'bg-fill-three' : ''
                        }`}
                      >
                        <Icon 
                          name="right" 
                          className={`text-[20px] transition-transform duration-300 ${
                            expandedSubmenu === item.name ? 'rotate-90' : ''
                          }`} 
                        />
                      </button>
                    </div>
                  </div>
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
                    {item.submenu.map((subItem: any, subIndex: number) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setExpandedSubmenu(null);
                        }}
                        className={`navbtn relative flex justify-between items-center py-3 pl-9 pr-5 h-12 border-b border-border-one transition-all duration-600 group transform ${
                          isCurrentPage(subItem.href)
                            ? 'text-text-brand bg-fill-three font-medium'
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