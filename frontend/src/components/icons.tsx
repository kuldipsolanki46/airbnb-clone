/** Inline SVG icon set drawn for this clone (Airbnb-style 32px stroke icons). */
const S = ({ d, fill = 'none' }: { d: string; fill?: string }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d={d} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const IconShare = () => <S d="m27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9m11-15v21m-10-11 9.3-9.3a1 1 0 0 1 1.4 0L26 13" />;
export const IconHeart = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 28.7C8.8 23.8 1.7 17.8 1.7 10.6c0-1.9.7-3.7 2.1-5.1C5.2 4.1 7 3.3 8.8 3.3c1.8 0 3.7.7 5.1 2.1L16 7.6l2.1-2.1c1.4-1.4 3.2-2.1 5.1-2.1 1.8 0 3.7.7 5.1 2.1 1.4 1.4 2.1 3.3 2.1 5.1 0 7.2-7.2 13.2-14.4 18.1z" fill={filled ? '#ff385c' : 'none'} stroke={filled ? '#ff385c' : 'currentColor'} strokeWidth="2" /></svg>
);
export const IconStar = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 3l3.9 8.6 9.4.9-7 6.4 1.9 9.3L16 23.6l-8.2 4.6 1.9-9.3-7-6.4 9.4-.9z" fill="currentColor" /></svg>
);
export const IconGlobe = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 .25a7.75 7.75 0 1 1 0 15.5A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08a6.26 6.26 0 0 0 3.9-4.33zM4.54 8.75H1.8a6.26 6.26 0 0 0 3.94 5.08 12.6 12.6 0 0 1-1.2-5.08zM8 1.75c-.7 0-1.78 2.51-1.94 5.5h3.9C9.8 4.35 8.77 1.9 8 1.75z" fill="currentColor" /></svg>
);
export const IconMenu = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" strokeWidth="3"><path d="M2 16h28M2 24h28M2 8h28" /></g></svg>
);
export const IconSearch = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M13 24a11 11 0 1 1 0-22 11 11 0 0 1 0 22zm8-3 9 9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
);
export const IconChevron = ({ dir = 'right' }: { dir?: 'left' | 'right' | 'down' }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" style={{ transform: dir === 'left' ? 'rotate(180deg)' : dir === 'down' ? 'rotate(90deg)' : undefined }}><path d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const IconClose = () => <S d="M6 6l20 20M26 6L6 26" />;
export const IconBack = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const IconGrid = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="currentColor" fillRule="evenodd" d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM3 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM3 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" /></svg>
);
export const IconFlag = () => <S d="M6 28V4c6-3 10 3 20 0v12c-10 3-14-3-20 0" />;
export const IconPool = () => <S d="M2 24c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2 2.5 2 5 2 2.5-2 3-2M10 20V6a2 2 0 0 1 4 0M20 20V6a2 2 0 0 1 4 0M10 10h4M20 10h4" />;
export const IconFan = () => <S d="M16 16m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M16 14c0-5 1-9 4-9s2 5-1 7M18 16c5 0 9 1 9 4s-5 2-7-1M16 18c0 5-1 9-4 9s-2-5 1-7M14 16c-5 0-9-1-9-4s5-2 7 1" />;
export const IconDoor = () => <S d="M6 28V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v23M3 28h26M19 16h.5" />;
export const IconKitchen = () => <S d="M7 2v12M4 2v5a3 3 0 0 0 6 0V2M7 14v16M24 2c-3 0-5 4-5 9 0 4 2 6 5 6v13" />;
export const IconWifi = () => <S d="M2 11a21 21 0 0 1 28 0M6 16a14 14 0 0 1 20 0M10.5 21a7 7 0 0 1 11 0M16 26h.5" />;
export const IconCar = () => <S d="M4 22l2-10a3 3 0 0 1 3-2h14a3 3 0 0 1 3 2l2 10M4 22h24M4 22v6M28 22v6M8 18h.5M24 18h.5" />;
export const IconPaw = () => <S d="M10 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm12 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm22 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-11-3c-4 0-8 4-8 8 0 2 1.5 3 3.5 3 1.5 0 2.5-1 4.5-1s3 1 4.5 1c2 0 3.5-1 3.5-3 0-4-4-8-8-8z" />;
export const IconCamera = () => <S d="M3 12l3-6h13l3 4h7v18H3zM16 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />;
export const IconDesk = () => <S d="M3 10h26M6 10v14M26 10v14M12 10V6h8v4" />;
export const IconBath = () => <S d="M3 12h26v3a10 10 0 0 1-10 10h-6A10 10 0 0 1 3 15zM6 12V6a4 4 0 0 1 7-2.5" />;
export const IconAlarmOff = () => <S d="M4 4l24 24M14 8a9 9 0 0 1 10 10M8 11a9 9 0 0 0 6 13" />;
export const IconGeneric = () => <S d="M16 3l3 7 7 .5-5.4 4.6 1.7 6.9L16 18l-6.3 4 1.7-6.9L6 10.5 13 10z" />;
export const IconShield = () => <S d="M16 3l10 4v8c0 7-4.5 11.5-10 14C10.5 26.5 6 22 6 15V7z" />;
export const IconMessage = () => <S d="M4 5h24v18H12l-8 6z" />;

