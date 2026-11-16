export interface Photo { id: string; category: string; src: string; alt: string; tags: string[] }
export interface PhotoGroup { category: string; tags: string[]; photos: Photo[] }
export interface Host {
  name: string; avatar: string; yearsHosting: number; rating: number; reviews: number;
  details: string; responseRate: string; responseTime: string; coHosts: string[]; facts: string[];
}
export interface Review { id: string; author: string; avatar: string; meta: string; date: string; text: string; truncated: boolean }
export interface SimilarStay { id: string; title: string; priceInr: number; rating: number; image: string }
export interface Listing {
  id: string; title: string; placeType: string; location: string;
  guests: number; bedrooms: number; beds: number; bathrooms: number;
  rating: number; reviewCount: number; nightlyInr: number; total5NightsInr: number;
  checkIn: string; checkOut: string; defaultGuests: number;
  description: string; fullDescription: string; highlights: string[];
  host: Host; photos: Photo[]; photoTour: PhotoGroup[];
  amenities: { group: string; items: string[] }[];
  amenitiesPreview: string[];
  ratingCategories: { label: string; score: number }[];
  ratingDistribution: number[][];
  reviews: Review[]; similar: SimilarStay[]; sleeping: string[];
}
export interface Quote {
  nights: number; nightlyInr: number; subtotalInr: number; cleaningInr: number;
  serviceInr: number; taxesInr: number; totalInr: number; freeCancelBefore: string;
}
export interface Guests { adults: number; children: number; infants: number; pets: number }
export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');
export const guestLabel = (g: Guests) => {
  const main = g.adults + g.children;
  let s = `${main} guest${main !== 1 ? 's' : ''}`;
  if (g.infants) s += `, ${g.infants} infant${g.infants > 1 ? 's' : ''}`;
  if (g.pets) s += `, ${g.pets} pet${g.pets > 1 ? 's' : ''}`;
  return s;
};
