// Shared primitives + icon set

// ASSET: префикс путей относительно текущего HTML.
// Главная HTML задаёт window.BASE = './'; форматные = '../'.
// Вызов ASSET('/images/foo.jpg') вернёт './images/foo.jpg' или '../images/foo.jpg'.
const ASSET = (p) => (window.BASE || './') + String(p).replace(/^\/+/, '');
window.ASSET = ASSET;

// Endpoint для заявок — Yandex Cloud Function, которая шлёт сообщение в Telegram.
// Функция сама валидирует, rate-limit'ит и молча игнорит honeypot.
const LEADS_ENDPOINT = 'https://functions.yandexcloud.net/d4e5pvtmn1e24dm1k2bk';

// Название текущей форматной страницы (пример: 'gastroboxes' → 'Гастробоксы').
// Используется в заявках, чтобы в Telegram приходило человекочитаемое имя формата.
window.currentFormatName = () => {
  const slug = window.__FORMAT__;
  if (!slug) return '';
  const data = window.FORMATS_DATA;
  if (!Array.isArray(data)) return slug;
  const f = data.find(x => x.slug === slug);
  return (f && f.name) || slug;
};

// Универсальный хелпер для всех форм. payload минимум { source, phone }.
// Автоматически добавит page/referer. Бросит исключение при !ok — формы сами отобразят ошибку.
window.sendLead = async (payload) => {
  const body = {
    ...payload,
    page: (window.location.pathname || '/') + (window.location.hash || ''),
    referer: document.referrer || '',
  };
  const res = await fetch(LEADS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let msg = '';
    try { msg = await res.text(); } catch (_) {}
    throw new Error(`Leads API ${res.status}: ${msg}`);
  }
  return res.json();
};

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
  Placeholder, Chip, SecLabel, Icon, LucideIcon, Blob, useCountUp,
});
