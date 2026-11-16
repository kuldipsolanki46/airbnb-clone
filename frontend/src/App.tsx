import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Guests, Listing, Photo } from './types';
import { fetchListing, fallbackListing } from './lib/api';
import { Header, StickyBar } from './components/Header';
import { HeroGallery, TitleRow } from './components/HeroGallery';
import { BookingCard } from './components/BookingCard';
import { Calendar, type DateRange } from './components/Calendar';
import { AmenitiesPreview, Description, PlaceIntro, RatingSummary, ReviewCards, Sleeping } from './components/Sections';
import { Footer, HostSection, Location, SimilarStays, ThingsToKnow } from './components/BottomSections';
import { Lightbox, Modal, PhotoTour } from './components/Overlays';
import { amenityIcon } from './components/icons';

type Overlay =
  | { kind: 'none' }
  | { kind: 'tour'; category?: string }
  | { kind: 'amenities' } | { kind: 'description' } | { kind: 'reviews' } | { kind: 'share' };

export default function App() {
  const [listing, setListing] = useState<Listing>(fallbackListing);
  const [overlay, setOverlay] = useState<Overlay>({ kind: 'none' });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState('');
  const [range, setRange] = useState<DateRange>({ start: listing.checkIn, end: listing.checkOut });
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0, infants: 0, pets: 0 });
  const [showSticky, setShowSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('photos');
  const calendarRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchListing().then(setListing); }, []);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 3200);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > 560);
      for (const id of ['location', 'reviews', 'amenities', 'photos']) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const allPhotos = listing.photos;
  const openLightbox = useCallback((p: Photo) => {
    const i = allPhotos.findIndex(x => x.id === p.id);
    setLightbox(i >= 0 ? i : 0);
  }, [allPhotos]);

  const share = useCallback(async () => {
    try { await navigator.clipboard.writeText(window.location.href); notify('Link copied'); }
    catch { setOverlay({ kind: 'share' }); }
  }, [notify]);

  const toggleSave = useCallback(() => {
    setSaved(v => { notify(v ? 'Removed from your wishlist' : 'Saved to your wishlist'); return !v; });
  }, [notify]);

  const scrollToBooking = () => bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const scrollToCalendar = () => calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const totalAmenities = useMemo(() => listing.amenities.reduce((n, g) => n + g.items.length, 0), [listing]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <StickyBar listing={listing} visible={showSticky} active={activeSection} onReserve={scrollToBooking} />
      <main id="main" className="page">
        <TitleRow title={listing.title} saved={saved} onShare={share} onSave={toggleSave} />
        <HeroGallery photos={listing.photos} title={listing.title}
          onOpen={p => setOverlay({ kind: 'tour', category: p.category })} />

        <div className="layout">
          <div className="col-main">
            <PlaceIntro listing={listing} />
            <Description listing={listing} onShowMore={() => setOverlay({ kind: 'description' })} />
            <Sleeping listing={listing} onPhoto={cat => setOverlay({ kind: 'tour', category: cat })} />
            <AmenitiesPreview listing={listing} onShowAll={() => setOverlay({ kind: 'amenities' })} />
            <div ref={calendarRef}>
              <Calendar range={range} onChange={setRange} />
            </div>
          </div>
          <div className="col-side" ref={bookingRef}>
            <BookingCard listing={listing} range={range} guests={guests} setGuests={setGuests}
              onDatesFocus={scrollToCalendar} notify={notify} />
          </div>
        </div>

        <RatingSummary listing={listing} />
        <ReviewCards listing={listing} onShowAll={() => setOverlay({ kind: 'reviews' })} />
        <Location listing={listing} />
        <HostSection listing={listing} notify={notify} />
        <ThingsToKnow notify={notify} />
        <SimilarStays listing={listing} />
      </main>
      <Footer />

      {/* Keep Photo Tour mounted under Lightbox so focus can restore to the opener. */}
      {overlay.kind === 'tour' && (
        <PhotoTour listing={listing} initialCategory={overlay.category} saved={saved}
          onClose={() => { setLightbox(null); setOverlay({ kind: 'none' }); }}
          onShare={share} onSave={toggleSave} onPhoto={openLightbox} />
      )}
      {lightbox !== null && (
        <Lightbox photos={allPhotos} index={lightbox}
          onClose={() => setLightbox(null)} onNavigate={setLightbox} />
      )}
      {overlay.kind === 'amenities' && (
        <Modal title={`What this place offers (${totalAmenities})`} wide onClose={() => setOverlay({ kind: 'none' })}>
          {listing.amenities.map(g => (
            <div className="amen-group" key={g.group}>
              <h3>{g.group}</h3>
              <ul>{g.items.map(i => <li key={i}><span className="amen-icon">{amenityIcon(i)}</span>{i}</li>)}</ul>
            </div>
          ))}
        </Modal>
      )}
      {overlay.kind === 'description' && (
        <Modal title="About this space" onClose={() => setOverlay({ kind: 'none' })}>
          {listing.fullDescription.split('\n\n').map((p, i) => <p className="modal-p" key={i}>{p}</p>)}
        </Modal>
      )}
      {overlay.kind === 'reviews' && (
        <Modal title={`★ ${listing.rating} · ${listing.reviewCount} reviews`} wide onClose={() => setOverlay({ kind: 'none' })}>
          {listing.reviews.map(r => (
            <article className="review modal-review" key={r.id}>
              <header><img src={r.avatar} alt="" /><div><strong>{r.author}</strong><span>{r.meta} · {r.date}</span></div></header>
              <p>{r.text}</p>
            </article>
          ))}
          <p className="subtle">Showing {listing.reviews.length} of {listing.reviewCount} reviews.</p>
        </Modal>
      )}
      {overlay.kind === 'share' && (
        <Modal title="Share this place" onClose={() => setOverlay({ kind: 'none' })}>
          <p className="modal-p">{listing.title}</p>
          <p className="share-url">{window.location.href}</p>
          <button type="button" className="btn-dark" onClick={share}>Copy link</button>
        </Modal>
      )}
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </>
  );
}
