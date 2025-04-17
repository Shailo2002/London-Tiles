"use client";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/dfapgsapr/video/upload/v1744877032/tfmoustgoi0jhbjzloyu.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/30 flex items-end md:items-center justify-center md:justify-start px-6 md:px-24 pb-10 md:pb-0">
        <div className="text-white max-w-lg">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4 leading-tight">
            Quality Craftsmanship
          </h1>
          <button className="border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition">
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </section>
  );
}
