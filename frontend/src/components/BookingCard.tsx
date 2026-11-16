import { useEffect, useRef, useState } from 'react';
import { guestLabel, inr, type Guests, type Listing, type Quote } from '../types';
import { fetchQuote } from '../lib/api';
import { fmtInput, nightsBetween, type DateRange } from './Calendar';
import { IconChevron, IconFlag } from './icons';

const ROWS: { key: keyof Guests; label: string; sub: string; max: number }[] = [
  { key: 'adults', label: 'Adults', sub: 'Age 13+', max: 3 },
  { key: 'children', label: 'Children', sub: 'Ages 2–12', max: 3 },
  { key: 'infants', label: 'Infants', sub: 'Under 2', max: 5 },
  { key: 'pets', label: 'Pets', sub: 'Bringing a service animal?', max: 2 },
];

export function BookingCard({ listing, range, guests, setGuests, onDatesFocus, notify }: {
  listing: Listing; range: DateRange; guests: Guests;
  setGuests: (g: Guests) => void; onDatesFocus: () => void; notify: (m: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [phase, setPhase] = useState<'idle' | 'review' | 'done'>('idle');
  const [quotedFor, setQuotedFor] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const totalGuests = guests.adults + guests.children;
  const nights = nightsBetween(range);
  const total = nights === 5 ? listing.total5NightsInr : nights ? Math.round(listing.nightlyInr * nights) : listing.total5NightsInr;
  // Invalidate quote whenever dates or guest mix change (no setState-in-effect).
  const bookingKey = `${range.start ?? ''}|${range.end ?? ''}|${guests.adults}|${guests.children}|${guests.infants}|${guests.pets}`;
  const activeQuote = quotedFor === bookingKey ? quote : null;
  const activePhase = quotedFor === bookingKey ? phase : 'idle';

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (!boxRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const bump = (key: keyof Guests, delta: number) => {
    const row = ROWS.find(r => r.key === key)!;
    const next = { ...guests, [key]: Math.min(row.max, Math.max(key === 'adults' ? 1 : 0, guests[key] + delta)) };
    if ((key === 'adults' || key === 'children') && next.adults + next.children > listing.guests) return;
    setGuests(next);
  };

  const reserve = async () => {
    if (!range.start || !range.end) { onDatesFocus(); notify('Select your check-in and checkout dates first'); return; }
    const q = await fetchQuote(listing.id, range.start, range.end, totalGuests);
    setQuote(q);
    setQuotedFor(bookingKey);
    setPhase('review');
  };

  return (
    <aside className="booking" aria-label="Booking">
      <div className="discount">
        <span className="tag-icon" aria-hidden="true">%</span>
        <div><strong>Get 10% off your next stay.</strong><span>Terms apply</span></div>
        <button type="button" onClick={() => notify('Offer claimed — 10% off applied at checkout')}>Claim</button>
      </div>
      <div className="booking-card" ref={boxRef}>
        <div className="price-row">
          <strong>{inr(total)}</strong><span> for {nights || 5} night{nights === 1 ? '' : 's'}</span>
        </div>
        <div className="book-grid">
          <button type="button" className="book-cell" onClick={onDatesFocus}>
            <span>CHECK-IN</span><span>{fmtInput(range.start) || 'Add date'}</span>
          </button>
          <button type="button" className="book-cell" onClick={onDatesFocus}>
            <span>CHECKOUT</span><span>{fmtInput(range.end) || 'Add date'}</span>
          </button>
          <div className="book-cell guests-cell">
            <button type="button" className="guests-btn" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(v => !v)}>
              <span><span className="g-label">GUESTS</span><span>{guestLabel(guests)}</span></span>
              <span className={`chev ${open ? 'up' : ''}`}><IconChevron dir="down" /></span>
            </button>
            {open && (
              <div className="guests-pop" role="group" aria-label="Choose guests">
                {ROWS.map(r => (
                  <div className="guest-row" key={r.key}>
                    <div><strong>{r.label}</strong><span>{r.sub}</span></div>
                    <div className="stepper">
                      <button type="button" aria-label={`Remove one ${r.label}`}
                        disabled={guests[r.key] <= (r.key === 'adults' ? 1 : 0)} onClick={() => bump(r.key, -1)}>−</button>
                      <span aria-live="polite">{guests[r.key]}</span>
                      <button type="button" aria-label={`Add one ${r.label}`}
                        disabled={guests[r.key] >= r.max || ((r.key === 'adults' || r.key === 'children') && totalGuests >= listing.guests)}
                        onClick={() => bump(r.key, 1)}>+</button>
                    </div>
                  </div>
                ))}
                <p className="max-note">This place has a maximum of {listing.guests} guests, not including infants. Pets are allowed.</p>
                <button type="button" className="link-btn close-g" onClick={() => setOpen(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
        <p className="cancel-note">Free cancellation before {activeQuote?.freeCancelBefore ?? '17 October'}</p>
        {activePhase !== 'review' ? (
          <button type="button" className="btn-reserve" onClick={reserve} disabled={activePhase === 'done'}>
            {activePhase === 'done' ? 'Request sent ✓' : 'Reserve'}
          </button>
        ) : activeQuote && (
          <div className="quote" role="status">
            <div><span>{inr(activeQuote.nightlyInr)} × {activeQuote.nights} nights</span><span>{inr(activeQuote.subtotalInr)}</span></div>
            <div><span>Cleaning fee</span><span>{inr(activeQuote.cleaningInr)}</span></div>
            <div><span>Airbnb service fee</span><span>{inr(activeQuote.serviceInr)}</span></div>
            <div><span>Taxes</span><span>{inr(activeQuote.taxesInr)}</span></div>
            <hr /><div className="q-total"><span>Total</span><span>{inr(activeQuote.totalInr)}</span></div>
            <button type="button" className="btn-reserve" onClick={() => { setPhase('done'); notify('Request to book sent to Mirashya Homes'); }}>
              Confirm request
            </button>
          </div>
        )}
        <p className="not-charged">You won't be charged yet</p>
      </div>
      <button type="button" className="report" onClick={() => notify('Thanks — our team will review this listing')}>
        <IconFlag /> <u>Report this listing</u>
      </button>
    </aside>
  );
}
