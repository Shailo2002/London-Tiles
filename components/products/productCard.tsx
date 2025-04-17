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
    <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={image[0] || "/upload/skirting_small.jpg"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>

        <div className="space-y-2 mb-4">
          <p className="text-gray-600 text-sm">
            £{priceIncVAT.toFixed(2)} (inc VAT)
          </p>
          <p className="text-gray-500 text-sm">
            £{priceExVAT.toFixed(2)} (ex VAT)
          </p>
        </div>
        <Link href={`/product/${id}`}>
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
                    hover:bg-blue-700 transition-colors duration-200"
          >
            Select Options
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
