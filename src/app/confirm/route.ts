import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  const sub = await prisma.subscriber.findUnique({ where: { token } });
  if (!sub) return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  if (!sub.confirmedAt) {
    await prisma.subscriber.update({ where: { id: sub.id }, data: { confirmedAt: new Date() } });
  }
  return NextResponse.redirect(new URL('/', process.env.BASE_URL));
}
