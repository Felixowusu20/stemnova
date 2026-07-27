import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, CtaSection } from "@/components";
import { MentorForm } from "@/components/forms/MentorForm";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Become a Mentor",
  description:
    "Join the STEMNova Mentorship Network and guide emerging African STEM talent across research, academia, and industry.",
};

export default function MentorPage() {
  return (
    <>
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
              <li>
                <Link href="/get-involved" className="hover:text-navy">
                  Get Involved
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-navy">Mentor</li>
            </ol>
          </nav>

          <div className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm sm:rounded-3xl">
            <div className="grid lg:grid-cols-2">
              <div className="order-1 flex flex-col justify-center p-4 sm:p-6 lg:order-2 lg:p-8">
                <h1 className="mb-4 font-display text-2xl font-bold text-navy sm:mb-5 sm:text-3xl">
                  Become a Mentor
                </h1>
                <MentorForm className="border-0 bg-transparent p-0 shadow-none sm:p-0 lg:p-0" />
              </div>

              <div className="relative order-2 min-h-[160px] sm:min-h-[200px] lg:order-1 lg:min-h-full">
                <Image
                  src={images.programmes.mentorship}
                  alt="Mentors guiding emerging STEM talent"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/25 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <p className="font-display text-lg font-bold text-white sm:text-xl">
                    Guide Africa&apos;s next STEM leaders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Explore Other Ways to Help"
        description="Volunteer, partner, sponsor a programme, or donate to STEMNova."
      />
    </>
  );
}
