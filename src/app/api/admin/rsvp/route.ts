import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const rsvps = await prisma.rSVP.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(rsvps);
    } catch (error) {
        console.error('Error fetching RSVPs:', error);
        return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 });
    }
}
