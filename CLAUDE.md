# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack (recommended)
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture Overview

This is an **E5DAO corporate website** built with **Next.js 15** using the **App Router** architecture. The site showcases carbon fiber composite materials and solutions for defense, medical, and aerospace industries.

### Tech Stack
- **Next.js 15** with App Router and Turbopack
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling
- **React 19** for UI components
- **ScrollReveal** for animations
- **Swiper** for carousels

### Key Directories
- `app/` - Next.js App Router pages and components
- `lib/` - Utilities, types, content management, and SEO tools
- `public/images/` - Product images organized by categories
- `styles/` - Global styles and component-specific CSS
- `docs/` - Comprehensive project documentation (PRDs)

## Content Management System

The site uses a **centralized JSON-based content system**:

- **Content Source**: `lib/content.json` contains all site content
- **Content Access**: Use `useContent` hook with dot notation: `getContent('products.items')`
- **Type Safety**: All content types defined in `lib/types.ts`

### Content Structure
```typescript
// Access patterns
getContent('navigation.home')           // Navigation items
getContent('products.items')            // Product array
getContent('products.categories')       // Product categories
getContent('news.articles')            // News articles
getContent('solution.commandSystem')    // Solution data
```

## Product System

The site features a **dual product type system**:

### Product Types
1. **Independent R&D Products** (`productType: 'independent-rd'`)
   - Have `title` and `description`
   - Company's own innovations

2. **Standard Products** (`productType: 'standard'`)
   - Have `model` and `standardCategory`
   - Industry-standard offerings

### Product Categories
- **Category 1**: NC Module (Navigation & Control)
- **Category 2**: AC-PD Module (Power & Display) 
- **Category 3**: AV-SP Module (Audio/Video & Signal Processing)
- **Category 4**: Sports Equipment

### Product Data Structure
```typescript
interface Product {
  id: number;
  categoryId: number;
  image: string;
  productType: 'independent-rd' | 'standard';
  gallery?: string[];
  specifications?: Record<string, string>;
  // ... other fields based on type
}
```

## Component Architecture

Components follow **atomic design principles**:

### Core Components
- `ProductCard` - Dual-mode product display (supports both product types)
- `ProductImageGallery` - Image carousel with thumbnails
- `DetailPage` - Reusable page template for products
- `ContentRenderer` - Rich content display with security (DOMPurify)
- `NewCard` - News and application articles
- `ContactForm` - Lead generation form

### Component Patterns
- Use TypeScript interfaces for all props
- Mobile-first responsive design with Tailwind
- Performance optimization with `React.memo` where needed
- Error boundaries for graceful degradation

## Routing Structure

```
/                           # Homepage
/products/[category]/[id]   # Dynamic product pages  
/products/[category]        # Category listing pages
/news/articles/[slug]       # News articles
/news/applications/[slug]   # Industry applications
/solution/command-system    # Mobile command solution
/solution/treatment-system  # Medical treatment solution
/aboutUs                   # Company information
/contact                   # Contact form
```

## SEO & Performance

### SEO Features
- **Structured Data**: Automatic JSON-LD generation for products and organization
- **Meta Tags**: Dynamic meta generation using `lib/global-metadata-generator.ts`
- **Sitemap**: Auto-generated at `/sitemap.ts`
- **Robots**: Configuration in `/robots.ts`

### Performance Optimizations
- **Image Optimization**: Next.js Image with custom cache settings (24h TTL)
- **Code Splitting**: Automatic with App Router
- **Bundle Analysis**: Uses `optimizePackageImports` for better imports
- **Lazy Loading**: Implemented for images and heavy components

## Development Guidelines

### Adding New Products
1. Add product data to `lib/content.json` in `products.items` array
2. Follow the dual product type system (`independent-rd` vs `standard`)
3. Place product images in `public/images/[category]/`
4. Ensure `categoryId` matches existing categories

### Component Development
1. Check existing components in `app/components/` before creating new ones
2. Use TypeScript interfaces for all component props
3. Follow mobile-first responsive design patterns
4. Implement error boundaries for critical components

### Content Updates
1. Modify `lib/content.json` for text changes
2. Use the `getContent()` hook to access data
3. Maintain type safety with proper TypeScript interfaces
4. Test changes with `npm run build` before deployment

### Code Quality
- Run `npm run lint` before committing
- Use TypeScript strict mode (already configured)
- Follow existing code patterns and naming conventions
- Implement proper error handling and loading states

## Key Libraries & Utilities

### Content & SEO
- `lib/useContent.ts` - Content access hook
- `lib/seo/` - SEO utilities and structured data
- `lib/metadata-generator.ts` - Dynamic meta tag generation

### UI & Animation  
- `lib/useScrollReveal.ts` - Scroll animation management
- `lib/viewCounter.ts` - Page view tracking
- `styles/rich-content.css` - Rich content styling

### Security
- `isomorphic-dompurify` - HTML sanitization for content rendering

## Important Notes

- **No Tailwind Config**: Uses Tailwind CSS 4 without separate config file
- **Turbopack**: Development and build processes use Turbopack for performance
- **Image Organization**: Product images are organized by category folders
- **Chinese Content**: Some content includes Chinese text for international markets
- **Comprehensive Documentation**: See `docs/` folder for detailed PRD documentation