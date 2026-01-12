import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() { // Removed unused 'request' parameter
    try {
        const rsvps = await prisma.rSVP.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const csvHeader = 'ID,Name,Email,Attending,Guests,Dietary/Notes,Submitted At\n';
        const csvRows = rsvps.map(r =>
            `${r.id},"${r.name.replace(/"/g, '""')}","${r.email}","${r.attending ? 'Yes' : 'No'}",${r.guests},"${(r.dietaryQuestions || '').replace(/"/g, '""')}","${r.createdAt.toISOString()}"`
        ).join('\n');

        const csv = csvHeader + csvRows;

        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="rsvps_${new Date().toISOString().split('T')[0]}.csv"`,
            },
        });
    } catch (error) {
        console.error('CSV Export Error:', error);
        return NextResponse.json({ error: 'Failed to generate CSV' }, { status: 500 });
    }
}
