// app/admin/layout.tsx - Admin layout without navbar
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
