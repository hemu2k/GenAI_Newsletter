import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendConfirmEmail } from '@/lib/email';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';

const Body = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = Body.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  const { email } = parsed.data;

  // Ensure idempotency: reuse existing unconfirmed token or generate new
  const existing = await prisma.subscriber.findUnique({ where: { email } }).catch(()=>null);
  const token = existing?.token ?? uuid();

  await prisma.subscriber.upsert({
    where: { email },
    update: { token },
    create: { email, token }
  });

  await sendConfirmEmail(email, token);
  return NextResponse.json({ ok: true });
}
