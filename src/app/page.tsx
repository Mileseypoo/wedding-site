"use client";
import Link from "next/link";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";

export default function Home() {
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
            src="/samandbecny.jpg"
            alt="Sam and Bec"
            className="hero-img"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Becca & Sameep
          </h1>
          <p className="hero-subtitle-main">are getting married!</p>
          <div className="hero-date">
            <span>July 4th 2026</span>
            <span className="dot-separator"></span>
            <span>Walton Castle, Clevedon</span>
          </div>
        </div>
      </header>

      {/* Our Story */}
      <section id="story" className="section story-section">
        {/* Background Flower Watermark */}
        <div className="story-bg-floral">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/il_1588xN.6319250896_pu5c.webp" alt="" />
        </div>

        <div className="container text-center relative-z">
          <div className="floral-divider">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/il_1588xN.6367308285_hs72.webp" alt="Floral Element" />
          </div>

          <h2 className="section-title">Welcome to our wedding website!</h2>
          <p className="section-text">
            We can't wait to celebrate our special day with you. We've created this website as a convenient and interactive way to share all the important details with you in the lead up to our wedding.
          </p>
          <div className="text-center mt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/niagra.png" alt="Becca and Sameep at Niagara" style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section id="venue" className="section venue-section">
        <div className="container">
          <div className="text-center mb-12">
            <div className="floral-divider">
              {/* Large Floral for Venue */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/il_1588xN.6319250904_7c06.webp" alt="Floral Element" style={{ height: '20vh', maxHeight: '200px', width: 'auto', margin: '0 auto 20px', display: 'block' }} />
            </div>
            <h2 className="section-title">The Venue</h2>
          </div>

          <div className="venue-container">
            <div className="venue-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/walton_castle.jpg" alt="Walton Castle" />
            </div>
            <div className="venue-details text-center md:text-left">
              <h3 className="venue-name">Walton Castle</h3>
              <p className="venue-location">Clevedon, North Somerset</p>
              <p className="section-text">
                A stunning 17th-century hill-top castle with panoramic views spanning five counties.
                We have exclusive use of the entire estate for a celebration to remember.
              </p>
              <a href="https://www.waltoncastle.com/properties/walton-castle" target="_blank" className="btn btn-outline">
                Explore the Castle
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
              {/* large floral for Weekend */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/il_1588xN.6367308167_m45h.webp" alt="Divider" style={{ height: 'auto', width: '100%', maxWidth: '500px', margin: '0 auto 20px', display: 'block' }} />
            </div>
            <h2 className="section-title">The Weekend</h2>
          </div>

          <div className="schedule-grid">
            {/* Ceremony Card */}
            <div className="schedule-card">
              <h3 className="card-title">The Ceremony</h3>
              <p className="card-date">Saturday, July 4th • 12:00 PM</p>
              <p className="card-desc">
                Join us on the Castle Lawns for our wedding ceremony.
                Please arrive by 11:30 AM for welcome drinks.
              </p>
            </div>

            {/* Reception Card */}
            <div className="schedule-card">
              <h3 className="card-title">The Reception</h3>
              <p className="card-date">Saturday, July 4th • 4:00 PM</p>
              <p className="card-desc">
                Dinner, dancing, and festivities in The Great Hall and castle grounds.
                Carriages at midnight.
              </p>
            </div>
          </div>

          {/* Sunday Picnic */}
          <div className="picnic-card">
            <h3 className="card-title text-primary">Sunday Birthday Picnic</h3>
            <p className="card-date">Sunday, July 5th • From 12:00 PM</p>
            <p className="picnic-location">Walton Castle Grounds</p>
            <p className="card-desc">
              Recover with us! We'll provide a delicious picnic lunch.
              Feel free to bring a bottle if you fancy a hair of the dog.
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
              <img src="/il_1588xN.6319250896_pu5c.webp" alt="Floral Element" style={{ height: '90px', opacity: 0.9 }} />
            </div>
            <h2 className="section-title">Q & A</h2>
          </div>

          <div className="faq-grid">
            {[
              {
                q: "What is the dress code?",
                a: "Semi-Formal / Cocktail Attire. We want you to feel fabulous but comfortable enough to dance!"
              },
              {
                q: "Are children invited?",
                a: "We love your little ones, but we have decided to keep our wedding and reception an adults-only event."
              },
              {
                q: "Is there parking?",
                a: "Yes, there is ample free parking available at the castle."
              },
              {
                q: "What about accommodation?",
                a: "We recommend the Best Western Walton Park Hotel nearby. There are also many lovely Airbnbs in Clevedon."
              },
              {
                q: "Taxis?",
                a: "Please pre-book taxis for midnight! Local numbers: Triangle Cars (01275 880014), Aark Taxi (07944 563740)."
              }
            ].map((item, i) => (
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
          <h2 className="section-title">Will You Be Joining Us?</h2>
          <p className="rsvp-subtitle">Kindly Respond By September 1st, 2026</p>
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
          <h2 className="section-title">Share Your Memories</h2>
          <p className="section-text">
            Help us capture the story of our lives together. If you have photos of us, please upload them!
          </p>
          <a
            href="https://drive.google.com/drive/folders/10qJLtV7gTasjd9R2eV9ST0A0m5yLNmrF?usp=sharing"
            target="_blank"
            className="btn"
          >
            Upload Photos
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
          <h2 className="section-title">Guestbook</h2>
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
