import Image from "next/image";
import Link from "next/link";

const ProductCard = () => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src="/upload/skirting_small.jpg"
          alt="High Stepped MDF Skirting Board"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          High Stepped MDF Skirting Board
        </h3>

        <div className="space-y-2 mb-4">
          <p className="text-gray-600 text-sm">£7.14 - £71.78 (inc VAT)</p>
          <p className="text-gray-500 text-sm">£5.95 - £59.82 (ex VAT)</p>
        </div>
        <Link href="/product/high-stepped-mdf-skirting-board">
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
