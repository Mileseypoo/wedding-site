import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() { // Removed unused 'request' parameter
    try {
        const rsvps = await prisma.rSVP.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const csvHeader = 'ID,Party ID,Name,Email,Attending,Sunday Party,Guests,Dietary/Notes,Submitted At\n';
        const csvRows = rsvps.map(r => {
            // Prisma Client returns correct types, no need to manually parse boolean integers
            const isAttending = r.attending;
            const isAttendingSunday = r.attendingSunday || false;
            const createdDate = new Date(r.createdAt).toISOString();

            return `${r.id},"${r.groupId || ''}","${r.name.replace(/"/g, '""')}","${r.email}","${isAttending ? 'Yes' : 'No'}","${isAttendingSunday ? 'Yes' : 'No'}",${r.guests},"${(r.dietaryQuestions || '').replace(/"/g, '""')}","${createdDate}"`;
        }).join('\n');

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
