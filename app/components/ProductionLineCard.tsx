interface ProductionLineCardProps {
  title: string;
  backgroundImage: string;
}

export default function ProductionLineCard({
  title,
  backgroundImage
}: ProductionLineCardProps) {
  return (
    <div
      className="flex aspect-[16/10] rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >

      <div className="mt-auto w-full inset-0 flex items-end p-2.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h3 className="text-white text-sm lg:text-2xl font-semibold leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}