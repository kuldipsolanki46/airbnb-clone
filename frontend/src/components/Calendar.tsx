export interface DateRange { start: string | null; end: string | null }

const MONTHS = [
  { year: 2026, month: 9, label: 'October 2026' },
  { year: 2026, month: 10, label: 'November 2026' },
];
const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
export const fmtShort = (s: string | null) =>
  s ? new Date(s + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
export const fmtInput = (s: string | null) =>
  s ? new Date(s + 'T12:00:00').toLocaleDateString('en-US') : '';
export const nightsBetween = (r: DateRange) =>
  r.start && r.end ? Math.round((+new Date(r.end) - +new Date(r.start)) / 86400000) : 0;

function Month({ year, month, label, range, onPick }: {
  year: number; month: number; label: string; range: DateRange; onPick: (d: string) => void;
}) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div className="cal-month">
      <h3>{label}</h3>
      <div className="cal-dow" aria-hidden="true">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i}>{d}</span>)}</div>
      <div className="cal-grid" role="group" aria-label={label}>
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const date = iso(year, month, d);
          const disabled = date < '2026-10-01';
          const isStart = range.start === date, isEnd = range.end === date;
          const inRange = range.start && range.end && date > range.start && date < range.end;
          return (
            <button key={i} type="button" disabled={disabled}
              className={`cal-day ${isStart || isEnd ? 'sel' : ''} ${inRange ? 'in-range' : ''}`}
              onClick={() => onPick(date)}
              aria-label={new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              aria-pressed={isStart || isEnd}>{d}</button>
          );
        })}
      </div>
    </div>
  );
}

export function Calendar({ range, onChange }: { range: DateRange; onChange: (r: DateRange) => void }) {
  const pick = (d: string) => {
    if (!range.start || (range.start && range.end)) onChange({ start: d, end: null });
    else if (d > range.start) onChange({ start: range.start, end: d });
    else onChange({ start: d, end: null });
  };
  const n = nightsBetween(range);
  return (
    <section className="block calendar-block" aria-label="Choose dates">
      <h2>{n ? `${n} night${n > 1 ? 's' : ''} in Candolim` : 'Select check-in date'}</h2>
      <p className="subtle">{range.start ? `${fmtShort(range.start)}${range.end ? ` - ${fmtShort(range.end)}` : ''}` : 'Add your travel dates for exact pricing'}</p>
      <div className="cal-wrap">
        {MONTHS.map(m => <Month key={m.label} {...m} range={range} onPick={pick} />)}
      </div>
      <div className="cal-foot">
        <span className="kbd-icon" aria-hidden="true">⌨</span>
        <button type="button" className="link-btn" onClick={() => onChange({ start: null, end: null })}>Clear dates</button>
      </div>
    </section>
  );
}
