import { AirbnbLogo, IconGlobe, IconMenu, IconSearch } from './icons';
import { inr, type Listing } from '../types';

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#" aria-label="Airbnb homepage"><AirbnbLogo /></a>
        <div className="search-pill" role="search" aria-label="Search">
          <button type="button" className="pill-seg">
            <img src="/images/ui/searchbar-house.png" alt="" aria-hidden="true" />
            Anywhere
          </button>
          <span className="pill-div" />
          <button type="button" className="pill-seg">Anytime</button>
          <span className="pill-div" />
          <button type="button" className="pill-seg muted">Add guests</button>
          <button type="button" className="pill-search" aria-label="Search"><IconSearch /></button>
        </div>
        <nav className="header-nav" aria-label="Main">
          <a href="#host" className="host-link">Become a host</a>
          <button type="button" className="icon-btn" aria-label="Choose a language and currency"><IconGlobe /></button>
          <button type="button" className="icon-btn" aria-label="Main navigation menu"><IconMenu /></button>
        </nav>
      </div>
    </header>
  );
}

const SECTIONS = [
  { id: 'photos', label: 'Photos' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'location', label: 'Location' },
] as const;

export function StickyBar({ listing, visible, active, onReserve }: {
  listing: Listing; visible: boolean; active: string; onReserve: () => void;
}) {
  return (
    <div className={`sticky-bar ${visible ? 'show' : ''}`} aria-hidden={!visible}>
      <div className="sticky-inner">
        <nav aria-label="Listing sections">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''} tabIndex={visible ? 0 : -1}>{s.label}</a>
          ))}
        </nav>
        <div className="sticky-book">
          <div>
            <div><strong>{inr(listing.total5NightsInr)}</strong> <span>for 5 nights</span></div>
            <div className="sticky-rating">★ {listing.rating} · <span>{listing.reviewCount} reviews</span></div>
          </div>
          <button type="button" className="btn-reserve small" onClick={onReserve} tabIndex={visible ? 0 : -1}>Reserve</button>
        </div>
      </div>
    </div>
  );
}
