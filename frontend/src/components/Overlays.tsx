import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Listing, Photo } from '../types';
import { useEscape, useFocusTrap, useScrollLock } from '../lib/hooks';
import { IconBack, IconChevron, IconClose, IconHeart, IconShare } from './icons';

/* ---------------- Generic modal ---------------- */
export function Modal({ title, onClose, children, wide }: {
  title: string; onClose: () => void; children: ReactNode; wide?: boolean;
}) {
  useScrollLock(true);
  useEscape(true, onClose);
  const ref = useFocusTrap<HTMLDivElement>(true);
  return (
    <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`modal ${wide ? 'wide' : ''}`} role="dialog" aria-modal="true" aria-label={title} ref={ref} tabIndex={-1}>
        <header className="modal-head">
          <button type="button" className="round-btn" onClick={onClose} aria-label="Close"><IconClose /></button>
          <strong>{title}</strong><span />
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

/* ---------------- Photo Tour ---------------- */
export function PhotoTour({ listing, initialCategory, saved, onClose, onShare, onSave, onPhoto }: {
  listing: Listing; initialCategory?: string; saved: boolean;
  onClose: () => void; onShare: () => void; onSave: () => void; onPhoto: (p: Photo) => void;
}) {
  useScrollLock(true);
  useEscape(true, onClose);
  const ref = useFocusTrap<HTMLDivElement>(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialCategory ?? listing.photoTour[0].category);

  useEffect(() => {
    if (!initialCategory) return;
    document.getElementById(`tour-${slug(initialCategory)}`)?.scrollIntoView();
  }, [initialCategory]);

  const jump = (cat: string) => {
    setActive(cat);
    const el = document.getElementById(`tour-${slug(cat)}`);
    const scroller = scrollRef.current;
    if (el && scroller) scroller.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' });
  };

  const onScroll = () => {
    const scroller = scrollRef.current; if (!scroller) return;
    let current = listing.photoTour[0].category;
    for (const g of listing.photoTour) {
      const el = document.getElementById(`tour-${slug(g.category)}`);
      if (el && el.offsetTop <= scroller.scrollTop + 180) current = g.category;
    }
    setActive(current);
  };

  return (
    <div className="tour" role="dialog" aria-modal="true" aria-label="Photo tour" ref={ref} tabIndex={-1}>
      <header className="tour-bar">
        <button type="button" className="round-btn" onClick={onClose} aria-label="Back"><IconBack /></button>
        <h2>Photo tour</h2>
        <div className="tour-actions">
          <button type="button" className="round-btn" onClick={onShare} aria-label="Share"><IconShare /></button>
          <button type="button" className="round-btn" onClick={onSave} aria-label="Save" aria-pressed={saved}><IconHeart filled={saved} /></button>
        </div>
      </header>
      <div className="tour-body">
        <nav className="tour-nav" aria-label="Photo categories">
          {listing.photoTour.map(g => (
            <button key={g.category} type="button" className={active === g.category ? 'active' : ''}
              onClick={() => jump(g.category)} aria-current={active === g.category}>
              <img src={g.photos[0].src} alt="" loading="lazy" /><span>{g.category}</span>
            </button>
          ))}
        </nav>
        <div className="tour-scroll" ref={scrollRef} onScroll={onScroll}>
          {listing.photoTour.map(g => (
            <section key={g.category} id={`tour-${slug(g.category)}`} className="tour-group" aria-label={g.category}>
              <h3>{g.category}</h3>
              <p className="subtle">{g.tags.join(' · ')}</p>
              <div className="tour-photos">
                {g.photos.map((p, i) => (
                  <button key={p.id} type="button" className={i === 0 ? 'first' : ''} onClick={() => onPhoto(p)}
                    aria-label={`Open photo: ${p.alt}`}>
                    <img src={p.src} alt={p.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/* ---------------- Lightbox ---------------- */
export function Lightbox({ photos, index, onClose, onNavigate }: {
  photos: Photo[]; index: number; onClose: () => void; onNavigate: (i: number) => void;
}) {
  useScrollLock(true);
  const ref = useFocusTrap<HTMLDivElement>(true);
  const [dir, setDir] = useState(0);
  const photo = photos[index];
  const go = (d: number) => { setDir(d); onNavigate((index + d + photos.length) % photos.length); };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  });
  // Preload neighbours for instant arrow navigation.
  useEffect(() => {
    [photos[(index + 1) % photos.length], photos[(index - 1 + photos.length) % photos.length]]
      .forEach(p => { if (p) { const im = new Image(); im.src = p.src; } });
  }, [index, photos]);

  if (!photo) return null;
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.alt}`} ref={ref} tabIndex={-1}>
      <header className="lb-bar">
        <button type="button" className="round-btn light" onClick={onClose} aria-label="Close"><IconClose /></button>
        <span className="lb-count" aria-live="polite">{index + 1} / {photos.length}</span>
        <span className="lb-cat">{photo.category}</span>
      </header>
      <button type="button" className="lb-arrow prev" onClick={() => go(-1)} aria-label="Previous photo"><IconChevron dir="left" /></button>
      <figure className="lb-stage" key={photo.id} data-dir={dir}>
        <img src={photo.src} alt={photo.alt} />
        <figcaption>{photo.alt}</figcaption>
      </figure>
      <button type="button" className="lb-arrow next" onClick={() => go(1)} aria-label="Next photo"><IconChevron /></button>
    </div>
  );
}