export const IconCheckCircle = () => <S d="M28 16a12 12 0 1 1-24 0 12 12 0 0 1 24 0zM10 16.5l4 4L22 12" />;
export const IconKey = () => <S d="M20 10a8 8 0 1 0 3.4 14.6L28 20v-4h-4v-4h-4.6A8 8 0 0 0 20 10zM9 11h.5" />;
export const IconPin = () => <S d="M16 28S5 19.5 5 12a11 11 0 0 1 22 0c0 7.5-11 16-11 16zM16 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />;
export const IconTag = () => <S d="M3 3h13l13 13-13 13L3 16zM9 9h.5" />;
export const IconSpray = () => <S d="M12 28V12M8 28h8M12 12V7h6v5M18 7l5-3M20 10l5-1M20 4l4-2" />;

export function amenityIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('clean')) return <IconSpray />;
  if (n.includes('accuracy')) return <IconCheckCircle />;
  if (n.includes('check-in')) return <IconKey />;
  if (n.includes('communication')) return <IconMessage />;
  if (n.includes('location')) return <IconPin />;
  if (n.includes('value')) return <IconTag />;
  if (n.includes('kitchen') || n.includes('fridge') || n.includes('cooker') || n.includes('microwave')) return <IconKitchen />;
  if (n.includes('wifi') || n.includes('tv')) return <IconWifi />;
  if (n.includes('parking') || n.includes('car')) return <IconCar />;
  if (n.includes('pet')) return <IconPaw />;
  if (n.includes('camera')) return <IconCamera />;
  if (n.includes('workspace')) return <IconDesk />;
  if (n.includes('pool') || n.includes('hot tub') || n.includes('shower') || n.includes('hairdryer') || n.includes('hot water')) return <IconBath />;
  if (n.includes('alarm')) return <IconAlarmOff />;
  return <IconGeneric />;
}

