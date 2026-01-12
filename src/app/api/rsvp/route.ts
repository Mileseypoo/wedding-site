import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, attending, guests, dietaryQuestions } = body;

        // Simple validation
        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        const rsvp = await prisma.rSVP.create({
            data: {
                name,
                email,
                attending,
                guests: guests || 1,
                dietaryQuestions
            }
        });

        return NextResponse.json(rsvp);
    } catch (error) {
        console.error('RSVP Error:', error);
        return NextResponse.json({ error: 'Error submitting RSVP' }, { status: 500 });
    }
}
