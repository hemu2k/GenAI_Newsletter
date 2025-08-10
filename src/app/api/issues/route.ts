import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { slugify } from '@/lib/slug';
import { z } from 'zod';
import { requireBasicAuth } from '@/lib/auth';

const Body = z.object({ title: z.string().min(3), html: z.string().min(1) });

export async function POST(req: NextRequest) {
  if (!requireBasicAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const json = await req.json();
  const parsed = Body.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  const { title, html } = parsed.data;
  const slug = slugify(title);
  const issue = await prisma.issue.create({ data: { title, slug, html } });
  return NextResponse.json({ id: issue.id, slug: issue.slug });
}
