import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ key: string }> }
) {
    try {
        const { key } = await params;
        const body = await request.json();

        // Ensure we don't accidentally update the key itself unless intended (which breaks the where clause if not careful)
        // We update using `where: { key }`
        // The body might contain 'key', so let's exclude it or trust update will fail if key changes to duplicate.
        // Ideally we just update title, subtitle, content, imageUrl, metadata, isVisible.

        // Pruning body slightly for safety? Or just passing it.
        // Let's just pass body but remove 'id' and 'key' to be safe.
        const { id, key: bodyKey, ...dataToUpdate } = body;

        const updated = await prisma.pageSection.update({
            where: { key: key },
            data: dataToUpdate,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Update section error:', error);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
