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
    <div className=" rounded-sm shadow-sm min-h-[116px] bg-cover bg-center bg-no-repeat text-text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}>
      <div className="p-2.5 bg-gradient-to-b from-black/80 to-black/10 w-full h-full rounded-sm">
        <h3 className="text-lg font-semibold mb-2 ">{title}</h3>
        <p className="text-display font-medium">{subtitle}</p>
      </div>
    </div>
  );
}