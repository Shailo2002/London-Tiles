"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/context/CartContext";
import { toast } from "react-hot-toast";

type Variant = {
  id: string;
  height: string;
  length: string;
  thickness: string;
  priceIncVAT: number;
  priceExVAT: number;
  stock: number;
};

type ProductDetailProps = {
  product: {
    id: string;
    name: string;
    images: string[];
    description: string;
    category: string;
    variants: Variant[];
  };
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  

  // Find the selected variant
  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  );

  // Discount data
  const quantityDiscounts = [
    { quantity: "10 - 24", discount: "1%", price: "£7.43 inc VAT" },
    { quantity: "25 - 49", discount: "3%", price: "£7.30 inc VAT" },
    { quantity: "50 +", discount: "5%", price: "£7.13 inc VAT" },
  ];

  const handleAddToBasket = () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: selectedVariant.priceIncVAT,
      quantity: quantity,
      image: product.images[0],
      options: {
        height: selectedVariant.height,
        length: selectedVariant.length,
        thickness: selectedVariant.thickness,
      },
    });

    toast.success("Added to basket!");
  };

  // Filter variants based on selected dimensions
  const [selectedDimensions, setSelectedDimensions] = useState({
    height: "",
    length: "",
    thickness: "",
  });

  const heightOptions = [
    ...new Set(
      product.variants
        .filter(
          (v) =>
            (!selectedDimensions.length ||
              v.length === selectedDimensions.length) &&
            (!selectedDimensions.thickness ||
              v.thickness === selectedDimensions.thickness)
        )
        .map((v) => v.height)
    ),
  ];

  const lengthOptions = [
    ...new Set(
      product.variants
        .filter(
          (v) =>
            (!selectedDimensions.height ||
              v.height === selectedDimensions.height) &&
            (!selectedDimensions.thickness ||
              v.thickness === selectedDimensions.thickness)
        )
        .map((v) => v.length)
    ),
  ];

  const thicknessOptions = [
    ...new Set(
      product.variants
        .filter(
          (v) =>
            (!selectedDimensions.height ||
              v.height === selectedDimensions.height) &&
            (!selectedDimensions.length ||
              v.length === selectedDimensions.length)
        )
        .map((v) => v.thickness)
    ),
  ];

  // const availableVariants = product.variants.filter((variant) => {
  //   return (
  //     (selectedDimensions.height === "" ||
  //       variant.height === selectedDimensions.height) &&
  //     (selectedDimensions.length === "" ||
  //       variant.length === selectedDimensions.length) &&
  //     (selectedDimensions.thickness === "" ||
  //       variant.thickness === selectedDimensions.thickness)
  //   );
  // });

  const handleDimensionChange = (
    dimension: "height" | "length" | "thickness",
    value: string
  ) => {
    const newDimensions = {
      ...selectedDimensions,
      [dimension]: value,
    };
    setSelectedDimensions(newDimensions);

    // Only find and set the variant if all three dimensions are selected
    const allSelected =
      newDimensions.height && newDimensions.length && newDimensions.thickness;

    if (allSelected) {
      const matchingVariant = product.variants.find(
        (v) =>
          v.height === newDimensions.height &&
          v.length === newDimensions.length &&
          v.thickness === newDimensions.thickness
      );

      if (matchingVariant) {
        setSelectedVariantId(matchingVariant.id);
      } else {
        setSelectedVariantId(""); // Clear if no exact match
      }
    } else {
      setSelectedVariantId(""); // Clear if not all dimensions selected
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Product Description */}
        <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            {product.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              {/* Image Display */}
              <div className="relative h-96 w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={
                    product.images[selectedImageIndex] ||
                    "/upload/skirting_small.jpg"
                  }
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto mt-4">
                  {product.images.map((img, index) => (
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
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Discounts */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 pb-2 border-b dark:border-gray-700 dark:text-white">
                  Quantity Discounts
                </h2>
                <table className="w-full text-gray-700 dark:text-gray-300">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="py-2 px-4 text-left">Quantity</th>
                      <th className="py-2 px-4 text-left">Discount</th>
                      <th className="py-2 px-4 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quantityDiscounts.map((discount, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <td className="py-2 px-4">{discount.quantity}</td>
                        <td className="py-2 px-4">{discount.discount}</td>
                        <td className="py-2 px-4">{discount.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 pb-2 border-b dark:border-gray-700 dark:text-white">
                  Bulk Discount
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {["-1%", "-3%", "-5%"].map((discount, i) => (
                    <div
                      key={i}
                      className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-center"
                    >
                      <div className="text-xl font-bold text-gray-800 dark:text-white">
                        {quantityDiscounts[i].quantity}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 font-medium">
                        {discount}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Discount calculated and applied automatically when added to
                  basket
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Options */}
          <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h1 className="text-3xl font-light tracking-wide text-gray-900 dark:text-white mb-4 border-b dark:border-gray-700 pb-4">
              {product.name}
            </h1>

            {/* Selectors */}
            {[
              { label: "Height", options: heightOptions, key: "height" },
              { label: "Length", options: lengthOptions, key: "length" },
              {
                label: "Thickness",
                options: thicknessOptions,
                key: "thickness",
              },
            ].map(({ label, options, key }) => (
              <div
                key={key}
                className="flex justify-between items-center border-b pb-4 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {label}
                </span>
                <select
                  className="select select-bordered w-48 p-2 dark:bg-gray-700 dark:text-white"
                  value={
                    selectedDimensions[key as keyof typeof selectedDimensions]
                  }
                  onChange={(e) =>
                    handleDimensionChange(
                      key as "height" | "length" | "thickness",
                      e.target.value
                    )
                  }
                >
                  <option value="">Choose {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Price and Cart */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mt-6 shadow-sm">
              {selectedVariant ? (
                <div className="flex flex-col mb-6">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    £{selectedVariant.priceExVAT.toFixed(2)}{" "}
                    <span className="text-lg font-normal">(ex VAT)</span>
                  </span>
                  <span className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                    £{selectedVariant.priceIncVAT.toFixed(2)} (inc VAT)
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Selected: {selectedVariant.height}mm (H) ×{" "}
                    {selectedVariant.length}mm (L) × {selectedVariant.thickness}
                    mm (T)
                  </span>
                </div>
              ) : (
                <div className="mb-6 text-gray-500 dark:text-gray-400">
                  Please select all dimensions to see price
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center border-none bg-transparent dark:text-white"
                    value={quantity}
                    min="1"
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  />
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                    selectedVariant
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleAddToBasket}
                  disabled={!selectedVariant}
                >
                  {selectedVariant ? "Add to Basket" : "Select Options"}
                </button>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-4">
              SKU: {product.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
