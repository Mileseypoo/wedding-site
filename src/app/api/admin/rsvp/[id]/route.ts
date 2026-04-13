import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        
        // Remove ID from body to prevent Prisma errors
        const { id: _, ...dataToUpdate } = body;

        const updated = await prisma.rSVP.update({
            where: { id: parseInt(id) },
            data: {
                ...dataToUpdate,
                // Ensure correct types
                attending: dataToUpdate.attending === true || dataToUpdate.attending === 'true',
                attendingSunday: dataToUpdate.attendingSunday === true || dataToUpdate.attendingSunday === 'true',
                guests: parseInt(dataToUpdate.guests) || 1
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Update RSVP error:', error);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.rSVP.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete RSVP error:', error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
