import type { Photo } from '../types';
import { IconGrid, IconHeart, IconShare } from './icons';

export function TitleRow({ title, saved, onShare, onSave }: {
  title: string; saved: boolean; onShare: () => void; onSave: () => void;
}) {
  return (
    <div className="title-row" id="photos">
      <h1>{title}</h1>
      <div className="title-actions">
        <button type="button" onClick={onShare}><IconShare /><u>Share</u></button>
        <button type="button" onClick={onSave} aria-pressed={saved}><IconHeart filled={saved} /><u>Save</u></button>
      </div>
    </div>
  );
}

export function HeroGallery({ photos, title, onOpen }: {
  photos: Photo[]; title: string; onOpen: (photo: Photo) => void;
}) {
  const hero = photos.slice(0, 5);
  return (
    <section className="hero" aria-label="Photos of this place">
      <div className="hero-grid">
        {hero.map((p, i) => (
          <button key={p.id} type="button" className={`hero-cell c${i + 1}`}
            onClick={() => onOpen(p)} aria-label={`${title} image ${i + 1}`}>
            <img src={p.src} alt={p.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </button>
        ))}
      </div>
      <button type="button" className="show-all" onClick={() => onOpen(hero[0])} id="show-all-photos">
        <IconGrid /> Show all photos
      </button>
    </section>
  );
}
