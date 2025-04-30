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
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 h-full">
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
        <h3 className="text-lg font-light mb-3 min-h-[56px] dark:text-white">
          {name}
        </h3>

        <div className="space-y-1 mb-3">
          <p className="text-gray-800 dark:text-gray-200">
            £{priceExVAT.toFixed(2)}{" "}
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              (ex VAT)
            </span>
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            £{priceIncVAT.toFixed(2)} (inc VAT)
          </p>
        </div>

        <Link href={`/product/${id}`} className="mt-auto">
          <button
            className="w-full border border-black dark:border-white text-black dark:text-white py-2 px-4 mb-8
              hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            Select Options
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
