"use client";
import { useState } from 'react';

export default function RSVPForm() {
    // Initial State: One guest (the main user)
    const [guests, setGuests] = useState([
        { name: '', email: '', attending: 'yes', dietary: '', attendingSunday: false }
    ]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Helper to update a specific guest's field
    const updateGuest = (index: number, field: string, value: any) => {
        const newGuests = [...guests];
        newGuests[index] = { ...newGuests[index], [field]: value };
        setGuests(newGuests);
    };

    // Helper to update dietary checkboxes
    const updateDietary = (index: number, option: string, checked: boolean) => {
        const current = guests[index].dietary || '';
        let next = '';
        if (checked) {
            next = current ? `${current}, ${option}` : option;
        } else {
            next = current.replace(new RegExp(`(, )?${option}(, )?`), '').trim();
            // clean up trailing commas if any specific regex misses
            if (next.startsWith(', ')) next = next.substring(2);
            if (next.endsWith(', ')) next = next.substring(0, next.length - 2);
        }
        updateGuest(index, 'dietary', next);
    };

    const addGuest = () => {
        setGuests([...guests, { name: '', email: '', attending: 'yes', dietary: '', attendingSunday: false }]);
    };

    const removeGuest = (index: number) => {
        const newGuests = guests.filter((_, i) => i !== index);
        setGuests(newGuests);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Transform for API
        // API expects { name, email, attending: bool, dietaryQuestions, attendingSunday: bool }
        const payload = guests.map(g => ({
            name: g.name,
            email: g.email,
            attending: g.attending === 'yes',
            dietaryQuestions: g.dietary,
            attendingSunday: g.attendingSunday
        }));

        try {
            const res = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
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
                <p>Your RSVP response has been recorded.</p>
                <button
                    onClick={() => {
                        setGuests([{ name: '', email: '', attending: 'yes', dietary: '', attendingSunday: false }]);
                        setStatus('idle');
                    }}
                    style={{ marginTop: '20px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
                >
                    Submit another response
                </button>
            </div>
        );
    }

    const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Nut Allergy', 'Dairy-Free'];

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>

            {guests.map((guest, index) => (
                <div key={index} style={{
                    marginBottom: '30px',
                    padding: '20px',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    backgroundColor: index === 0 ? '#fff' : '#f9f9f9',
                    position: 'relative'
                }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h4 style={{ margin: 0, color: 'var(--primary-teal-dark)' }}>
                            {index === 0 ? 'Your Details' : `Guest ${index + 1}`}
                        </h4>
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeGuest(index)}
                                style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '1.2rem' }}
                                title="Remove Guest"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name {index === 0 && '*'}</label>
                        <input
                            type="text"
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            value={guest.name}
                            onChange={e => updateGuest(index, 'name', e.target.value)}
                            placeholder="Full Name"
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Email Address {index === 0 ? '*' : <span style={{ fontWeight: 'normal', fontSize: '0.9rem', color: '#666' }}>(Optional)</span>}
                        </label>
                        <input
                            type="email"
                            required={index === 0}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            value={guest.email}
                            onChange={e => updateGuest(index, 'email', e.target.value)}
                            placeholder={index === 0 ? "your@email.com" : ""}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Attending?</label>
                        <select
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            value={guest.attending}
                            onChange={e => updateGuest(index, 'attending', e.target.value)}
                        >
                            <option value="yes">Joyfully Accepts</option>
                            <option value="no">Regretfully Declines</option>
                        </select>
                    </div>

                    {guest.attending === 'yes' && (
                        <div>
                            <div style={{
                                marginBottom: '20px',
                                padding: '15px',
                                backgroundColor: '#f0fdf4',
                                borderRadius: '6px',
                                border: '1px dashed var(--primary-teal)'
                            }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', margin: 0 }}>
                                    <input
                                        type="checkbox"
                                        checked={guest.attendingSunday}
                                        onChange={e => updateGuest(index, 'attendingSunday', e.target.checked)}
                                        style={{ width: '18px', height: '18px' }}
                                    />
                                    <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                                        Attending Indi's Birthday on Sunday?
                                    </span>
                                </label>
                            </div>

                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Dietary Requests & Songs</label>

                            {/* Dietary Checkboxes */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                                {dietaryOptions.map((opt) => (
                                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={(guest.dietary || '').includes(opt)}
                                            onChange={(e) => updateDietary(index, opt, e.target.checked)}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>

                            <textarea
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' }}
                                value={guest.dietary}
                                onChange={e => updateGuest(index, 'dietary', e.target.value)}
                                placeholder="Specific allergies or song requests..."
                            />
                        </div>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={addGuest}
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    background: 'none',
                    color: '#666',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginBottom: '30px'
                }}
            >
                + Add Another Guest
            </button>

            <button
                type="submit"
                className="btn"
                style={{ width: '100%' }}
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? 'Sending RSVP...' : 'Send RSVP'}
            </button>

            {status === 'error' && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
        </form>
    );
}
