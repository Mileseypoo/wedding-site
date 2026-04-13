'use client';

import { useState, useEffect } from 'react';

type RSVP = {
    id: number;
    groupId: string | null;
    name: string;
    email: string;
    attending: boolean;
    guests: number;
    dietaryQuestions: string | null;
    attendingSunday: boolean | null;
    createdAt: string;
};

export default function RSVPManager() {
    const [rsvps, setRsvps] = useState<RSVP[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<RSVP | null>(null);

    useEffect(() => {
        fetchRSVPs();
    }, []);

    const fetchRSVPs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/rsvp');
            const data = await res.json();
            setRsvps(data);
        } catch (e) {
            console.error(e);
            alert('Failed to load RSVPs');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (rsvp: RSVP) => {
        setEditingId(rsvp.id);
        setEditData({ ...rsvp });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData(null);
    };

    const handleSave = async () => {
        if (!editData) return;
        try {
            const res = await fetch(`/api/admin/rsvp/${editData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });
            if (res.ok) {
                setEditingId(null);
                setEditData(null);
                fetchRSVPs();
            } else {
                alert('Save failed');
            }
        } catch (e) {
            alert('Error saving RSVP');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this RSVP?')) return;
        try {
            const res = await fetch(`/api/admin/rsvp/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchRSVPs();
            } else {
                alert('Delete failed');
            }
        } catch (e) {
            alert('Error deleting RSVP');
        }
    };

    if (loading) return <div>Loading RSVPs...</div>;

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '10px' }}>Name</th>
                            <th style={{ padding: '10px' }}>Attending?</th>
                            <th style={{ padding: '10px' }}>Sunday?</th>
                            <th style={{ padding: '10px' }}>Dietary / Notes</th>
                            <th style={{ padding: '10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rsvps.map((rsvp) => (
                            <tr key={rsvp.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '10px' }}>
                                    {editingId === rsvp.id ? (
                                        <input 
                                            value={editData?.name} 
                                            onChange={(e) => setEditData(prev => prev ? {...prev, name: e.target.value} : null)}
                                            style={{ width: '100%', padding: '4px' }}
                                        />
                                    ) : (
                                        <div>
                                            <strong>{rsvp.name}</strong>
                                            <div style={{ fontSize: '0.75rem', color: '#888' }}>{rsvp.email}</div>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    {editingId === rsvp.id ? (
                                        <select 
                                            value={editData?.attending ? 'true' : 'false'}
                                            onChange={(e) => setEditData(prev => prev ? {...prev, attending: e.target.value === 'true'} : null)}
                                            style={{ padding: '4px' }}
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    ) : (
                                        <span style={{ color: rsvp.attending ? '#43B097' : '#ff4d4f', fontWeight: 'bold' }}>
                                            {rsvp.attending ? 'YES' : 'NO'}
                                        </span>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    {editingId === rsvp.id ? (
                                        <select 
                                            value={editData?.attendingSunday ? 'true' : 'false'}
                                            onChange={(e) => setEditData(prev => prev ? {...prev, attendingSunday: e.target.value === 'true'} : null)}
                                            style={{ padding: '4px' }}
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    ) : (
                                        <span>{rsvp.attendingSunday ? '✅' : '❌'}</span>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    {editingId === rsvp.id ? (
                                        <textarea 
                                            value={editData?.dietaryQuestions || ''} 
                                            onChange={(e) => setEditData(prev => prev ? {...prev, dietaryQuestions: e.target.value} : null)}
                                            style={{ width: '100%', padding: '4px' }}
                                        />
                                    ) : (
                                        <div style={{ fontStyle: 'italic', maxWidth: '200px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                            {rsvp.dietaryQuestions || '-'}
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {editingId === rsvp.id ? (
                                            <>
                                                <button onClick={handleSave} style={{ background: '#43B097', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}>Save</button>
                                                <button onClick={handleCancel} style={{ background: '#ccc', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(rsvp)} style={{ background: 'none', border: '1px solid #ddd', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}>Edit</button>
                                                <button onClick={() => handleDelete(rsvp.id)} style={{ background: 'none', border: '1px solid #ff4d4f', color: '#ff4d4f', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}>Delete</button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {rsvps.length === 0 && <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No RSVPs yet.</div>}
        </div>
    );
}
