import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { FORM_TYPES } from "@/lib/submissions";
import type { FormSubmissionStatus, FormSubmissionType } from "@/generated/prisma/client";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const id = searchParams.get("id");

  if (id) {
    const item = await prisma.formSubmission.findUnique({ where: { id } });
    return NextResponse.json(item);
  }

  const items = await prisma.formSubmission.findMany({
    where: {
      ...(type && FORM_TYPES.includes(type as (typeof FORM_TYPES)[number])
        ? { type: type as FormSubmissionType }
        : {}),
      ...(status ? { status: status as FormSubmissionStatus } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json(items);
}

const updateSchema = z.object({
  id: z.string(),
  status: z.enum(["NEW", "READ", "ARCHIVED"]),
});

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const item = await prisma.formSubmission.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  await prisma.formSubmission.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
