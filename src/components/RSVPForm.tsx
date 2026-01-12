"use client";
import { useState } from 'react';

export default function RSVPForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'yes',
        guests: 1,
        dietaryQuestions: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    attending: formData.attending === 'yes',
                    guests: parseInt(formData.guests.toString())
                })
            });

            if (!res.ok) throw new Error('Failed');
            setStatus('success');
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
                <h3 style={{ color: 'var(--primary-teal)', fontSize: '1.5rem', marginBottom: '10px' }}>Thank You!</h3>
                <p>Your RSVP has been received. We can't wait to see you!</p>
                <button
                    onClick={() => setStatus('idle')}
                    style={{ marginTop: '20px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
                >
                    Submit another response
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name(s)</label>
                <input
                    type="text"
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Becca & Sameep"
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Address</label>
                <input
                    type="email"
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Will you be attending?</label>
                <select
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={formData.attending}
                    onChange={e => setFormData({ ...formData, attending: e.target.value })}
                >
                    <option value="yes">Joyfully Accepts</option>
                    <option value="no">Regretfully Declines</option>
                </select>
            </div>

            {formData.attending === 'yes' && (
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Number of Guests</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    />
                </div>
            )}

            <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Dietary Requests & Songs</label>

                {/* Dietary Checkboxes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                    {['Vegetarian', 'Vegan', 'Gluten-Free', 'Nut Allergy', 'Dairy-Free'].map((opt) => (
                        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    const current = formData.dietaryQuestions;
                                    const next = e.target.checked
                                        ? (current ? current + ', ' + opt : opt)
                                        : current.replace(new RegExp(`(, )?${opt}(, )?`), '').trim();
                                    setFormData({ ...formData, dietaryQuestions: next });
                                }}
                            />
                            {opt}
                        </label>
                    ))}
                </div>

                <textarea
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
                    value={formData.dietaryQuestions}
                    onChange={e => setFormData({ ...formData, dietaryQuestions: e.target.value })}
                    placeholder="Any specific allergies (e.g. Shellfish) or song requests?"
                />
            </div>

            <button
                type="submit"
                className="btn"
                style={{ width: '100%' }}
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? 'Sending...' : 'Send RSVP'}
            </button>

            {status === 'error' && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
        </form>
    );
}
