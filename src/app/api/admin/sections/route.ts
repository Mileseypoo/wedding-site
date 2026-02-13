import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultSections = [
    {
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
    {
        key: 'welcome',
        title: 'Welcome to our wedding website!',
        content: "We can't wait to celebrate our special day with you. We've created this website as a convenient and interactive way to share all the important details with you in the lead up to our wedding.",
        imageUrl: '/niagra.png',
        order: 1,
    },
    {
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
    {
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
    {
        key: 'picnic',
        title: 'Sunday Birthday Picnic',
        subtitle: 'Sunday, July 5th • From 12:00 PM',
        content: "We'd love to invite you to join us the next day for Indi's first birthday.",
        metadata: JSON.stringify({ location: 'Walton Castle Grounds' }),
        order: 4,
    },
    {
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
    {
        key: 'rsvp',
        title: 'Will You Be Joining Us?',
        subtitle: 'Kindly Respond By September 1st, 2026',
        order: 6,
    },
    {
        key: 'memories',
        title: 'Share Your Memories',
        content: 'Help us capture the story of our lives together. If you have photos of us, please upload them!',
        metadata: JSON.stringify({
            uploadLink: 'https://drive.google.com/drive/folders/10qJLtV7gTasjd9R2eV9ST0A0m5yLNmrF?usp=sharing',
            buttonText: 'Upload Photos',
        }),
        order: 7,
    },
    {
        key: 'guestbook',
        title: 'Guestbook',
        order: 8,
    },
];

export async function GET() {
    try {
        let sections = await prisma.pageSection.findMany({
            orderBy: { order: 'asc' },
        });

        // If no sections exist, seed them
        if (sections.length === 0) {
            console.log('No sections found, seeding default sections...');
            await prisma.pageSection.createMany({
                data: defaultSections,
            });
            sections = await prisma.pageSection.findMany({
                orderBy: { order: 'asc' },
            });
        }

        return NextResponse.json(sections);
    } catch (error) {
        console.error('Error fetching sections:', error);
        return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
    }
}
