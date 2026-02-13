import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const sections = await prisma.pageSection.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(sections);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
    }
}
