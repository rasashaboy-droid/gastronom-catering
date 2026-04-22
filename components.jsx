// Shared primitives + icon set

// ASSET: префикс путей относительно текущего HTML.
// Главная HTML задаёт window.BASE = './'; форматные = '../'.
// Вызов ASSET('/images/foo.jpg') вернёт './images/foo.jpg' или '../images/foo.jpg'.
const ASSET = (p) => (window.BASE || './') + String(p).replace(/^\/+/, '');
window.ASSET = ASSET;

const Placeholder = ({ label, variant = 'cream', style, className = '', children }) => (
  <div className={`ph ${variant} ${className}`} style={style}>
    {children}
    {label && <span className="ph-label">{label}</span>}
  </div>
);

const Chip = ({ children, color = 'var(--coral)', style }) => (
  <span className="chip" style={style}>
    <span className="chip-dot" style={{ background: color }}></span>
    {children}
  </span>
);

const SecLabel = ({ children }) => (
  <span className="sec-label">
    <span className="dot"></span>
    {children}
  </span>
);

// Simple line icons (stroke 1.6)
const Icon = {
  Arrow: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  ArrowDown: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  ),
  Plus: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Spark: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.8 6.4L20 10l-6.2 1.6L12 18l-1.8-6.4L4 10l6.2-1.6L12 2z" />
    </svg>
  ),
  Dot: ({ size = 8, color = 'currentColor' }) => (
    <span style={{display:'inline-block', width:size, height:size, borderRadius:'50%', background: color}}/>
  ),
  Utensils: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 2v8M5 2h4M7 10v12M17 2c-1.5 3 0 6 0 10v10M17 2v10" />
    </svg>
  ),
  Clock: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Truck: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h11v10H3zM14 11h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  Leaf: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4c0 10-6 16-14 16 0-10 6-16 14-16zM4 20c4-4 8-6 14-8" />
    </svg>
  ),
  Heart: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
    </svg>
  ),
  Phone: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.6-3 20 20 0 0 1-6-6 20 20 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c1 .3 1.9.5 2.9.6A2 2 0 0 1 22 17z" />
    </svg>
  ),
  Check: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Star: ({ size = 14, fill = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 2l3 7 7 .6-5.3 4.7 1.6 6.7-6.3-3.7-6.3 3.7 1.6-6.7L2 9.6 9 9z" />
    </svg>
  ),
};

// Universal lucide icon renderer. Usage: <LucideIcon name="Cake" color="var(--tomato)" size={20} glow/>
// Loads from window.lucide (UMD). Converts lucide node [tag, attrs, children] into React SVG.
const LucideIcon = ({ name, size = 20, color, glow = false, strokeWidth, style, className = '' }) => {
  const lib = typeof window !== 'undefined' ? window.lucide : null;
  const icons = lib && (lib.icons || lib);
  const node = icons && icons[name];
  if (!node) return null;
  const [tag, rawAttrs, rawChildren = []] = node;
  const toCamel = (k) => k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const convertAttrs = (attrs) => {
    const out = {};
    for (const k in attrs) {
      if (k === 'class') continue; // we set className explicitly
      out[toCamel(k)] = attrs[k];
    }
    return out;
  };
  const rootAttrs = {
    ...convertAttrs(rawAttrs),
    width: size,
    height: size,
    stroke: color || 'currentColor',
    strokeWidth: strokeWidth != null ? strokeWidth : (rawAttrs['stroke-width'] || 2),
    className: `${glow ? 'icon-glow ' : ''}${className}`.trim(),
    style,
  };
  const kids = rawChildren.map(([t, a], i) =>
    React.createElement(t, { ...convertAttrs(a), key: i })
  );
  return React.createElement(tag, rootAttrs, kids);
};

// Decorative wavy gradient blob
const Blob = ({ style, color = 'var(--peach)', size = 220 }) => (
  <div className="blob" style={{
    width: size, height: size, background: color, ...style
  }} />
);

// Marquee of text
const Marquee = ({ items, speed = 40, color = 'var(--ink)' }) => {
  const loop = [...items, ...items, ...items];
  return (
    <div style={{
      overflow: 'hidden', position: 'relative', width: '100%',
      maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'
    }}>
      <div style={{
        display: 'inline-flex', gap: 40, whiteSpace: 'nowrap',
        animation: `marquee ${speed}s linear infinite`,
        fontFamily: 'Unbounded, sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(32px, 6vw, 72px)',
        color,
        letterSpacing: '-0.02em',
      }}>
        {loop.map((item, i) => (
          <span key={i} style={{display:'inline-flex', alignItems:'center', gap: 40}}>
            {item}
            <span style={{display:'inline-block', width:14, height:14, borderRadius:'50%', background:'var(--tomato)', verticalAlign:'middle'}}/>
          </span>
        ))}
      </div>
    </div>
  );
};

// Count-up number hook
const useCountUp = (end, duration = 1200, start = 0) => {
  const [val, setVal] = React.useState(start);
  const [started, setStarted] = React.useState(false);
  React.useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(start + (end - start) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration, start]);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [val, ref];
};

Object.assign(window, {
  Placeholder, Chip, SecLabel, Icon, LucideIcon, Blob, Marquee, useCountUp,
});