/** Airbnb wordmark (drawn as text-free Bélo-style mark + wordmark path). */
export function AirbnbLogo() {
  return (
    <span className="logo" aria-hidden="true">
      <svg viewBox="0 0 32 32"><path fill="#ff385c" d="M16 28.9c-1.5-2-4.4-5.9-4.4-8.9 0-2.5 2-4 4.4-4s4.4 1.6 4.4 4c0 3-2.9 6.9-4.4 8.9zm0 3.1c1.8 0 3.4-.9 4.6-2.1 2-2 3.8-5.3 4.6-8.3.3-1.1.5-2.2.5-3.2 0-3.9-1.5-7.5-3.2-10.6C20.9 4.9 19 1 16 1S11.1 4.9 9.5 7.8C7.8 10.9 6.3 14.5 6.3 18.4c0 1 .2 2.1.5 3.2.8 3 2.6 6.3 4.6 8.3C12.6 31.1 14.2 32 16 32zm0-2.6c2.1 0 4-1 5.5-2.7-1 2.4-3 4-5.5 4s-4.5-1.6-5.5-4c1.5 1.7 3.4 2.7 5.5 2.7zM16 3.4c2 .3 3.4 3.3 4.8 6 1.4 2.8 2.6 6 2.6 9 0 .7-.1 1.3-.2 2-.7-2.3-1.8-4.8-3-6.4C18.9 12.3 17.5 11.5 16 11.5s-2.9.8-4.2 2.5c-1.2 1.6-2.3 4.1-3 6.4-.1-.7-.2-1.3-.2-2 0-3 1.2-6.2 2.6-9 1.4-2.7 2.8-5.7 4.8-6z" opacity="0" /><path fill="#ff385c" d="M29.2 22.3c-.6 1.6-1.9 4.4-2.3 5.4-.5 1.2-1.1 2.3-2 3.1a5.3 5.3 0 0 1-3.6 1.4c-2.5 0-4.7-1.6-6.3-3.7a37 37 0 0 1-4.4 5.2C9.9 32.5 7.7 32 6 30.6c-1.5-1.2-2.3-3-2.3-4.9 0-.8.2-1.7.5-2.5.3-.9 1.1-2.8 1.5-3.8C7.6 14.8 9.6 10.2 11.6 5.6c.4-.8 1-2 1.7-2.7C14.3 1.9 15.1 1.5 16 1.5s1.7.4 2.7 1.4c.7.7 1.3 1.9 1.7 2.7 2 4.6 4 9.2 5.9 13.8.4 1 1.2 2.9 1.5 3.8.2.5.4 1.2.4 1.9 0 .6-.1 1.2 1-.8zm-13.2 3.4c1.4-1.8 3.2-4.3 3.2-6.5 0-1.8-1.4-2.9-3.2-2.9s-3.2 1.1-3.2 2.9c0 2.2 1.8 4.7 3.2 6.5zm7.2 3.6c1.1-.9 1.7-2.2 1.7-3.6 0-.5-.1-.9-.3-1.4-.2-.7-1.1-2.7-1.4-3.5-1.9-4.5-3.9-9-5.8-13.5-.3-.6-.8-1.6-1.2-2-.3-.3-.5-.4-.6-.4s-.3.1-.6.4c-.4.4-.9 1.4-1.2 2-1.9 4.5-3.9 9-5.8 13.5-.3.8-1.2 2.8-1.4 3.5-.2.5-.3.9-.3 1.4 0 1.4.6 2.7 1.7 3.6.7.6 1.6 1 2.6 1 2.2 0 4.1-1.8 5.6-3.7 1.5 1.9 3.4 3.7 5.6 3.7 1 0 1.9-.4 2.6-1z" transform="scale(.94) translate(1 1)" /></svg>
      <span className="logo-word">airbnb</span>
    </span>
  );
}

export function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg className={`laurel ${flip ? 'flip' : ''}`} viewBox="0 0 24 48" aria-hidden="true">
      <g fill="#222">
        <ellipse cx="10" cy="6" rx="4" ry="6" transform="rotate(-24 10 6)" />
        <ellipse cx="7" cy="16" rx="4" ry="6" transform="rotate(-38 7 16)" />
        <ellipse cx="6" cy="27" rx="4" ry="6" transform="rotate(-52 6 27)" />
        <ellipse cx="8" cy="38" rx="4" ry="6" transform="rotate(-66 8 38)" />
        <ellipse cx="13" cy="46" rx="3.4" ry="5" transform="rotate(-80 13 46)" />
      </g>
    </svg>
  );
}
