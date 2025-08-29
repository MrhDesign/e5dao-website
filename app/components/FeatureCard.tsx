import Icon from './Icon';

interface FeatureCardProps {
  iconName: string;
  title: string;
  description: string;
  iconClass?: string;
}

export default function FeatureCard({ iconName, title, description, iconClass = "lg:text-[60px] text-[32px] text-text-black" }: FeatureCardProps) {
  return (
    <div className='flex items-center p-2.5 bg-fill-four gap-2.5 rounded-sm'>
      <Icon name={iconName} className={iconClass} />
      <div className='lg:min-h-[68px]'>
        <h3 className='lg:text-xl text-base font-semibold line-clamp-1'>{title}</h3>
        <span className='lg:text-sm text-xs line-clamp-2'>{description}</span>
      </div>
    </div>
  );
}