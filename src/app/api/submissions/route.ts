import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import {
  pickContactFields,
  submissionSchema,
} from "@/lib/submissions";

export async function POST(request: Request) {
  try {
    const parsed = submissionSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { type, payload, relatedSlug, relatedTitle } = parsed.data;
    const fields = pickContactFields(payload);

    if (!fields.email && type !== "NEWSLETTER") {
      if (!payload.email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }
    }

    const item = await prisma.formSubmission.create({
      data: {
        type,
        name: fields.name,
        email: fields.email || String(payload.email || ""),
        subject: fields.subject,
        message: fields.message,
        relatedSlug: relatedSlug || null,
        relatedTitle: relatedTitle || null,
        payload: payload as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ ok: true, id: item.id }, { status: 201 });
  } catch (error) {
    console.error("Form submission failed", error);
    return NextResponse.json(
      { error: "Unable to save submission" },
      { status: 500 }
    );
  }
}
