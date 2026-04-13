"use client";
import Link from "next/link";
import { useState } from "react";
import AdminCMS from "@/components/AdminCMS";
import RSVPManager from "@/components/RSVPManager";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded password for the couple
        if (password.toLowerCase() === "walton") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9' }}>
                <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#333' }}>Admin Access</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '15px', width: '100%' }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#43B097',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            Enter
                        </button>
                    </form>
                    <div style={{ marginTop: '20px' }}>
                        <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>&larr; Back to Website</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                <h1 style={{ fontSize: '2rem', margin: 0 }}>Wedding Admin</h1>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Logout
                </button>
            </div>

            <div style={{ padding: '40px', border: '1px solid #ddd', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                        <h2 style={{ marginTop: 0, color: 'var(--primary-teal-dark)' }}>RSVP Management</h2>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>View, edit, or delete guest RSVPs directly below.</p>
                    </div>
                    <a
                        href="/api/admin/csv"
                        target="_blank"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#43B097',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                        }}
                    >
                        ⬇ Download CSV
                    </a>
                </div>

                <RSVPManager />
            </div>

            <div style={{ marginTop: '50px', borderTop: '2px solid #eee', paddingTop: '30px' }}>
                <h2 style={{ marginTop: 0, color: 'var(--primary-teal-dark)' }}>CMS - Site Editor</h2>
                <p style={{ color: '#666' }}>Edit website content, colors, and fonts.</p>
                <AdminCMS />
            </div>

            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <Link href="/" style={{ color: '#43B097', textDecoration: 'underline' }}>&larr; Back to Home</Link>
            </div>
        </div>
    );
}
