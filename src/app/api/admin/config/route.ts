import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const config = await prisma.siteConfig.findFirst();
        return NextResponse.json(config || {});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const config = await prisma.siteConfig.findFirst();

        const updated = await prisma.siteConfig.upsert({
            where: { id: config?.id || 0 },
            update: data,
            create: data,
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
}
