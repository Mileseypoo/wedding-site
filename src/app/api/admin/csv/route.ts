import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() { // Removed unused 'request' parameter
    try {
        // Fallback for model name accessing
        const rsvpModel = prisma.rSVP || (prisma as any).rsvp || (prisma as any).RSVP;

        if (!rsvpModel) {
            throw new Error('RSVP model not found on Prisma Client');
        }

        const rsvps = await rsvpModel.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const csvHeader = 'ID,Party ID,Name,Email,Attending,Sunday Party,Guests,Dietary/Notes,Submitted At\n';
        const csvRows = rsvps.map(r => {
            const isAttending = r.attending;
            const isAttendingSunday = r.attendingSunday || false;
            // Handle valid date objects or strings
            let createdDate = '';
            try {
                createdDate = new Date(r.createdAt).toISOString();
            } catch (e) {
                createdDate = String(r.createdAt);
            }

            return `${r.id},"${r.groupId || ''}","${r.name.replace(/"/g, '""')}","${r.email}","${isAttending ? 'Yes' : 'No'}","${isAttendingSunday ? 'Yes' : 'No'}",${r.guests},"${(r.dietaryQuestions || '').replace(/"/g, '""')}","${createdDate}"`;
        }).join('\n');

        const csv = csvHeader + csvRows;

        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="rsvps_${new Date().toISOString().split('T')[0]}.csv"`,
            },
        });
    } catch (error: any) {
        console.error('CSV Export Error:', error);
        // Expose error message to user for debugging
        return NextResponse.json({ error: `Failed to generate CSV: ${error.message}` }, { status: 500 });
    }
}
