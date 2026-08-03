import { v2 as cloudinary } from "cloudinary";
import { getCloudinaryConfig } from "@/lib/env";

let configured = false;
let configuredWith = "";

export function getCloudinary() {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const fingerprint = `${cloudName}:${apiKey}`;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_URL (recommended) or CLOUDINARY_NAME/KEY/SECRET."
    );
  }

  if (!configured || configuredWith !== fingerprint) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    configured = true;
    configuredWith = fingerprint;
  }

  return cloudinary;
}

export async function uploadImageBuffer(
  buffer: Buffer,
  options?: { folder?: string; publicId?: string; alt?: string }
) {
  const client = getCloudinary();
  const folder = options?.folder ?? "stemnova";

  return new Promise<{
    public_id: string;
    secure_url: string;
    url: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
    resource_type: string;
  }>((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      {
        folder,
        public_id: options?.publicId,
        resource_type: "image",
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) {
          const message =
            error && typeof error === "object" && "message" in error
              ? String((error as { message: unknown }).message)
              : "Cloudinary upload failed";
          reject(new Error(message));
          return;
        }
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
          url: result.url,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          resource_type: result.resource_type,
        });
      }
    );
    stream.end(buffer);
  });
}
