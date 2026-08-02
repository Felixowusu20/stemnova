import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { uploadImageBuffer } from "@/lib/cloudinary";

function isUploadFile(value: FormDataEntryValue | null): value is File {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as File).arrayBuffer === "function" &&
    typeof (value as File).size === "number" &&
    (value as File).size > 0
  );
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return NextResponse.json(assets);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const alt = String(form.get("alt") || "");
    const title = String(form.get("title") || "");
    const folder = String(form.get("folder") || "stemnova");

    if (!isUploadFile(file)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImageBuffer(buffer, { folder, alt });

    const asset = await prisma.mediaAsset.create({
      data: {
        publicId: uploaded.public_id,
        url: uploaded.url,
        secureUrl: uploaded.secure_url,
        width: uploaded.width,
        height: uploaded.height,
        format: uploaded.format,
        resourceType: uploaded.resource_type,
        folder,
        alt: alt || null,
        title: title || file.name,
        bytes: uploaded.bytes,
      },
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error("[admin/media] upload failed:", error);
    const message =
      error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Delete media:
 * - ?id=… — single asset
 * - ?scope=seeded — wipe catalog rows from prisma seed (folder/publicId seeded/*)
 */
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const scope = searchParams.get("scope");

  if (scope === "seeded") {
    const result = await prisma.mediaAsset.deleteMany({
      where: {
        OR: [
          { folder: { startsWith: "stemnova/seeded" } },
          { publicId: { startsWith: "seeded/" } },
        ],
      },
    });
    return NextResponse.json({ ok: true, deleted: result.count });
  }

  if (!id) {
    return NextResponse.json(
      { error: "id or scope=seeded required" },
      { status: 400 }
    );
  }

  await prisma.mediaAsset.delete({ where: { id } });
  return NextResponse.json({ ok: true, deleted: 1 });
}
