/**
 * Resolve environment variables across both the documented template names
 * and the project's existing .env.local naming conventions.
 */

export function getAppUrl() {
  return (
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  );
}

export function getAuthSecret() {
  return (
    process.env.NEXTAUTH_SECRET ||
    process.env.APP_SECRET ||
    process.env.JWT_SECRET ||
    process.env.ADMIN_JWT_SECRET ||
    ""
  );
}

export function getAdminSeedCredentials() {
  return {
    email:
      process.env.ADMIN_EMAIL ||
      process.env.ADMIN_SEED_EMAIL ||
      "",
    password:
      process.env.ADMIN_PASSWORD ||
      process.env.ADMIN_SEED_PASSWORD ||
      "",
  };
}

export function getCloudinaryConfig() {
  const fromUrl = parseCloudinaryUrl(process.env.CLOUDINARY_URL);

  // Prefer CLOUDINARY_URL when complete — discrete KEY/SECRET vars can drift.
  if (fromUrl?.cloudName && fromUrl.apiKey && fromUrl.apiSecret) {
    return fromUrl;
  }

  return {
    cloudName:
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_NAME ||
      "",
    apiKey:
      process.env.CLOUDINARY_API_KEY ||
      process.env.CLOUDINARY_KEY ||
      "",
    apiSecret:
      process.env.CLOUDINARY_API_SECRET ||
      process.env.CLOUDINARY_SECRET ||
      "",
  };
}

function parseCloudinaryUrl(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return {
      cloudName: parsed.hostname,
      apiKey: decodeURIComponent(parsed.username),
      apiSecret: decodeURIComponent(parsed.password),
    };
  } catch {
    return null;
  }
}
