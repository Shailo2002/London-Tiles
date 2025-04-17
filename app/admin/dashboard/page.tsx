"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    productCategory: "",
    Height: "",
    Length: "",
    Thickness: "",
    Finish: "",
    Rebate: "",
    priceIncVAT: "",
    priceExVAT: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    // Convert comma-separated strings to arrays
    formData.append("Height", JSON.stringify(form.Height.split(",")));
    formData.append("Length", JSON.stringify(form.Length.split(",")));
    formData.append("Thickness", JSON.stringify(form.Thickness.split(",")));
    formData.append("Finish", JSON.stringify(form.Finish.split(",")));
    formData.append("Rebate", JSON.stringify(form.Rebate.split(",")));
    formData.append("priceIncVAT", form.priceIncVAT);
    formData.append("priceExVAT", form.priceExVAT);

    images.forEach((img) => {
      formData.append("image", img);
    });

    try {
      const res = await axios.post("/api/auth/admin/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added!");
      setIsOpen(false);
    } catch (err: any) {
      console.log("error", err);
      if (err.response?.status === 409) {
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
            className="bg-white p-6 rounded shadow-md max-w-md w-full space-y-4"
          >
            <h2 className="text-xl font-bold">Add Product</h2>

            <input
              type="text"
              name="name"
              placeholder="Name"
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
            />

            <input
              type="text"
              name="productCategory"
              placeholder="Category"
              value={form.productCategory}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <input
              type="text"
              name="Height"
              placeholder="Height (comma separated)"
              value={form.Height}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="Length"
              placeholder="Length (comma separated)"
              value={form.Length}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="Thickness"
              placeholder="Thickness (comma separated)"
              value={form.Thickness}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="Finish"
              placeholder="Finish (comma separated)"
              value={form.Finish}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="Rebate"
              placeholder="Rebate (comma separated)"
              value={form.Rebate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="number"
              step="0.01"
              name="priceIncVAT"
              placeholder="Price (inc VAT)"
              value={form.priceIncVAT}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <input
              type="number"
              step="0.01"
              name="priceExVAT"
              placeholder="Price (ex VAT)"
              value={form.priceExVAT}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full"
              required
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
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
