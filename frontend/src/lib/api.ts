import type { Listing, Quote } from '../types';
import fallbackJson from '../data/listing.json';

/** Bundled snapshot of the Java API payload — used when the backend is
 *  offline (e.g. a frontend-only static deploy). Same contract, no UI change. */
export const fallbackListing = fallbackJson as unknown as Listing;

const base = import.meta.env.VITE_API_BASE ?? '';

export async function fetchListing(id = 'mirashya-ug10'): Promise<Listing> {
  try {
    const res = await fetch(`${base}/api/listings/${id}`);
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as Listing;
  } catch {
    return fallbackListing;
  }
}

export async function fetchQuote(id: string, checkIn: string, checkOut: string, guests: number): Promise<Quote> {
  try {
    const res = await fetch(`${base}/api/listings/${id}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkIn, checkOut, guests }),
    });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as Quote;
  } catch {
    // Offline fallback mirrors QuoteService.java exactly.
    const nights = Math.max(1, Math.round((+new Date(checkOut) - +new Date(checkIn)) / 86400000));
    const nightly = fallbackListing.nightlyInr;
    const subtotal = nightly * nights;
    const cleaning = 1200;
    const service = Math.round(subtotal * 0.12);
    const taxes = Math.round(subtotal * 0.08);
    return { nights, nightlyInr: nightly, subtotalInr: subtotal, cleaningInr: cleaning, serviceInr: service, taxesInr: taxes, totalInr: subtotal + cleaning + service + taxes, freeCancelBefore: '17 October' };
  }
}
