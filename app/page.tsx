
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/layout/HeroSection";
import Navbar from "@/components/layout/Navbar";
import ProductTypesSection from "@/components/layout/ProductTypesSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductTypesSection />
        <Footer />
      </main>
    </>
  );
}
