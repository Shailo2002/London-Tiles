import Image from "next/image";

const products = [
  {
    name: "Skirting Board",
    image:
      "https://res.cloudinary.com/dfapgsapr/image/upload/v1744870165/london-tiles/products/giic0pgtmhlec1cvffz3.jpg",
    link: "/product-category/skirting",
  },
  {
    name: "Architrave",
    image:
      "https://res.cloudinary.com/dfapgsapr/image/upload/v1744870165/london-tiles/products/giic0pgtmhlec1cvffz3.jpg",
    link: "/product-category/architrave",
  },
];

export default function ProductTypesSection() {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-12">
        Explore Our Bestsellers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <a
            href={product.link}
            key={product.name}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <div className="relative h-56 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-green-600 mt-1">View Range →</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
