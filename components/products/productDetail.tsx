"use client";
import { useState } from "react";

const ProductDetail = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    height: "",
    length: "",
    thickness: "",
    finish: "",
    rebate: "",
  });

  const [quantity, setQuantity] = useState(1);

  // Options data
    const heightOptions = [
  "70mm", 
  "95mm", 
  "120mm", 
  "140mm", 
  "170mm", 
  "195mm", 
  "220mm", 
  "250mm", 
  "270mm", 
  "300mm", 
  "350mm", 
  "400mm"
];
  const lengthOptions = ["3040mm", "4200"];
  const thicknessOptions = ["15mm", "18mm", "25mm"];
  const finishOptions = ["Unprimed", "Primed"];
  const rebateOptions = ["No Rebate", "pipe rebate"];

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
          <li>Skirting Board</li>
          <li>&gt;</li>
          <li>MDF Skirting Board</li>
          <li>&gt;</li>
          <li className="font-semibold text-gray-900">
            High Stepped MDF Skirting Board
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Product Options */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            High Stepped MDF Skirting Board
          </h1>

          {/* Product Specifications */}
          {/* Height */}
          <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Length</span>
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
                  £7.52 (inc VAT)
                </span>
                <span className="text-lg text-gray-600">£6.27 (ex VAT)</span>
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
            <div className="mt-4 text-sm text-gray-500">
              SKU: SXU-SKBO-A39-MDF-70-3040-LB-U-N
            </div>
          </div>
        </div>

        {/* Right Column - Discounts */}
        <div className="space-y-6">
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

      {/* Recommendations Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">We Recommend</h3>
        <p className="text-gray-600">
          Ideal for post prime sanding, the sanding sponge can help to create
          the desired finish between coats. Moulds perfectly into profiles with
          the right grit to create a smooth finish.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
