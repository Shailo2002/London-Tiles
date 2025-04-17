"use client";
import { useState } from "react";
import Image from "next/image";

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

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm text-gray-600">
          <ol className="flex space-x-2">
            <li>Home</li>
            <li>&gt;</li>
            <li>
              {product.productCategory.charAt(0).toUpperCase() +
                product.productCategory.slice(1)}
            </li>
            <li>&gt;</li>
            <li className="font-semibold text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Image */}
          <div className="space-y-4">
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
              <div className="flex space-x-2 overflow-x-auto">
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

          {/* Right Column - Product Options */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Product Specifications */}
            {/* Height */}
            <div className="flex justify-between items-center border-b pb-2">
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
            <div className="flex justify-between items-center border-b pb-2">
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
            <div className="flex justify-between items-center border-b pb-2">
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
            <div className="flex justify-between items-center border-b pb-2">
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
            <div className="flex justify-between items-center border-b pb-2">
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
            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <div className="flex flex-col mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  £{product.priceIncVAT.toFixed(2)} (inc VAT)
                </span>
                <span className="text-lg text-gray-600">
                  £{product.priceExVAT.toFixed(2)} (ex VAT)
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-square btn-sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="input input-bordered w-20 text-center"
                    value={quantity}
                    min="1"
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  />
                  <button
                    className="btn btn-square btn-sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-primary flex-1">
                  Add to Basket
                </button>
              </div>
            </div>

            {/* SKU Display */}
            <div className="mt-4 text-sm text-gray-500">SKU: {product.id}</div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Product Description</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Discounts Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quantity Discount Table */}
          <div className="card bg-white shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">Discount per Quantity</h2>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {quantityDiscounts.map((discount, index) => (
                    <tr key={index}>
                      <td>{discount.quantity}</td>
                      <td>{discount.discount}</td>
                      <td>{discount.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bulk Discount Display */}
          <div className="card bg-white shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">Bulk Discount</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-xl font-bold">10+</div>
                  <div className="text-blue-600 font-medium">-1%</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-xl font-bold">25+</div>
                  <div className="text-blue-600 font-medium">-3%</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
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
      </div>
    </div>
  );
};

export default ProductDetail;
