'use client';

import Image from 'next/image';

interface SocialMediaProps {
  className?: string;
  showLabel?: boolean;
  iconSize?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'compact';
}

interface SocialLink {
  name: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/e5dao',
    icon: '/images/Social-icon/Facebook.png',
    ariaLabel: 'Visit our Facebook page'
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/e5dao',
    icon: '/images/Social-icon/Instagram.png',
    ariaLabel: 'Follow us on Instagram'
  },
    {
    name: 'WhatsApp',
    href: 'https://wa.me/qr/CL6FJ2HS4OONI1',
    icon: '/images/Social-icon/Whats App.png',
    ariaLabel: 'Contact us on WhatsApp'
  },
    {
    name: 'X',
    href: 'https://x.com/ruijiang418505?s=21',
    icon: '/images/Social-icon/X.png',
    ariaLabel: 'Follow us on X'
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@e5dao',
    icon: '/images/Social-icon/TIKTOK.png',
    ariaLabel: 'Follow us on TikTok'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/e5dao',
    icon: '/images/Social-icon/Linked In-1.png',
    ariaLabel: 'Connect on LinkedIn'
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@e5dao',
    icon: '/images/Social-icon/YouTube.png',
    ariaLabel: 'Subscribe to our YouTube channel'
  },
  {
    name: 'VK',
    href: 'https://vk.com/e5dao',
    icon: '/images/Social-icon/VK.png',
    ariaLabel: 'Follow us on VK'
  }

];

const SocialMedia: React.FC<SocialMediaProps> = ({
  className = '',
  iconSize = 'medium',
  variant = 'default'
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };

  const imageSizes = {
    small: 32,
    medium: 40,
    large: 48
  };

 
  return (
      <div className={`${className}`}>
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${sizeClasses[iconSize]}
              flex items-center justify-center
              transition-all duration-300
              hover:scale-110 hover:opacity-80
              focus:outline-none
            `}
            aria-label={social.ariaLabel}
            title={social.name}
          >
            <Image
              src={social.icon}
              alt={social.name}
              width={imageSizes[iconSize]}
              height={imageSizes[iconSize]}
              className="w-full h-full object-contain"
            />
          </a>
        ))}
      </div>
  );
};

export default SocialMedia;