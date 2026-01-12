import Link from "next/link";

export default function AdminPage() {
    return (
        <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                Wedding Admin
            </h1>

            <div style={{ padding: '30px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ marginTop: 0 }}>RSVP Data</h2>
                <p style={{ marginBottom: '20px', color: '#666' }}>
                    Download the latest list of RSVPs as a CSV spreadsheet. You can open this file in Excel or Google Sheets.
                </p>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <a
                        href="/api/admin/csv"
                        target="_blank"
                        style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            backgroundColor: '#43B097', // Primary Teal
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}
                    >
                        Download CSV
                    </a>
                    <span style={{ fontSize: '0.9rem', color: '#999' }}>
                        (Includes Name, Email, Attendance, Guests, Dietary Notes)
                    </span>
                </div>
            </div>

            <div style={{ marginTop: '50px' }}>
                <Link href="/" style={{ color: '#43B097', textDecoration: 'underline' }}>&larr; Back to Website</Link>
            </div>
        </div>
    );
}
