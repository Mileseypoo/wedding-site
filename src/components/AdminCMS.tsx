'use client';

import { useState, useEffect } from 'react';

type Section = {
    id: number;
    key: string;
    title: string | null;
    subtitle: string | null;
    content: string | null;
    imageUrl: string | null;
    isVisible: boolean;
    metadata: string | null;
};

type SiteConfig = {
    id: number;
    siteTitle: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    foregroundColor: string;
    fontHeading: string;
    fontBody: string;
};

export default function AdminCMS() {
    const [activeTab, setActiveTab] = useState<'content' | 'theme'>('content');
    const [sections, setSections] = useState<Section[]>([]);
    const [config, setConfig] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingSection, setEditingSection] = useState<Section | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sectionsRes, configRes] = await Promise.all([
                fetch('/api/admin/sections'),
                fetch('/api/admin/config')
            ]);
            const sectionsData = await sectionsRes.json();
            const configData = await configRes.json();
            setSections(sectionsData);
            setConfig(configData);
        } catch (e) {
            console.error(e);
            alert('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSection = async (section: Section) => {
        try {
            const res = await fetch(`/api/admin/sections/${section.key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(section),
            });
            if (res.ok) {
                alert('Section updated!');
                setEditingSection(null);
                fetchData();
            } else {
                alert('Failed to update');
            }
        } catch (e) {
            alert('Error saving section');
        }
    };

    const handleSaveConfig = async (newConfig: SiteConfig) => {
        try {
            const res = await fetch('/api/admin/config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newConfig),
            });
            if (res.ok) {
                alert('Theme updated!');
                fetchData();
            } else {
                alert('Failed to update theme');
            }
        } catch (e) {
            alert('Error updating theme');
        }
    };

    if (loading) return <div>Loading CMS...</div>;

    return (
        <div className="cms-container" style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <button
                    onClick={() => setActiveTab('content')}
                    style={{ padding: '10px 20px', fontWeight: activeTab === 'content' ? 'bold' : 'normal', borderBottom: activeTab === 'content' ? '2px solid #43B097' : 'none' }}
                >
                    Content Editor
                </button>
                <button
                    onClick={() => setActiveTab('theme')}
                    style={{ padding: '10px 20px', fontWeight: activeTab === 'theme' ? 'bold' : 'normal', borderBottom: activeTab === 'theme' ? '2px solid #43B097' : 'none' }}
                >
                    Theme Settings
                </button>
            </div>

            {activeTab === 'content' && (
                <div className="content-editor">
                    {editingSection ? (
                        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                            <h3>Editing: {editingSection.key}</h3>
                            <div style={{ display: 'grid', gap: '15px' }}>
                                <label>
                                    Title
                                    <input
                                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                        value={editingSection.title || ''}
                                        onChange={e => setEditingSection({ ...editingSection, title: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Subtitle
                                    <input
                                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                        value={editingSection.subtitle || ''}
                                        onChange={e => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Content
                                    <textarea
                                        rows={10}
                                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                        value={editingSection.content || ''}
                                        onChange={e => setEditingSection({ ...editingSection, content: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Image URL
                                    <input
                                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                        value={editingSection.imageUrl || ''}
                                        onChange={e => setEditingSection({ ...editingSection, imageUrl: e.target.value })}
                                    />
                                </label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleSaveSection(editingSection)} style={{ background: '#43B097', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }}>Save Changes</button>
                                    <button onClick={() => setEditingSection(null)} style={{ background: '#ccc', padding: '10px 20px', border: 'none', borderRadius: '4px' }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '10px' }}>
                            {sections.map(section => (
                                <div key={section.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'white', border: '1px solid #ddd', borderRadius: '6px', alignItems: 'center' }}>
                                    <div>
                                        <strong>{section.key.toUpperCase()}</strong>
                                        <div style={{ fontSize: '0.9em', color: '#666' }}>{section.title || '(No Main Title)'}</div>
                                    </div>
                                    <button onClick={() => setEditingSection(section)} style={{ padding: '5px 15px', cursor: 'pointer' }}>Edit</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'theme' && config && (
                <div className="theme-editor" style={{ display: 'grid', gap: '15px', maxWidth: '500px' }}>
                    <label>
                        Site Title
                        <input
                            style={{ width: '100%', padding: '8px' }}
                            value={config.siteTitle}
                            onChange={e => setConfig({ ...config, siteTitle: e.target.value })}
                        />
                    </label>
                    <label>
                        Primary Color
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="color" value={config.primaryColor} onChange={e => setConfig({ ...config, primaryColor: e.target.value })} />
                            <input type="text" value={config.primaryColor} onChange={e => setConfig({ ...config, primaryColor: e.target.value })} />
                        </div>
                    </label>
                    <label>
                        Secondary Color
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="color" value={config.secondaryColor} onChange={e => setConfig({ ...config, secondaryColor: e.target.value })} />
                            <input type="text" value={config.secondaryColor} onChange={e => setConfig({ ...config, secondaryColor: e.target.value })} />
                        </div>
                    </label>
                    <label>
                        Background Color
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="color" value={config.backgroundColor} onChange={e => setConfig({ ...config, backgroundColor: e.target.value })} />
                            <input type="text" value={config.backgroundColor} onChange={e => setConfig({ ...config, backgroundColor: e.target.value })} />
                        </div>
                    </label>
                    <label>
                        Heading Font (Google Font Name)
                        <input
                            style={{ width: '100%', padding: '8px' }}
                            value={config.fontHeading}
                            onChange={e => setConfig({ ...config, fontHeading: e.target.value })}
                        />
                    </label>
                    <label>
                        Body Font (Google Font Name)
                        <input
                            style={{ width: '100%', padding: '8px' }}
                            value={config.fontBody}
                            onChange={e => setConfig({ ...config, fontBody: e.target.value })}
                        />
                    </label>
                    <button onClick={() => handleSaveConfig(config)} style={{ background: '#43B097', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', marginTop: '10px' }}>Save Theme Settings</button>
                </div>
            )}
        </div>
    );
}
