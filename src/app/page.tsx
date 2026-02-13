import { PrismaClient } from '@prisma/client';
import Link from "next/link";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";

const prisma = new PrismaClient();

// Force dynamic rendering to show CMS changes immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getSections() {
  try {
    return await prisma.pageSection.findMany();
  } catch (e) {
    console.error('Failed to fetch sections:', e);
    return [];
  }
}

export default async function Home() {
  const sections = await getSections();

  const getSec = (key: string) => sections.find((s) => s.key === key);
  const parseMeta = (sec: any) => (sec?.metadata ? JSON.parse(sec.metadata) : {});
  const parseContent = (sec: any) => {
    try {
      return sec?.content ? JSON.parse(sec.content) : null;
    } catch {
      return sec?.content; // Return string if not JSON
    }
  };

  // Hero
  const hero = getSec('hero');
  const heroMeta = parseMeta(hero);

  // Welcome
  const welcome = getSec('welcome');

  // Venue
  const venue = getSec('venue');
  const venueMeta = parseMeta(venue);

  // Timings
  const timings = getSec('timings');
  const timingsData = parseContent(timings); // Object with ceremony, reception etc.

  // Picnic
  const picnic = getSec('picnic');
  const picnicMeta = parseMeta(picnic);

  // FAQ
  const faq = getSec('faq');
  const faqList = Array.isArray(parseContent(faq)) ? parseContent(faq) : [];

  // RSVP
  const rsvp = getSec('rsvp');

  // Memories
  const memories = getSec('memories');
  const memoriesMeta = parseMeta(memories);

  // Guestbook
  const guestbook = getSec('guestbook');

  return (
    <div className="main-wrapper">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="nav-links">
            <Link href="#welcome" className="nav-link">Welcome</Link>
            <Link href="#story" className="nav-link">Our Story</Link>
            <Link href="#venue" className="nav-link">The Venue</Link>
            <Link href="#schedule" className="nav-link">Schedule</Link>
            <Link href="#faq" className="nav-link">Q & A</Link>
            <Link href="#rsvp" className="nav-link">RSVP</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="welcome" className="hero-section">
        {/* Background Image */}
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroMeta.mainImageUrl || "/samandbecny.jpg"}
            alt="Hero Background"
            className="hero-img"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            {hero?.title || "Becca & Sameep"}
          </h1>
          <p className="hero-subtitle-main">{hero?.subtitle || "are getting married!"}</p>
          <div className="hero-date">
            <span>{heroMeta.date || "July 4th 2026"}</span>
            <span className="dot-separator"></span>
            <span>{heroMeta.location || "Walton Castle, Clevedon"}</span>
          </div>
        </div>
      </header>

      {/* Our Story / Welcome */}
      <section id="story" className="section story-section">
        <div className="story-bg-floral">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/il_1588xN.6319250896_pu5c.webp" alt="" />
        </div>

        <div className="container text-center relative-z">
          <div className="floral-divider">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/il_1588xN.6367308285_hs72.webp" alt="Floral Element" />
          </div>

          <h2 className="section-title">{welcome?.title || "Welcome to our wedding website!"}</h2>
          <p className="section-text">
            {welcome?.content || "We can't wait to celebrate our special day with you."}
          </p>
          <div className="text-center mt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={welcome?.imageUrl || "/niagra.png"} alt="Welcome" style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section id="venue" className="section venue-section">
        <div className="container">
          <div className="text-center mb-12">
            <div className="floral-divider">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/il_1588xN.6319250904_7c06.webp" alt="Floral Element" style={{ height: '20vh', maxHeight: '200px', width: 'auto', margin: '0 auto 20px', display: 'block' }} />
            </div>
            <h2 className="section-title">{venue?.title || "The Venue"}</h2>
          </div>

          <div className="venue-container">
            <div className="venue-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={venue?.imageUrl || "/walton_castle.jpg"} alt={venue?.subtitle || "Walton Castle"} />
            </div>
            <div className="venue-details text-center md:text-left">
              <h3 className="venue-name">{venue?.subtitle || "Walton Castle"}</h3>
              <p className="venue-location">{venueMeta.address || "Clevedon, North Somerset"}</p>
              <p className="section-text">
                {venue?.content || "A stunning castle..."}
              </p>
              <a href={venueMeta.buttonLink || "#"} className="btn btn-outline">
                {venueMeta.buttonText || "Explore the Castle"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="section schedule-section">
        <div className="container">
          <div className="text-center mb-12">
            <div className="floral-divider">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/il_1588xN.6367308167_m45h.webp" alt="Divider" style={{ height: 'auto', width: '100%', maxWidth: '500px', margin: '0 auto 20px', display: 'block' }} />
            </div>
            <h2 className="section-title">{timings?.title || "Wedding Timings"}</h2>
          </div>

          {/* Wedding Timings Card */}
          <div className="picnic-card mb-12">
            <h3 className="card-title text-primary">{timingsData?.mainCard?.title || "Saturday, July 4th"}</h3>
            <div className="space-y-6 mt-6">
              <div>
                <p className="card-desc mb-2 italic">{timingsData?.mainCard?.ceremony?.desc?.split('\n')[0] || "Please arrive by 11:30 AM sharp"}</p>
                <p className="card-date text-[var(--foreground)] mb-2" style={{ fontSize: '1.125rem', fontWeight: 'normal' }}>{timingsData?.mainCard?.ceremony?.time || "12:00 PM"} • {timingsData?.mainCard?.ceremony?.title || "The Ceremony"}</p>
                <p className="card-desc">{timingsData?.mainCard?.cocktails?.desc || "followed by cocktails and canapés"}</p>
              </div>

              <div className="w-12 h-[1px] bg-[var(--secondary)] mx-auto opacity-30"></div>

              <div>
                <p className="card-date text-[var(--foreground)] mb-2" style={{ fontSize: '1.125rem', fontWeight: 'normal' }}>{timingsData?.mainCard?.reception?.time || "3:00 PM"} • {timingsData?.mainCard?.reception?.title || "The Reception"}</p>
                <p className="card-desc">{timingsData?.mainCard?.reception?.desc || "Wedding Breakfast, speeches, dancing"}</p>
              </div>
            </div>
          </div>

          {/* Sunday Picnic */}
          <div className="picnic-card">
            <h3 className="card-title text-primary">{picnic?.title || "Sunday Birthday Picnic"}</h3>
            <p className="card-date text-[var(--foreground)] mb-2" style={{ fontSize: '1.25rem' }}>{picnic?.subtitle || "Sunday, July 5th • From 12:00 PM"}</p>
            <p className="picnic-location">{picnicMeta.location || "Walton Castle Grounds"}</p>
            <p className="card-desc">
              {picnic?.content || "We'd love to invite you to join us..."}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section faq-section">
        <div className="container faq-container">
          <div className="text-center mb-12">
            <div className="floral-divider">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/il_1588xN.6319250896_pu5c.webp" alt="Floral Element" style={{ height: 'auto', width: '100%', maxWidth: '500px', margin: '0 auto 20px', display: 'block', opacity: 0.9 }} />
            </div>
            <h2 className="section-title">{faq?.title || "Q & A"}</h2>
          </div>

          <div className="faq-grid">
            {faqList.map((item: any, i: number) => (
              <div key={i} className="faq-item">
                <h4 className="faq-question">{item.q}</h4>
                <p className="faq-answer">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="section rsvp-section">
        <div className="container text-center">
          <div className="section-separator">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/il_1588xN.6367308167_m45h.webp" alt="Divider" style={{ height: '60px', opacity: 0.8, display: 'block', margin: '0 auto' }} />
          </div>
          <h2 className="section-title">{rsvp?.title || "Will You Be Joining Us?"}</h2>
          <p className="rsvp-subtitle">{rsvp?.subtitle || "Kindly Respond By September 1st, 2026"}</p>
          <RSVPForm />
        </div>
      </section>

      {/* Share Memories Section */}
      <section id="memories" className="section memories-section">
        <div className="container text-center max-w-2xl">
          <div className="floral-divider">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/il_1588xN.6367308285_hs72.webp" alt="Floral Element" />
          </div>
          <h2 className="section-title">{memories?.title || "Share Your Memories"}</h2>
          <p className="section-text">
            {memories?.content || "Help us capture the story..."}
          </p>
          <a
            href={memoriesMeta.uploadLink || "#"}
            target="_blank"
            className="btn"
          >
            {memoriesMeta.buttonText || "Upload Photos"}
          </a>
        </div>
      </section>

      {/* Guestbook Section */}
      <section id="guestbook" className="section guestbook-section">
        <div className="container text-center">
          <div className="section-separator">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/il_1588xN.6367308167_m45h.webp" alt="Divider" style={{ height: '60px', opacity: 0.8, display: 'block', margin: '0 auto' }} />
          </div>
          <h2 className="section-title">{guestbook?.title || "Guestbook"}</h2>
          <Guestbook />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 BECCA & SAMEEP</p>
      </footer>
    </div>
  );
}
