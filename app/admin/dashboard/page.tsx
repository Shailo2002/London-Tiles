"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    productCategory: "",
    variants: [
      {
        height: "",
        length: "",
        thickness: "",
        priceIncVAT: "",
        priceExVAT: "",
      },
    ],
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedVariants = [...form.variants];
    const key = e.target.name as keyof (typeof updatedVariants)[0];
    updatedVariants[index][key] = e.target.value;
    setForm({ ...form, variants: updatedVariants });
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        {
          height: "",
          length: "",
          thickness: "",
          priceIncVAT: "",
          priceExVAT: "",
        },
      ],
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("productCategory", form.productCategory);
    formData.append("variants", JSON.stringify(form.variants));

    images.forEach((img) => {
      formData.append("images", img); // Changed from "image" to "images" for consistency
    });

    try {
      await axios.post("/api/auth/admin/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      setIsOpen(false);
      // Reset form
      setForm({
        name: "",
        description: "",
        productCategory: "",
        variants: [
          {
            height: "",
            length: "",
            thickness: "",
            priceIncVAT: "",
            priceExVAT: "",
          },
        ],
      });
      setImages([]);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error:", error);
      if (error.response?.status === 409) {
        alert("Product with this name already exists!");
      } else {
        alert("Error adding product");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Add Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md max-w-md w-full space-y-4 overflow-y-auto max-h-screen"
          >
            <h2 className="text-xl font-bold">Add Product</h2>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              rows={3}
            />

            <input
              type="text"
              name="productCategory"
              placeholder="Category (e.g., skirting)"
              value={form.productCategory}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <div>
              <h3 className="font-semibold">Variants</h3>
              {form.variants.map((variant, index) => (
                <div key={index} className="border p-2 rounded mb-2">
                  <input
                    name="height"
                    placeholder="Height (mm)"
                    value={variant.height}
                    onChange={(e) => handleVariantChange(e, index)}
                    className="w-full border px-3 py-2 rounded mb-2"
                    required
                  />
                  <input
                    name="length"
                    placeholder="Length (mm)"
                    value={variant.length}
                    onChange={(e) => handleVariantChange(e, index)}
                    className="w-full border px-3 py-2 rounded mb-2"
                    required
                  />
                  <input
                    name="thickness"
                    placeholder="Thickness (mm)"
                    value={variant.thickness}
                    onChange={(e) => handleVariantChange(e, index)}
                    className="w-full border px-3 py-2 rounded mb-2"
                    required
                  />
                  <input
                    name="priceIncVAT"
                    type="number"
                    step="0.01"
                    placeholder="Price inc VAT (£)"
                    value={variant.priceIncVAT}
                    onChange={(e) => handleVariantChange(e, index)}
                    className="w-full border px-3 py-2 rounded mb-2"
                    required
                  />
                  <input
                    name="priceExVAT"
                    type="number"
                    step="0.01"
                    placeholder="Price ex VAT (£)"
                    value={variant.priceExVAT}
                    onChange={(e) => handleVariantChange(e, index)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addVariant}
                className="text-blue-600 text-sm underline mt-2"
              >
                + Add another variant
              </button>
            </div>

            <div>
              <label className="block mb-1">Product Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full border p-2 rounded"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload at least one image (JPEG, PNG)
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
