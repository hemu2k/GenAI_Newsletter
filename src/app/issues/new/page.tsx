'use client';
import { useState } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function NewIssuePage() {
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState('<p>Hello subscribers!</p>');
  const [message, setMessage] = useState('');

  async function createIssue(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, html })
    });
    const data = await res.json();
    if (!res.ok) return setMessage(data.error || 'Failed');
    setMessage(`Created issue: ${data.slug}`);
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Create Issue</h1>
      <form onSubmit={createIssue} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="w-full border rounded p-2 h-64" value={html} onChange={e=>setHtml(e.target.value)} />
        <Button type="submit">Save</Button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </Container>
  );
}
