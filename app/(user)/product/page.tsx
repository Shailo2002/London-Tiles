export default function ProductPage() {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[500px] w-full">
        <img
          src="https://res.cloudinary.com/dfapgsapr/image/upload/v1745089911/skirting-king-home_se2guz.jpg"
          alt="Our Products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-light mb-4 text-white">
              Our Products
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Discover our premium collection of skirting boards and
              architraves, crafted with precision and quality materials.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <h2 className="text-3xl font-light mb-12">Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-80 overflow-hidden group">
            <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/40 transition-all duration-300"></div>
            <img
              src="https://res.cloudinary.com/dfapgsapr/image/upload/v1745089911/skirting-king-home_se2guz.jpg"
              alt="Skirting Boards"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h2 className="text-2xl font-light text-white mb-2">
                Skirting Boards
              </h2>
              <a
                href="/product-category/skirting"
                className="inline-block border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition"
              >
                VIEW COLLECTION
              </a>
            </div>
          </div>

          <div className="relative h-80 overflow-hidden group">
            <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/40 transition-all duration-300"></div>
            <img
              src="https://res.cloudinary.com/dfapgsapr/image/upload/v1745089911/skirting-king-home_se2guz.jpg"
              alt="Architrave"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h2 className="text-2xl font-light text-white mb-2">
                Architrave
              </h2>
              <a
                href="/product-category/architrave"
                className="inline-block border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition"
              >
                VIEW COLLECTION
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
