import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminProviders } from "@/components/admin/AdminProviders";
import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/db";

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

  const pages = await prisma.contentItem.findMany({
    where: { collection: "pages", slug: { not: null } },
    select: { id: true, slug: true },
  });

  const pageIdBySlug: Record<string, string> = {};
  for (const page of pages) {
    if (page.slug) pageIdBySlug[page.slug] = page.id;
  }

  return (
    <AdminProviders>
      <AdminShell
        user={{
          name: session.user.name,
          email: session.user.email,
        }}
        pageIdBySlug={pageIdBySlug}
      >
        {children}
      </AdminShell>
    </AdminProviders>
  );
}
