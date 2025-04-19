const Footer = () => {
  return (
    <div className="w-full">
      {/* Full Image Section */}
      <div className="w-full h-screen">
        <img
          src="https://res.cloudinary.com/dfapgsapr/image/upload/v1745084638/R_g1keju.jpg"
          alt="Featured Project"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer Text Section */}
      <footer className="bg-[#1A1818] text-white px-6 md:px-12 pt-12 pb-6">
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left text-sm">
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-base mb-2">Contact Info</h3>
              <p className="mb-2">
                <span className="block">
                  Unit 14, Queniborough Industrial Estate,
                </span>
                <span className="block">
                  Melton Rd, Queniborough, Leicester
                </span>
                <span className="block">LE7 3FP</span>
              </p>
              <p className="mb-2">+44 (0)333 700 4400</p>
              <p className="mb-4">info@nationalskirting.co.uk</p>
              <div className="flex gap-4 text-lg">
                {/* Replace these with real icons if desired */}
                <span className="bg-white rounded-full w-5 h-5" />
                <span className="bg-white rounded-full w-5 h-5" />
                <span className="bg-white rounded-full w-5 h-5" />
                <span className="bg-white rounded-full w-5 h-5" />
              </div>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-semibold text-base mb-2">Help</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#">Delivery Information</a>
                </li>
                <li>
                  <a href="#">Refund and Returns</a>
                </li>
                <li>
                  <a href="#">FAQ’s</a>
                </li>
                <li>
                  <a href="#">Trade Accounts</a>
                </li>
                <li>
                  <a href="#">My account</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-base mb-2">Legal</h3>
              <ul className="space-y-1 mb-4">
                <li>
                  <a href="#">Terms and Conditions</a>
                </li>
                <li>
                  <a href="#">Cookies Policy</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
              {/* <p className="mb-2">Secure Payment Methods</p>
              <div className="flex flex-wrap gap-2">
                <img
                  src="/mastercard.svg"
                  alt="Mastercard"
                  className="w-10 h-auto"
                />
                <img src="/maestro.svg" alt="Maestro" className="w-10 h-auto" />
                <img src="/visa.svg" alt="Visa" className="w-10 h-auto" />
                <img src="/amex.svg" alt="Amex" className="w-10 h-auto" />
                <img
                  src="/applepay.svg"
                  alt="Apple Pay"
                  className="w-10 h-auto"
                />
                <img
                  src="/googlepay.svg"
                  alt="Google Pay"
                  className="w-10 h-auto"
                />
              </div> */}
            </div>

            {/* Blog */}
            <div>
              <h3 className="font-semibold text-base mb-2">Blog</h3>
              <p className="mb-1">Welcome To National Skirting!</p>
              <p className="text-gray-400 text-xs mb-3">October 26, 2021</p>
              <p className="text-white font-semibold">
                Christmas Holiday Information
              </p>
              {/* <img
                src="/britain-flag.svg"
                alt="Proudly British"
                className="mt-6 w-32"
              /> */}
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4 text-xs text-gray-500 flex justify-between items-center">
            <span>©2025 National Skirting</span>
            <a href="#">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
