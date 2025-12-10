import { Calendar, Home, ShieldCheck } from 'lucide-react';

const highlights = [
  {
    title: 'Modern spaces',
    body: 'Curated apartments and homes with light, space, and great locations.',
    icon: Home,
  },
  {
    title: 'Flexible stays',
    body: 'Month-to-month options with transparent pricing and no surprises.',
    icon: Calendar,
  },
  {
    title: 'Safe & verified',
    body: 'Every listing is identity-verified and inspected before it goes live.',
    icon: ShieldCheck,
  },
];

const listings = [
  {
    city: 'Austin, TX',
    name: 'South Congress Loft',
    price: '$2,150/mo',
    badge: 'Pet friendly',
  },
  {
    city: 'Seattle, WA',
    name: 'Lake Union View',
    price: '$2,480/mo',
    badge: 'Waterfront',
  },
  {
    city: 'Denver, CO',
    name: 'Cap Hill Brownstone',
    price: '$2,050/mo',
    badge: 'Walkable',
  },
];

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Rent better</p>
        <h1>Find a home that fits the way you actually live.</h1>
        <p className="lede">
          Explore verified rentals with transparent pricing, flexible terms, and concierge support when you move in.
        </p>
        <div className="cta-row">
          <button className="btn primary">Start browsing</button>
          <button className="btn ghost">Talk to an agent</button>
        </div>
        <div className="stat-row">
          <div>
            <span className="stat-number">2.8K</span>
            <span className="stat-label">Homes available</span>
          </div>
          <div>
            <span className="stat-number">48</span>
            <span className="stat-label">Cities covered</span>
          </div>
          <div>
            <span className="stat-number">24/7</span>
            <span className="stat-label">Move-in support</span>
          </div>
        </div>
      </header>

      <section className="panel highlights">
        {highlights.map(({ title, body, icon: Icon }) => (
          <div key={title} className="card">
            <div className="icon-circle">
              <Icon size={20} />
            </div>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Featured listings</h2>
          <a className="link" href="#">See all</a>
        </div>
        <div className="grid">
          {listings.map((item) => (
            <article key={item.name} className="listing">
              <div className="listing-top">
                <span className="badge">{item.badge}</span>
                <span className="city">{item.city}</span>
              </div>
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
