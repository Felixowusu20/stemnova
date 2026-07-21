import Link from "next/link";
import {
  Atom,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { programs, siteConfig } from "@/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { SocialPlatform } from "@/types";

const socialIcons: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Atom,
};

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="rounded text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { contact, social } = siteConfig;

  const programmeLinks = programs.slice(0, 5).map((p) => ({
    label: p.title,
    href: `/programs/${p.slug}`,
  }));

  const exploreLinks = [
    { label: "About", href: "/about" },
    { label: "Research & Innovation", href: "/research" },
    { label: "Impact", href: "/impact" },
    { label: "Events", href: "/events" },
    { label: "News & Publications", href: "/blog" },
    { label: "Partners", href: "/partner" },
  ];

  const involvedLinks = [
    { label: "Become a Mentor", href: "/get-involved#mentor" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Partner With Us", href: "/partner" },
    { label: "Donate", href: "/donate" },
    { label: "Apply for Fellowships", href: "/programs" },
    { label: "Contact", href: "/contact" },
  ];

  const address = [
    contact.address.line1,
    contact.address.line2,
    `${contact.address.city}, ${contact.address.region}`,
    contact.address.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="bg-dark text-white" role="contentinfo">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue">
                <Atom className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-xl font-bold">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Africa&apos;s institution for discovering scientific talent,
              developing research leaders, and advancing STEM excellence.
            </p>
            <Button href="/donate" variant="teal" className="mt-6">
              Support STEMNova
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            <FooterLinkGroup title="Explore" links={exploreLinks} />
            <FooterLinkGroup title="Programmes" links={programmeLinks} />
            <FooterLinkGroup title="Get Involved" links={involvedLinks} />
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-2 rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-2 rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{address}</span>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              {social.map((link) => {
                const Icon = socialIcons[link.platform];
                return (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full bg-white/10",
                      "transition-colors hover:bg-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-12">
          <div className="max-w-md">
            <h3 className="font-display text-lg font-semibold">Newsletter</h3>
            <p className="mt-2 text-sm text-white/65">
              Research insights, programme updates, and opportunities across Africa.
            </p>
            <NewsletterForm className="mt-4" variant="dark" />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="rounded text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="rounded text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              Terms of Service
            </Link>
            <Link
              href="/events"
              className="rounded text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              Events
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
