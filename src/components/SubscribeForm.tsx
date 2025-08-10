'use client';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'ok'|'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('idle');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setStatus('ok');
      setMessage('Check your email to confirm.');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 items-center">
      <Input type="email" required placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
      <Button type="submit">Subscribe</Button>
      {message && <span className={`text-sm ${status==='error' ? 'text-red-600' : 'text-green-700'}`}>{message}</span>}
    </form>
  );
}
