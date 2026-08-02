import { NavigationManager } from "@/components/admin/NavigationManager";
import { prisma } from "@/lib/db";

export default async function AdminNavigationPage() {
  const items = await prisma.navItem.findMany({
    where: { parentId: null },
    orderBy: { sortOrder: "asc" },
    include: {
      children: { orderBy: { sortOrder: "asc" } },
    },
  });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          Structure
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">
          Navigation
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-navy/60">
          Control the primary navbar and dropdown menus shown on the public
          site.
        </p>
      </header>
      <NavigationManager initial={items} />
    </div>
  );
}
