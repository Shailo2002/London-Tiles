import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Landing Page</div>
      <div>
        <Link href="/product-category/skirting">
          <button className="bg-blue-700">Skirting</button>
        </Link>
      </div>
    </div>
  );
}
