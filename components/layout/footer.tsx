"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full">
      {/* Full Image Section */}
      <div className="w-full h-screen relative">
        <Image
          src="https://res.cloudinary.com/dfapgsapr/image/upload/v1746011445/Skirting-Profile-Closeup_LRes_lcxxgp.jpg"
          alt="Featured Project"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Footer Text Section */}
      <footer className="bg-[#1A1818] dark:bg-gray-900 text-white px-6 pt-12 pb-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-28 mb-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-sm">
                <p>
                  London Tiles,
                  <br />
                  Wembley, London,
                  <br />
                  TWA 7RU
                </p>
                <p>+44 (0)777 746 1161</p>
                <p>londontiles7@gmail.com</p>
              </div>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/login" className="hover:text-gray-300">
                    Delivery Information
                  </Link>
                </li>
                <li>
                  <Link href="/return-refund" className="hover:text-gray-300">
                    Refund and Returns
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-gray-300">
                    FAQ&apos;s
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-gray-300">
                    My account
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:text-gray-300">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms-conditions"
                    className="hover:text-gray-300"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex justify-center mt-4">
                  <Image
                    src="https://res.cloudinary.com/dfapgsapr/image/upload/v1745239686/paypal_pzannc.jpg"
                    alt="Payment Methods"
                    width={160}
                    height={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-700 dark:border-gray-800 w-full mt-4">
          <div className="max-w-7xl mx-auto px-6 pt-4 flex justify-between items-center text-sm text-gray-400">
            <span>©2025 London Tiles</span>
            <Link href="/terms-conditions" className="hover:text-gray-300">
              Legal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
