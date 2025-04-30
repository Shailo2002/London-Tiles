import Navbar from "@/components/layout/Navbar";
import "../globals.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 dark:bg-gray-900">
      <Navbar />
      <main className="pt-16 min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
}
