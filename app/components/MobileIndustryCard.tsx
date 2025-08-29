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
    <div className="bg-fill-white p-2.5 rounded-sm shadow-sm min-h-[116px] bg-contain bg-no-repeat bg-right"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}>
      <h3 className="text-lg font-semibold mb-2 text-text-black">{title}</h3>
      <p className="text-display">{subtitle}</p>
    </div>
  );
}