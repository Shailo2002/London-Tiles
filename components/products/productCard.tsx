// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  image: string[];
  priceIncVAT: number;
  priceExVAT: number;
};

const ProductCard = ({
  id,
  name,
  image,
  priceIncVAT,
  priceExVAT,
}: ProductCardProps) => {
  return (
    <div className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image[0] || "/upload/skirting_small.jpg"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      <div className="p-6 flex flex-col mb-2 h-[200px]">
        <h3 className="text-lg font-light mb-3 min-h-[56px]">{name}</h3>

        <div className="space-y-1 mb-3">
          <p className="text-gray-800">
            £{priceIncVAT.toFixed(2)}{" "}
            <span className="text-gray-500 text-sm">(inc VAT)</span>
          </p>
          <p className="text-gray-500 text-sm">
            £{priceExVAT.toFixed(2)} (ex VAT)
          </p>
        </div>

        <Link href={`/product/${id}`} className="mt-auto">
          <button
            className="w-full border border-black text-black py-2 px-4 mb-8
                    hover:bg-black hover:text-white transition-colors duration-200"
          >
            Select Options
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
