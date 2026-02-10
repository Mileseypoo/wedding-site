import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Ensure we work with an array
        const rsvps = Array.isArray(body) ? body : [body];

        if (rsvps.length === 0) {
            return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        }

        // The first person is the "Main" contact, we can use their email as fallback
        const mainEmail = rsvps[0].email;

        if (!rsvps[0].name || !mainEmail) {
            return NextResponse.json({ error: 'Main guest name and email are required' }, { status: 400 });
        }

        // Generate a unique Group ID for this submission batch
        const groupId = `grp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const stats = [];

        // Process each RSVP
        // Using a transaction would be better, but sequential create is fine for SQLite here
        for (const data of rsvps) {
            const { name, email, attending, dietaryQuestions, attendingSunday } = data;

            // Use specific email if provided, otherwise fallback to main contact email
            // This satisfies the "not required for guests" rule while keeping DB happy
            const finalEmail = email && email.trim() !== '' ? email : mainEmail;

            // Using Prisma Client for database-agnostic insertion (works with both SQLite and Postgres)
            const entry = await prisma.rSVP.create({
                data: {
                    groupId,
                    name,
                    email: finalEmail,
                    attending: attending === true || attending === 'yes',
                    guests: 1,
                    dietaryQuestions: dietaryQuestions || null,
                    attendingSunday: attendingSunday || false
                }
            });
            stats.push(entry);
        }

        return NextResponse.json({ success: true, count: stats.length });
    } catch (error) {
        console.error('RSVP Error:', error);
        return NextResponse.json({ error: 'Error submitting RSVP' }, { status: 500 });
    }
}
