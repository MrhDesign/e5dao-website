// 示例：国际化内容管理
import React, { createContext, useContext, useState } from 'react';

interface Translations {
  [locale: string]: {
    [key: string]: unknown;
  };
}

const translations: Translations = {
  en: {
    navigation: {
      home: 'Home',
      solution: 'Solution',
      products: 'Products',
      news: 'News',
      aboutUs: 'About Us',
      contact: 'Contact'
    },
    home: {
      hero: {
        button: 'Read More'
      }
    }
  },
  zh: {
    navigation: {
      home: '首页',
      solution: '解决方案',
      products: '产品',
      news: '新闻',
      aboutUs: '关于我们',
      contact: '联系我们'
    },
    home: {
      hero: {
        button: '了解更多'
      }
    }
  }
};

interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: unknown = translations[locale];
    
    for (const k of keys) {
      result = (result as Record<string, unknown>)?.[k];
    }
    
    return typeof result === 'string' ? result : key;
  };

  // JSX is commented out for TypeScript compatibility
  // return (
  //   <I18nContext.Provider value={{ locale, setLocale, t }}>
  //     {children}
  //   </I18nContext.Provider>
  // );
  
  return { locale, setLocale, t, children };
};