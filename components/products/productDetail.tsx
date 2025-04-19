"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/context/CartContext";
import { toast } from "react-hot-toast";

type ProductDetailProps = {
  product: {
    id: string;
    name: string;
    image: string[];
    description: string;
    productCategory: string;
    Height: string[];
    Length: string[];
    Thickness: string[];
    Finish: string[];
    Rebate: string[];
    priceIncVAT: number;
    priceExVAT: number;
  };
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { addItem } = useCart();
  const [selectedOptions, setSelectedOptions] = useState({
    height: "",
    length: "",
    thickness: "",
    finish: "",
    rebate: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Options data from product
  const heightOptions = product.Height || [];
  const lengthOptions = product.Length || [];
  const thicknessOptions = product.Thickness || [];
  const finishOptions = product.Finish || [];
  const rebateOptions = product.Rebate || [];

  // Discount data
  const quantityDiscounts = [
    { quantity: "10 - 24", discount: "1%", price: "£7.43 inc VAT" },
    { quantity: "25 - 49", discount: "3%", price: "£7.30 inc VAT" },
    { quantity: "50 +", discount: "5%", price: "£7.13 inc VAT" },
  ];

  const handleAddToBasket = () => {
    // Check if all required options are selected
    const requiredOptions = [
      "height",
      "length",
      "thickness",
      "finish",
      "rebate",
    ];
    const missingOptions = requiredOptions.filter(
      (option) => !selectedOptions[option as keyof typeof selectedOptions]
    );

    if (missingOptions.length > 0) {
      toast.error(`Please select ${missingOptions.join(", ")}`);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.priceIncVAT,
      quantity: quantity,
      image: product.image[0],
      options: selectedOptions,
    });

    toast.success("Added to basket!");
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Product Description at Top */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-gray-600 max-w-3xl">{product.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Image and Discounts */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={
                    product.image[selectedImageIndex] ||
                    "/upload/skirting_small.jpg"
                  }
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>

              {/* Thumbnail Gallery */}
              {product.image.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto mt-4">
                  {product.image.map((img, index) => (
                    <div
                      key={index}
                      className={`relative h-20 w-20 flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden ${
                        selectedImageIndex === index
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - view ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Discounts Section */}
            <div className="grid grid-cols-1 gap-4">
              {/* Quantity Discount Table */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 pb-2 border-b">
                  Quantity Discounts
                </h2>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 text-left">Quantity</th>
                      <th className="py-2 px-4 text-left">Discount</th>
                      <th className="py-2 px-4 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quantityDiscounts.map((discount, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-2 px-4">{discount.quantity}</td>
                        <td className="py-2 px-4">{discount.discount}</td>
                        <td className="py-2 px-4">{discount.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bulk Discount Display */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 pb-2 border-b">
                  Bulk Discount
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-xl font-bold">10+</div>
                    <div className="text-blue-600 font-medium">-1%</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-xl font-bold">25+</div>
                    <div className="text-blue-600 font-medium">-3%</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-xl font-bold">50+</div>
                    <div className="text-blue-600 font-medium">-5%</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Discount calculated and applied automatically when added to
                  basket
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Options */}
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-4 border-b pb-4">
              {product.name}
            </h1>

            {/* Product Specifications */}
            {/* Height */}
            <div className="flex justify-between items-center border-b pb-4 hover:bg-gray-50 p-2 rounded transition-colors">
              <span className="font-medium">Height</span>
              <select
                className="select select-bordered w-48"
                value={selectedOptions.height}
                onChange={(e) =>
                  setSelectedOptions({
                    ...selectedOptions,
                    height: e.target.value,
                  })
                }
              >
                <option value="">Choose Height</option>
                {heightOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Length Selector */}
            <div className="flex justify-between items-center border-b pb-4 hover:bg-gray-50 p-2 rounded transition-colors">
              <span className="font-medium">Length</span>
              <select
                className="select select-bordered w-48"
                value={selectedOptions.length}
                onChange={(e) =>
                  setSelectedOptions({
                    ...selectedOptions,
                    length: e.target.value,
                  })
                }
              >
                <option value="">Choose Length</option>
                {lengthOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Thickness Selector */}
            <div className="flex justify-between items-center border-b pb-4 hover:bg-gray-50 p-2 rounded transition-colors">
              <span className="font-medium">Thickness</span>
              <select
                className="select select-bordered w-48"
                value={selectedOptions.thickness}
                onChange={(e) =>
                  setSelectedOptions({
                    ...selectedOptions,
                    thickness: e.target.value,
                  })
                }
              >
                <option value="">Choose Thickness</option>
                {thicknessOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Finish Selector */}
            <div className="flex justify-between items-center border-b pb-4 hover:bg-gray-50 p-2 rounded transition-colors">
              <span className="font-medium">Finish</span>
              <select
                className="select select-bordered w-48"
                value={selectedOptions.finish}
                onChange={(e) =>
                  setSelectedOptions({
                    ...selectedOptions,
                    finish: e.target.value,
                  })
                }
              >
                <option value="">Choose Finish</option>
                {finishOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Rebate Selector */}
            <div className="flex justify-between items-center border-b pb-4 hover:bg-gray-50 p-2 rounded transition-colors">
              <span className="font-medium">Rebate</span>
              <select
                className="select select-bordered w-48"
                value={selectedOptions.rebate}
                onChange={(e) =>
                  setSelectedOptions({
                    ...selectedOptions,
                    rebate: e.target.value,
                  })
                }
              >
                <option value="">Choose Rebate</option>
                {rebateOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 p-6 rounded-lg mt-6 shadow-sm">
              <div className="flex flex-col mb-6">
                <span className="text-2xl font-bold text-blue-600">
                  £{product.priceIncVAT.toFixed(2)}{" "}
                  <span className="text-lg font-normal">(inc VAT)</span>
                </span>
                <span className="text-lg text-gray-600 mt-1">
                  £{product.priceExVAT.toFixed(2)} (ex VAT)
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm">
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center border-none focus:ring-0 bg-transparent"
                    value={quantity}
                    min="1"
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  />
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  onClick={handleAddToBasket}
                >
                  Add to Basket
                </button>
              </div>
            </div>

            {/* SKU Display */}
            <div className="mt-4 text-sm text-gray-500 border-t pt-4">
              SKU: {product.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
