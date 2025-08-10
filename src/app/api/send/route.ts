import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendIssueEmail } from '@/lib/email';
import { requireBasicAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if (!requireBasicAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { issueId } = await req.json();
  if (!issueId) return NextResponse.json({ error: 'issueId required' }, { status: 400 });
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

  const subs = await prisma.subscriber.findMany({ where: { confirmedAt: { not: null } } });
  let sent = 0;
  for (const s of subs) {
    await sendIssueEmail(s.email, issue.title, issue.html);
    sent++;
  }
  await prisma.issue.update({ where: { id: issue.id }, data: { publishedAt: new Date(), subscribers: { set: subs.map(s=>({ id: s.id })) } } });
  return NextResponse.json({ sent });
}
