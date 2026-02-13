"use client";
import { useState, useEffect } from 'react';

type Message = {
    id: number;
    name: string;
    message: string;
    createdAt: string;
};

export default function Guestbook() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const res = await fetch('/api/guestbook');
        if (res.ok) {
            const data = await res.json();
            setMessages(data);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        const res = await fetch('/api/guestbook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, message })
        });

        if (res.ok) {
            setStatus('success');
            setName('');
            setMessage('');
            fetchMessages();
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Leave a Note</h3>

            <form onSubmit={handleSubmit} style={{ marginBottom: '50px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Your Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Message</label>
                    <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}
                    />
                </div>
                <button type="submit" className="btn" disabled={status === 'submitting'} style={{ width: '100%' }}>
                    {status === 'submitting' ? 'Posting...' : 'Sign Guestbook'}
                </button>
                {status === 'success' && <p style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>Message posted!</p>}
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                        <p style={{ fontStyle: 'italic', marginBottom: '5px', color: '#555' }}>"{msg.message}"</p>
                        <p style={{ fontSize: '0.8rem', color: '#999', textAlign: 'right' }}>— {msg.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
