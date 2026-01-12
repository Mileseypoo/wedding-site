
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to connect to database...');
        const rsvp = await prisma.rSVP.create({
            data: {
                name: 'Test User',
                email: 'test@example.com',
                attending: true,
                guests: 1,
                dietaryQuestions: 'None'
            }
        });
        console.log('Successfully created RSVP:', rsvp);
    } catch (e) {
        console.error('Error creating RSVP:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
