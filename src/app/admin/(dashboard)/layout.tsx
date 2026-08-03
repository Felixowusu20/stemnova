import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminProviders } from "@/components/admin/AdminProviders";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin | STEMNova CMS",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <AdminProviders>
      <AdminShell
        user={{
          name: session.user.name,
          email: session.user.email,
        }}
      >
        {children}
      </AdminShell>
    </AdminProviders>
  );
}
