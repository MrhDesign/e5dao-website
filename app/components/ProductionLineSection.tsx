import ProductionLineCard from './ProductionLineCard';

interface ProductionLine {
  id: number;
  title: string;
  backgroundImage: string;
}

interface ProductionLineSectionProps {
  productionLines: ProductionLine[];
}

export default function ProductionLineSection({ productionLines }: ProductionLineSectionProps) {
  return (
    <div className="w-full">
      <div className="">
        <div className="grid lg:grid-cols-3 lg:grid-rows-2 grid-cols-2 gap-4">
          {productionLines.map((line) => (
            <ProductionLineCard
              key={line.id}
              title={line.title}
              backgroundImage={line.backgroundImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}