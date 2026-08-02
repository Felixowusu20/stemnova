import { headers } from "next/headers";
import {
  AnnouncementBar,
  Footer,
  Header,
  WhatsAppButton,
} from "@/components";
import { SiteChrome } from "@/components/layout/SiteChrome";

export async function PublicChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SiteChrome>
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </SiteChrome>
  );
}
