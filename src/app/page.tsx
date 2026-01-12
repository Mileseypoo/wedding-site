import Link from "next/link";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";

// ... (existing code)



export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      {/* Navigation */}
      <nav style={{ padding: '15px 0', backgroundColor: 'var(--primary-teal)', color: 'white', borderBottom: 'none' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          {/* Logo Section */}


          {/* Links Section */}
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 500
          }}>
            <Link href="#welcome" className="hover:opacity-80 transition-opacity" style={{ borderBottom: '1px solid white' }}>Welcome!</Link>
            <Link href="#story" className="hover:opacity-80 transition-opacity">Our Story</Link>
            <Link href="#venue" className="hover:opacity-80 transition-opacity">The Venue</Link>
            <Link href="#faq" className="hover:opacity-80 transition-opacity">Q & A</Link>
            <Link href="#rsvp" className="hover:opacity-80 transition-opacity">RSVP</Link>
            <Link href="#guestbook" className="hover:opacity-80 transition-opacity">Guestbook</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{
        position: 'relative',
        height: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        color: 'white'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/samandbecny.jpg"
            alt="Sam and Bec in NY"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%' // Adjusted to show faces
            }}
          />
        </div>

        {/* Standard Gradient Overlay for Readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))'
        }}></div>

        <div style={{ zIndex: 3, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Big Bold Names */}
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '10px',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
            lineHeight: 1.1
          }}>
            BECCA & SAMEEP
          </h1>



        </div>
      </header>

      {/* Intro / Story Snippet */}
      <section id="story" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--primary-teal-dark)' }}>We're Getting Married!</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>4th July, 2026</p>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: '#666' }}>
            1 pm, Walton Castle, Castle Road, Clevedon, BS21 7AA, England
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center', color: 'var(--primary-teal)' }}>Common Questions</h2>

          <div style={{ display: 'grid', gap: '30px' }}>
            {[
              { q: "What is the dress code?", a: "Semi-Formal: Tuxes and gowns are welcome, and so are suits and cocktail dresses." },
              { q: "Can I bring a date?", a: "Due to limited space, we are only able to accommodate those guests formally invited on your wedding invitation." },
              { q: "Are children invited?", a: "We love your little ones! However, we have decided to keep our wedding and reception an adults-only event." },
              { q: "Is there parking available?", a: "Yes! The venue has ample free parking available for all guests." },
              { q: "Will the ceremony be indoors or outdoors?", a: "Weather permitting, the ceremony will be outdoors in the garden. Reception to follow indoors." },
              { q: "What time should I arrive?", a: "Please aim to arrive 30 minutes before the ceremony start time to settle in." },
              { q: "Do you have a registry?", a: "Your presence is enough! But if you wish to give a gift, we will have a wishing well at the reception." },
              { q: "Can I take photos?", a: "We invite you to be fully present with us during our 'unplugged' ceremony. Feel free to take photos at the reception!" },
              { q: "Will there be transportation?", a: "A shuttle will run from the main hotel block to the venue starting at 3:00 PM." },
              { q: "I have a dietary restriction, what should I do?", a: "Please let us know in the RSVP form below! We want everyone to eat well." },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#333' }}>{item.q}</h4>
                <p style={{ color: '#666', margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Teaser with visual blocks */}
      <section id="venue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', paddingBottom: '0' }}>

        {/* Venue Image Banner */}
        <div style={{ width: '100%', maxWidth: '900px', height: '300px', overflow: 'hidden', marginTop: '60px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/walton_castle.jpg"
            alt="Walton Castle"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        <div style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--primary-teal-dark)' }}>The Venue</h2>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', fontWeight: 'normal' }}>Walton Castle</h3>
          <p style={{ fontSize: '1.1rem', color: '#666', fontStyle: 'italic', marginBottom: '30px' }}>Clevedon, North Somerset</p>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '40px' }}>
            We are thrilled to welcome you to our very own 17th-century hill-top castle!
            With panoramic views spanning five counties, an indoor heated pool (under the castle!),
            and exclusive run of the 8-bedroom estate, we are set for an unforgettable celebration.
          </p>
          <a href="https://www.waltoncastle.com/properties/walton-castle" target="_blank" className="btn btn-outline" style={{ display: 'inline-block' }}>
            Explore the Castle
          </a>
        </div>

        <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', backgroundColor: 'var(--primary-teal)', color: 'white', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>The Ceremony</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>2:00 PM</p>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px', fontStyle: 'italic' }}>The Castle Lawns</p>
            <p>
              Join us for an outdoor ceremony overlooking the rolling countryside.
              Please arrive by 1:30 PM for a glass of bubbly before we begin.
            </p>
          </div>
          <div style={{ flex: '1 1 400px', backgroundColor: '#E8E4D9', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--foreground)' }}>The Reception</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--foreground)' }}>4:00 PM</p>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px', fontStyle: 'italic', color: 'var(--foreground)' }}> The Great Hall & Turrets</p>
            <p style={{ color: 'var(--foreground)' }}>
              Dinner, drinks, and festivities will flow throughout the castle grounds.
              Don't forget to check out the 'Entertainment Turret' for a game of pool!
            </p>
          </div>
        </div>

        {/* Directions */}
        <div style={{ width: '100%', maxWidth: '800px', padding: '60px 20px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary-teal-dark)', textAlign: 'center' }}>How to Get Here</h3>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>From M5 (Junction 20)</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', lineHeight: '1.6' }}>
              <li>Exit the M5 at Junction 20 for Clevedon.</li>
              <li>At the first roundabout, follow signs for B3133 (Clevedon).</li>
              <li>At the next roundabout (Tesco), take the 1st exit onto Northern Way.</li>
              <li>Follow Northern Way to the end, then turn right onto Walton Road (B3124).</li>
              <li>Turn left shortly after into Holly Lane, then follow the winding road up onto Castle Hill.</li>
              <li>The castle entrance is at the very end of the private road.</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>From M4</h4>
            <p style={{ color: '#555', lineHeight: '1.6' }}>
              At the Almondsbury Interchange (M4 J20 / M5 J15), merge onto the <strong>M5 Southbound</strong> (towards South West/Bristol).
              Continue to Junction 20 and follow the directions above.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP CTA */}
      {/* RSVP CTA */}
      <section id="rsvp" style={{ padding: '100px 0', textAlign: 'center', backgroundColor: '#fff' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Will You Be With Us?</h2>
          <p style={{ marginBottom: '40px' }}>Please let us know your plans by September 1st, 2026</p>

          <RSVPForm />

        </div>
      </section>

      {/* Guestbook Section */}
      <section id="guestbook" style={{ padding: '80px 0', backgroundColor: '#E8E4D9' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center', color: 'var(--primary-teal-dark)' }}>Guestbook</h2>
          <Guestbook />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 0', textAlign: 'center', fontSize: '0.8rem', color: '#999', borderTop: '1px solid #eee' }}>
        <p>&copy; 2026 Sam & Bec. All rights reserved.</p>
      </footer>
    </div>
  );
}
