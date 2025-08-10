import { prisma } from '@/lib/db';
import Container from '@/components/Container';
import { notFound } from 'next/navigation';

export default async function IssuePage({ params: { slug } }: { params: { slug: string }}) {
  const issue = await prisma.issue.findUnique({ where: { slug } });
  if (!issue) return notFound();
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
      <article className="prose" dangerouslySetInnerHTML={{ __html: issue.html }} />
    </Container>
  );
}
