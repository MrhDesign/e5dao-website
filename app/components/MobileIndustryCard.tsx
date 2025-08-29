interface MobileIndustryCardProps {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export default function MobileIndustryCard({ 
  title, 
  subtitle, 
  backgroundImage 
}: MobileIndustryCardProps) {
  return (
    <div className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      {/* 底部遮罩层 - 固定样式 */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* 内容区域 - 固定显示 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {/* 标题 */}
        <h3 className="text-lg font-bold mb-2 line-clamp-2">
          {title}
        </h3>
        {/* 内容 */}
        <p className="text-sm opacity-90 leading-relaxed line-clamp-3">
          {subtitle}
        </p>
      </div>
    </div>
  );
}