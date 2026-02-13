import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Default Site Config
    await prisma.siteConfig.create({
        data: {
            siteTitle: 'Becca & Sameep',
            primaryColor: '#889C5B',
            secondaryColor: '#D4B996',
            backgroundColor: '#FDFBF7',
            foregroundColor: '#1A2B4C',
            fontHeading: 'Cinzel',
            fontBody: 'Montserrat',
        },
    })

    // Hero Section
    await prisma.pageSection.create({
        data: {
            key: 'hero',
            title: 'Becca & Sameep',
            subtitle: 'are getting married!',
            metadata: JSON.stringify({
                mainImageUrl: '/samandbecny.jpg',
                date: 'July 4th 2026',
                location: 'Walton Castle, Clevedon',
            }),
            order: 0,
        },
    })

    // Welcome Section
    await prisma.pageSection.create({
        data: {
            key: 'welcome',
            title: 'Welcome to our wedding website!',
            content: "We can't wait to celebrate our special day with you. We've created this website as a convenient and interactive way to share all the important details with you in the lead up to our wedding.",
            imageUrl: '/niagra.png',
            order: 1,
        },
    })

    // Venue Section
    await prisma.pageSection.create({
        data: {
            key: 'venue',
            title: 'The Venue',
            subtitle: 'Walton Castle',
            content: "A stunning 17th-century hill-top castle with panoramic views spanning five counties. We have exclusive use of the entire estate for a celebration to remember.",
            imageUrl: '/walton_castle.jpg',
            metadata: JSON.stringify({
                address: 'Clevedon, North Somerset',
                buttonLink: 'https://www.waltoncastle.com/properties/walton-castle',
                buttonText: 'Explore the Castle',
            }),
            order: 2,
        },
    })

    // Timings Section (Wedding Timings)
    await prisma.pageSection.create({
        data: {
            key: 'timings',
            title: 'Wedding Timings',
            content: JSON.stringify({
                mainCard: {
                    title: 'Saturday, July 4th',
                    ceremony: { time: '12:00 PM', title: 'The Ceremony', desc: 'Please arrive by 11:30 AM sharp', location: 'Castle Lawns' },
                    cocktails: { title: 'Cocktails & Canapés', desc: 'followed by cocktails and canapés' },
                    reception: { time: '3:00 PM', title: 'The Reception', desc: 'Wedding Breakfast, speeches, dancing' },
                },
            }),
            order: 3,
        },
    })

    // Picnic Section
    await prisma.pageSection.create({
        data: {
            key: 'picnic',
            title: 'Sunday Birthday Picnic',
            subtitle: 'Sunday, July 5th • From 12:00 PM',
            content: "We'd love to invite you to join us the next day for Indi's first birthday.",
            metadata: JSON.stringify({ location: 'Walton Castle Grounds' }),
            order: 4,
        },
    })

    // FAQ Section
    await prisma.pageSection.create({
        data: {
            key: 'faq',
            title: 'Q & A',
            content: JSON.stringify([
                { q: "What is the dress code?", a: "Semi-Formal / Cocktail Attire. We want you to feel fabulous but comfortable enough to dance!" },
                { q: "Are children invited?", a: "We love your little ones, but we have decided to keep our wedding and reception an adults-only event." },
                { q: "Is there parking?", a: "Yes, there is ample free parking available at the castle." },
                { q: "What about accommodation?", a: "We recommend the Best Western Walton Park Hotel nearby. There are also many lovely Airbnbs in Clevedon." },
                { q: "Taxis?", a: "Please pre-book taxis for midnight! Local numbers: Triangle Cars (01275 880014), Aark Taxi (07944 563740)." },
            ]),
            order: 5,
        },
    })

    // RSVP Section
    await prisma.pageSection.create({
        data: {
            key: 'rsvp',
            title: 'Will You Be Joining Us?',
            subtitle: 'Kindly Respond By September 1st, 2026',
            order: 6,
        },
    })

    // Memories Section (Share Your Memories)
    await prisma.pageSection.create({
        data: {
            key: 'memories',
            title: 'Share Your Memories',
            content: 'Help us capture the story of our lives together. If you have photos of us, please upload them!',
            metadata: JSON.stringify({
                uploadLink: 'https://drive.google.com/drive/folders/10qJLtV7gTasjd9R2eV9ST0A0m5yLNmrF?usp=sharing',
                buttonText: 'Upload Photos',
            }),
            order: 7,
        },
    })

    // Guestbook Section
    await prisma.pageSection.create({
        data: {
            key: 'guestbook',
            title: 'Guestbook',
            order: 8,
        },
    })

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
