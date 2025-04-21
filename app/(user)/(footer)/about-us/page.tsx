export default function AboutUs() {
  return (
    <>
      {/* Hero Content */}
      <div className="bg-[#1E2122] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-gray-300 text-lg">
              Learn more about London Tiles and our commitment to quality and
              service.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="prose max-w-none">
          <p className="text-gray-600">
            London Tiles is your premier destination for high-quality tiles and
            skirting solutions in London. With years of experience in the
            industry, we pride ourselves on offering exceptional products and
            outstanding customer service to both residential and commercial
            clients.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600">
            Our mission is to provide our customers with the finest selection of
            tiles and skirting boards, coupled with expert advice and
            professional installation services. We believe in creating lasting
            relationships with our clients through trust, quality, and
            reliability.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Extensive range of high-quality tiles and skirting boards</li>
            <li>Expert advice and consultation</li>
            <li>Professional installation services</li>
            <li>Competitive pricing</li>
            <li>Excellent customer service</li>
            <li>Years of industry experience</li>
          </ul>
        </div>
      </div>
    </>
  );
}
