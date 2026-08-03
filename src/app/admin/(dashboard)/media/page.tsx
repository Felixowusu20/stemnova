import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          Assets
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">
          Media library
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-navy/60">
          Upload images to Cloudinary and reuse them across programmes, events,
          blog posts, and branding.
        </p>
      </header>
      <MediaLibrary />
    </div>
  );
}
