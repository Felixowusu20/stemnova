import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { images } from "@/content/images";
import { getResolvedSiteConfig } from "@/lib/cms/queries";
import { resolveContactPage } from "@/lib/cms/resolve-content";
import { getSiteUrl } from "@/lib/site-url";
import type { SocialPlatform } from "@/types";

export const dynamic = "force-dynamic";

const siteUrl = getSiteUrl();

const socialIcons: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Mail,
};

const detailIcons = {
  email: Mail,
  phone: Phone,
  address: MapPin,
  hours: Clock,
} as const;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact STEMNova Foundation in Accra for programmes, fellowships, volunteering, and partnerships.",
  openGraph: {
    title: "Contact Us | STEMNova Foundation",
    description: "Reach the STEMNova team in Accra.",
    url: `${siteUrl}/contact`,
    images: [{ url: images.hero.contact, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default async function ContactPage() {
  const [settings, content] = await Promise.all([
    getResolvedSiteConfig(),
    resolveContactPage(),
  ]);
  const { social } = settings;

  return (
    <section className="bg-light pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12">
      <Container>
        <nav className="mb-3 text-sm text-navy/55" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-navy">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-navy">Contact</li>
          </ol>
        </nav>

        <div className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm sm:rounded-3xl">
          <div className="grid lg:grid-cols-2">
            {/* Form first on mobile */}
            <div className="order-1 flex flex-col justify-center p-4 sm:p-6 lg:order-2 lg:p-8">
              <h1 className="mb-4 font-display text-2xl font-bold text-navy sm:mb-5 sm:text-3xl">
                Send a Message
              </h1>
              <ContactForm className="border-0 bg-transparent p-0 shadow-none sm:p-0 lg:p-0" />
            </div>

            {/* Left panel: mock admin managed contact details */}
            <div className="order-2 bg-navy p-5 text-white sm:p-8 lg:order-1 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
                {content.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                {content.headline}
              </h2>
              <p className="mt-2 text-sm text-white/75 sm:text-base">
                {content.shortIntro}
              </p>
              <p className="mt-1 text-sm text-white/55">{content.responseNote}</p>

              <ul className="mt-8 space-y-4">
                {content.details.map((item) => {
                  const Icon =
                    detailIcons[item.id as keyof typeof detailIcons] ?? Mail;
                  const body = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-teal">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-wider text-white/55">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-sm font-medium leading-relaxed text-white">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.id}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="flex items-start gap-3 p-2">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Follow us
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {social.map((link) => {
                    const Icon = socialIcons[link.platform];
                    return (
                      <a
                        key={link.platform}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-teal hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
