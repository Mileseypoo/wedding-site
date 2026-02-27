import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const section = await prisma.pageSection.findUnique({
        where: { key: 'memories' },
    });

    if (section) {
        await prisma.pageSection.update({
            where: { key: 'memories' },
            data: {
                metadata: JSON.stringify({
                    uploadLink: 'https://drive.google.com/drive/folders/1nJtIjOjFztQn0oKQ8xuID8v50WjCxp0M',
                    buttonText: 'Upload Photos',
                })
            }
        });
        console.log('Updated memories section in database.');
    } else {
        console.log('Memories section not found in database.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
