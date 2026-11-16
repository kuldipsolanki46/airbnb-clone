import { useState } from 'react';
import type { Listing } from '../types';
import { amenityIcon, IconChevron, IconDoor, IconFan, IconPool, Laurel } from './icons';

const HIGHLIGHT_ICONS = [<IconPool key="p" />, <IconFan key="f" />, <IconDoor key="d" />];

function LaurelImg({ flip }: { flip?: boolean }) {
  return (
    <img
      className={`laurel-img ${flip ? 'flip' : ''}`}
      src={flip ? '/images/ui/laurel-right.png' : '/images/ui/laurel-left.png'}
      alt=""
      aria-hidden="true"
      width={36}
      height={48}
    />
  );
}

export function PlaceIntro({ listing }: { listing: Listing }) {
  return (
    <>
      <div className="place-intro">
        <h2>{listing.placeType}</h2>
        <p>{listing.guests} guests · {listing.bedrooms} bedroom · {listing.beds} bed · {listing.bathrooms} bathroom</p>
      </div>
      <div className="fav-banner">
        <div className="fav-badge"><LaurelImg /><span>Guest<br />favourite</span><LaurelImg flip /></div>
        <p className="fav-text">One of the most loved homes on Airbnb, according to guests</p>
        <div className="fav-stats">
          <div className="fav-stat"><strong>{listing.rating}</strong><span className="stars" aria-label={`${listing.rating} out of 5 stars`}>★★★★★</span></div>
          <span className="fav-div" />
          <div className="fav-stat"><strong>{listing.reviewCount}</strong><span>Reviews</span></div>
        </div>
      </div>
      <div className="host-mini">
        <img src={listing.host.avatar} alt="" />
        <div><strong>Hosted by {listing.host.name}</strong><span>{listing.host.yearsHosting} years hosting</span></div>
      </div>
      <hr />
      <ul className="highlights">
        {listing.highlights.map((h, i) => {
          const [t, d] = h.split('|');
          return <li key={t}><span className="hl-icon">{HIGHLIGHT_ICONS[i % 3]}</span><div><strong>{t}</strong><span>{d}</span></div></li>;
        })}
      </ul>
      <hr />
    </>
  );
}

export function Description({ listing, onShowMore }: { listing: Listing; onShowMore: () => void }) {
  return (
    <section className="block desc" aria-label="About this place">
      <div className="translate-note">Some info has been automatically translated. <button type="button" className="link-btn inline">Show original</button></div>
      <p className="desc-text">🌴 {listing.description}</p>
      <button type="button" className="show-more" onClick={onShowMore}>Show more <IconChevron /></button>
      <hr />
    </section>
  );
}

export function Sleeping({ listing, onPhoto }: { listing: Listing; onPhoto: (cat: string) => void }) {
  const rooms = [
    { name: 'Bedroom', detail: '1 double bed', cat: 'Bedroom' },
    { name: 'Living room', detail: '1 sofa', cat: 'Living room 1' },
  ];
  return (
    <section className="block" aria-label="Where you'll sleep">
      <h2>Where you'll sleep</h2>
      <div className="sleep-grid">
        {rooms.map(r => {
          const photo = listing.photoTour.find(g => g.category === r.cat)?.photos[0];
          return (
            <div key={r.name} className="sleep-card">
              <button type="button" onClick={() => onPhoto(r.cat)} aria-label={`View ${r.name} photos`}>
                {photo && <img src={photo.src} alt={photo.alt} loading="lazy" />}
              </button>
              <strong>{r.name}</strong><span>{r.detail}</span>
            </div>
          );
        })}
      </div>
      <hr />
    </section>
  );
}

export function AmenitiesPreview({ listing, onShowAll }: { listing: Listing; onShowAll: () => void }) {
  return (
    <section className="block" id="amenities" aria-label="What this place offers">
      <h2>What this place offers</h2>
      <ul className="amen-grid">
        {listing.amenitiesPreview.map(a => (
          <li key={a} className={a.includes('alarm') ? 'unavailable' : ''}>
            <span className="amen-icon">{amenityIcon(a)}</span>{a}
          </li>
        ))}
      </ul>
      <button type="button" className="btn-outline" onClick={onShowAll}>
        Show all {listing.amenities.reduce((n, g) => n + g.items.length, 0)} amenities
      </button>
      <hr />
    </section>
  );
}

export function RatingSummary({ listing }: { listing: Listing }) {
  const [showHow, setShowHow] = useState(false);
  const bars = [[5, 94], [4, 6], [3, 0], [2, 0], [1, 0]];
  return (
    <section className="block reviews-head" id="reviews" aria-label="Reviews summary">
      <div className="big-rating"><Laurel /><span>{listing.rating}</span><Laurel flip /></div>
      <h2 className="gf-title">Guest favourite</h2>
      <p className="subtle center">This home is a guest favourite based on ratings, reviews and<br />reliability</p>
      <button type="button" className="link-btn" onClick={() => setShowHow(v => !v)} aria-expanded={showHow}>How reviews work</button>
      {showHow && <p className="how" role="status">Reviews come from guests who stayed here. Airbnb verifies stays, and ratings reflect cleanliness, accuracy, check-in, communication, location and value.</p>}
      <div className="rating-grid">
        <div className="rg overall">
          <strong>Overall rating</strong>
          {bars.map(([star, pct]) => (
            <div className="bar-row" key={star}><span>{star}</span><span className="bar"><span style={{ width: `${pct}%` }} /></span></div>
          ))}
        </div>
        {listing.ratingCategories.map(c => (
          <div className="rg" key={c.label}><strong>{c.label}</strong><span className="rg-score">{c.score.toFixed(1)}</span><span className="rg-icon">{amenityIcon(c.label)}</span></div>
        ))}
      </div>
    </section>
  );
}

const CHIPS: [string, number][] = [['Comfort', 6], ['Accuracy', 5], ['Hot tub', 5], ['Condition', 4], ['Hospitality', 8], ['Cleanliness', 4], ['Amenities', 2], ['Decor', 2], ['Indoor spaces', 2], ['Location', 2]];

export function ReviewCards({ listing, onShowAll }: { listing: Listing; onShowAll: () => void }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  return (
    <section className="block" aria-label="Guest reviews">
      <div className="chips" role="list" aria-label="What guests mentioned">
        {CHIPS.map(([label, n]) => <span className="chip" role="listitem" key={label}>{amenityIcon(label)} {label} <b>{n}</b></span>)}
      </div>
      <div className="review-grid">
        {listing.reviews.map(r => (
          <article className="review" key={r.id}>
            <header>
              {r.avatar ? <img src={r.avatar} alt="" loading="lazy" /> : <span className="avatar-fallback">{r.author[0]}</span>}
              <div><strong>{r.author}</strong><span>{r.meta}</span></div>
            </header>
            <div className="review-meta"><span className="mini-stars">★★★★★</span> · {r.date}</div>
            <p>{expanded[r.id] || !r.truncated ? r.text : r.text.slice(0, 220) + '…'}</p>
            {r.truncated && (
              <button type="button" className="show-more small" onClick={() => setExpanded(e => ({ ...e, [r.id]: !e[r.id] }))}>
                {expanded[r.id] ? 'Show less' : 'Show more'} <IconChevron />
              </button>
            )}
          </article>
        ))}
      </div>
      <button type="button" className="btn-outline" onClick={onShowAll}>Show all {listing.reviewCount} reviews</button>
      <hr />
    </section>
  );
}
