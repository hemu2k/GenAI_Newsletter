'use client';
import { useState } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function AdminPage() {
  const [issueId, setIssueId] = useState('');
  const [status, setStatus] = useState('');

  async function send() {
    setStatus('');
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issueId })
    });
    const data = await res.json();
    setStatus(res.ok ? `Sent to ${data.sent} subscribers` : (data.error || 'Failed'));
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <div className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Issue ID" value={issueId} onChange={e=>setIssueId(e.target.value)} />
        <Button onClick={send}>Send Issue</Button>
        {status && <p className="text-sm">{status}</p>}
      </div>
    </Container>
  );
}
