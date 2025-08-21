import React from 'react';

export type IconName = 
  | 'right'
  | 'mail-line'
  | 'building-2-line'
  | 'crumbs'
  | 'pencil-ruler-2-line'
  | 'Logo'
  | 'quill-pen-ai-line'
  | 'bootom'
  | 'close'
  | 'phone-line'
  | 'safe-2-fill'
  | 'customer-service-2-line'
  | 'mail-send-line'
  | 'pantone-line';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconName;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ 
  name, 
  className = '', 
  ...props 
}) => {
  const iconClassName = `iconfont icon-${name} ${className}`.trim();

  return (
    <i 
      className={iconClassName}
      {...props}
    />
  );
};

export default Icon;