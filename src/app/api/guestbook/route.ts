import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const messages = await prisma.guestbookMessage.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50
        });
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, message } = body;

        if (!name || !message) {
            return NextResponse.json({ error: 'Name and message required' }, { status: 400 });
        }

        const newMessage = await prisma.guestbookMessage.create({
            data: { name, message }
        });
        return NextResponse.json(newMessage);
    } catch (error) {
        return NextResponse.json({ error: 'Error submitting message' }, { status: 500 });
    }
}
