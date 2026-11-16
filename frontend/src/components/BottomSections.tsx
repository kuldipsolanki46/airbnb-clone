import { useRef, useState } from 'react';
import { inr, type Listing } from '../types';
import { IconChevron, IconHeart, IconShield } from './icons';

export function Location({ listing }: { listing: Listing }) {
  const [more, setMore] = useState(false);
  return (
    <section className="block" id="location" aria-label="Where you'll be">
      <h2>Where you’ll be</h2>
      <div className="map-wrap">
        <iframe title="Map of Candolim, Goa, India"
          src="https://www.openstreetmap.org/export/embed.html?bbox=73.7350%2C15.4950%2C73.7900%2C15.5400&layer=mapnik&marker=15.5186%2C73.7620"
          loading="lazy" />
        <span className="map-pin" aria-hidden="true">⌂</span>
      </div>
      <strong className="loc-title">{listing.location}</strong>
      <p>Exact location will be provided after booking.</p>
      <strong>Neighbourhood highlights</strong>
      <p className="subtle">Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.{more && ' Candolim Beach is a short stroll away, with Fort Aguada, Reis Magos Fort and the Nerul riverfront all within a 15-minute drive. The Saturday Night Market and Mapusa’s Friday bazaar make easy evening plans.'}</p>
      <button type="button" className="show-more" onClick={() => setMore(v => !v)}>{more ? 'Show less' : 'Show more'} <IconChevron /></button>
      <hr />
    </section>
  );
}

export function HostSection({ listing, notify }: { listing: Listing; notify: (m: string) => void }) {
  const h = listing.host;
  return (
    <section className="block" id="host" aria-label="Meet your host">
      <h2>Meet your host</h2>
      <div className="host-grid">
        <div className="host-card">
          <div className="host-id">
            <img src={h.avatar} alt={`Profile photo of ${h.name}`} />
            <div><strong className="host-name">{h.name}</strong><span>Host</span></div>
          </div>
          <div className="host-stats">
            <div><strong>{h.reviews.toLocaleString('en-IN')}</strong><span>Reviews</span></div>
            <div><strong>{h.rating}★</strong><span>Rating</span></div>
            <div><strong>{h.yearsHosting}</strong><span>Years hosting</span></div>
          </div>
          <hr />
          {h.facts.map(f => <p className="host-fact" key={f}>{f}</p>)}
          <strong className="co-title">Co-Hosts</strong>
          <ul className="cohosts">
            {h.coHosts.slice(0, 3).map(c => <li key={c}><span className="avatar-fallback">{c[0]}</span>{c}</li>)}
          </ul>
          <div className="co-avatars" aria-hidden="true">
            {h.coHosts.slice(3).map(c => <span className="avatar-fallback" key={c}>{c[0]}</span>)}
          </div>
          <ul className="cohosts names-only">{h.coHosts.slice(3, 5).map(c => <li key={c}>{c}</li>)}</ul>
        </div>
        <div className="host-details">
          <strong>Host details</strong>
          {h.details.split('|').map(d => <p key={d}>{d}</p>)}
          <button type="button" className="btn-dark" onClick={() => notify(`Message sent to ${h.name} — they typically respond ${h.responseTime}`)}>Message host</button>
          <hr />
          <p className="protect"><IconShield /> To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
        </div>
      </div>
      <hr />
    </section>
  );
}

const THINGS: { title: string; lines: string[] }[] = [
  { title: 'Cancellation policy', lines: ['Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.', 'Review this host’s full policy for details.'] },
  { title: 'House rules', lines: ['Check-in after 2:00 pm', 'Checkout before 11:00 am', '3 guests maximum'] },
  { title: 'Safety & property', lines: ['Carbon monoxide alarm not reported', 'Smoke alarm not reported', 'Exterior security cameras on property'] },
];

export function ThingsToKnow({ notify }: { notify: (m: string) => void }) {
  return (
    <section className="block things" aria-label="Things to know">
      <h2>Things to know</h2>
      <div className="things-grid">
        {THINGS.map(t => (
          <div key={t.title}>
            <strong>{t.title}</strong>
            {t.lines.map(l => <p key={l}>{l}</p>)}
            <button type="button" className="show-more" onClick={() => notify(`${t.title}: full details are in the booking confirmation`)}>Learn more <IconChevron /></button>
          </div>
        ))}
      </div>
      <hr />
    </section>
  );
}

export function SimilarStays({ listing }: { listing: Listing }) {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const pages = Math.max(1, Math.ceil(listing.similar.length / 4));
  const scrollBy = (dir: number) => {
    const el = track.current; if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };
  const onScroll = () => {
    const el = track.current; if (!el) return;
    setPage(Math.min(pages, Math.max(1, Math.round(el.scrollLeft / el.clientWidth) + 1)));
  };
  return (
    <section className="block similar" aria-label="More stays nearby">
      <div className="similar-head">
        <h2>More stays nearby</h2>
        <div className="pager">
          <span>{page} / {pages}</span>
          <button type="button" aria-label="Previous stays" onClick={() => scrollBy(-1)} disabled={page <= 1}><IconChevron dir="left" /></button>
          <button type="button" aria-label="Next stays" onClick={() => scrollBy(1)} disabled={page >= pages}><IconChevron /></button>
        </div>
      </div>
      <div className="similar-track" ref={track} onScroll={onScroll}>
        {listing.similar.map(s => (
          <article className="stay-card" key={s.id}>
            <div className="stay-img">
              <img src={s.image} alt={s.title} loading="lazy" />
              <button type="button" className="stay-heart" aria-label={`Save ${s.title}`} aria-pressed={!!saved[s.id]}
                onClick={() => setSaved(v => ({ ...v, [s.id]: !v[s.id] }))}><IconHeart filled={saved[s.id]} /></button>
            </div>
            <strong>{s.title}</strong>
            <p><b>{inr(s.priceInr)}</b> &nbsp; ★ {s.rating.toFixed(2).replace(/0$/, '')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>© 2026 Airbnb-clone — take-home demo. Not affiliated with Airbnb, Inc.</span>
        <nav aria-label="Footer">
          <a href="#photos">Privacy</a><span>·</span><a href="#photos">Terms</a><span>·</span><a href="#location">Sitemap</a>
        </nav>
        <span className="footer-lang">🌐 English (IN) · ₹ INR</span>
      </div>
    </footer>
  );
}
