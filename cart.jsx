// ============ EPHEMERAL PAGE STATE (for restoring scroll/category on nav) ============
window.PageState = window.PageState || { scrollY: 0, menuCategory: 'canape' };

// ============ OPTIMIZED IMAGE HELPER ============
// Takes "images/foo.jpeg" → { src: "images/optimized/foo-600.jpg",
//                             srcSet: "...-600.jpg 600w, ...-1200.jpg 1200w" }
const getOptimizedPhoto = (p) => {
  if (!p) return null;
  const m = p.match(/^(.+)\/([^/]+)\.([^.]+)$/);
  if (!m) return null;
  const dir = m[1], base = m[2];
  const enc = (s) => encodeURI(s);
  return {
    src: enc(`${dir}/optimized/${base}-600.jpg`),
    srcSet: `${enc(`${dir}/optimized/${base}-600.jpg`)} 600w, ${enc(`${dir}/optimized/${base}-1200.jpg`)} 1200w`,
  };
};
window.getOptimizedPhoto = getOptimizedPhoto;

// Drop-in <img> replacement: optimized srcset + lazy + graceful fallback to original on 404.
const OptImg = ({ photo, alt, sizes, style, className }) => {
  const [errored, setErrored] = React.useState(false);
  const opt = getOptimizedPhoto(photo);
  if (!photo) return null;
  if (!opt || errored) {
    return <img src={photo} alt={alt || ''} loading="lazy" decoding="async" style={style} className={className}/>;
  }
  return (
    <img
      src={opt.src}
      srcSet={opt.srcSet}
      sizes={sizes || '(max-width: 640px) 50vw, 600px'}
      alt={alt || ''}
      loading="lazy"
      decoding="async"
      style={style}
      className={className}
      onError={() => setErrored(true)}
    />
  );
};
window.OptImg = OptImg;

// ============ CART STORE (global, with localStorage persistence) ============
(() => {
  const KEY = 'gc_cart_v1';
  const listeners = new Set();
  let items = {};
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) items = JSON.parse(raw) || {};
  } catch (e) { items = {}; }

  const persist = () => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  };
  const emit = () => { persist(); listeners.forEach(l => l()); };

  window.Cart = {
    get(name) { return items[name] ? items[name].qty : 0; },
    set(name, qty) {
      if (qty <= 0) { delete items[name]; }
      else if (items[name]) { items[name].qty = qty; }
      emit();
    },
    add(item, delta = 1) {
      const cur = items[item.name] ? items[item.name].qty : 0;
      const next = Math.max(0, cur + delta);
      if (next === 0) delete items[item.name];
      else items[item.name] = { item, qty: next };
      emit();
    },
    remove(name) { delete items[name]; emit(); },
    clear() { items = {}; emit(); },
    all() { return Object.values(items); },
    count() { return Object.values(items).reduce((s, e) => s + e.qty, 0); },
    totalPrice() {
      return Object.values(items).reduce((s, e) => s + e.qty * (e.item.price || 0), 0);
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };
})();

// ============ HOOK ============
const useCart = () => {
  const [, bump] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => window.Cart.subscribe(bump), []);
  return window.Cart;
};

// ============ HASH ROUTER ============
const useHashRoute = () => {
  const [hash, setHash] = React.useState(() => window.location.hash);
  React.useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
};

// ============ FLOATING CART BUTTON ============
const FloatingCartButton = () => {
  const cart = useCart();
  const hash = useHashRoute();
  if (hash === '#/cart') return null;
  const count = cart.count();
  const goToCart = (e) => {
    e.preventDefault();
    window.PageState.scrollY = window.scrollY;
    window.location.hash = '#/cart';
  };
  return (
    <a href="#/cart" onClick={goToCart} className="cart-fab" aria-label={`Корзина, позиций: ${count}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1.5"/>
        <circle cx="18" cy="20" r="1.5"/>
        <path d="M3 4h2.2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6"/>
      </svg>
      {count > 0 && <span className="cart-fab__badge">{count}</span>}
    </a>
  );
};

// ============ CART PAGE ============
const CartPage = () => {
  const cart = useCart();
  const entries = cart.all();
  const total = cart.totalPrice();

  return (
    <div style={{minHeight:'100vh', background:'var(--cream-50)', padding: '40px 20px 120px'}}>
      <div className="wrap" style={{maxWidth: 900}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 32, gap: 20, flexWrap:'wrap'}}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
            style={{display:'inline-flex', alignItems:'center', gap: 8, color:'var(--ink-60)', fontSize: 14, textDecoration:'none'}}
          >
            ← На главную
          </a>
          {entries.length > 0 && (
            <button
              onClick={() => { if (confirm('Очистить корзину?')) cart.clear(); }}
              style={{background:'transparent', border:'none', color:'var(--ink-60)', cursor:'pointer', fontSize: 13}}
            >
              Очистить
            </button>
          )}
        </div>

        <h1 className="display" style={{fontSize:'clamp(32px, 4vw, 56px)', fontWeight: 700, letterSpacing:'-0.02em', marginBottom: 28}}>
          Корзина {entries.length > 0 && <span style={{color:'var(--ink-40)', fontWeight: 600}}>· {cart.count()}</span>}
        </h1>

        {entries.length === 0 ? (
          <div style={{
            padding: '60px 20px', background:'var(--cream-100)', borderRadius: 24,
            textAlign:'center', color:'var(--ink-60)',
          }}>
            <div style={{fontSize: 17, marginBottom: 16}}>Корзина пуста</div>
            <a
              href="#menu"
              onClick={(e) => { e.preventDefault(); window.location.hash = ''; setTimeout(() => { const el = document.getElementById('menu'); if (el) window.scrollTo({top: el.offsetTop - 60}); }, 20); }}
              className="btn btn-primary" style={{display:'inline-flex'}}
            >К меню</a>
          </div>
        ) : (
          <>
            <div style={{display:'flex', flexDirection:'column', gap: 12, marginBottom: 24}}>
              {entries.map(({ item, qty }) => (
                <CartRow key={item.name} item={item} qty={qty}/>
              ))}
            </div>

            <div style={{
              background:'var(--cream-100)', borderRadius: 24, padding: '22px 24px',
              display:'flex', justifyContent:'space-between', alignItems:'center', gap: 16, flexWrap:'wrap',
            }}>
              <div>
                <div style={{fontSize: 13, color:'var(--ink-60)', marginBottom: 4}}>Итого</div>
                <div className="display" style={{fontSize: 28, fontWeight: 700, color:'var(--ink)'}}>
                  {total.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <button className="btn btn-primary" style={{padding:'14px 28px', fontSize: 15}}>
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartRow = ({ item, qty }) => {
  const cart = useCart();
  return (
    <div className="cart-row">
      <div className="cart-row__photo">
        {item.photo ? (
          <OptImg photo={item.photo} alt={item.name} sizes="84px" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
        ) : null}
      </div>
      <div className="cart-row__body">
        <div className="cart-row__name">{item.name}</div>
        <div className="mono cart-row__price">
          <span style={{color:'var(--tomato)', fontWeight: 600}}>{item.price != null ? `${item.price} ₽` : '—'}</span>
          {item.weight && <span style={{color:'var(--ink-40)', marginLeft: 8}}>· {item.weight}</span>}
        </div>
      </div>
      <div className="cart-row__controls">
        <div className="cart-row__stepper">
          <button
            onClick={() => cart.add(item, -1)}
            className="cart-row__qty-btn"
            aria-label="Убрать"
          >−</button>
          <div className="cart-row__qty">{qty}</div>
          <button
            onClick={() => cart.add(item, 1)}
            className="cart-row__qty-btn"
            aria-label="Добавить"
          >+</button>
        </div>
        <button
          onClick={() => cart.remove(item.name)}
          className="cart-row__remove"
          aria-label="Удалить"
        >×</button>
      </div>
    </div>
  );
};

// ============ QTY STEPPER (single container, crossfades content) ============
const QtyStepper = ({ item, size = 'md' }) => {
  const cart = useCart();
  const qty = cart.get(item.name);
  const active = qty > 0;
  const addLabel = 'В корзину';

  const onAdd = (e) => { e.stopPropagation(); cart.add(item, 1); };
  const onSub = (e) => { e.stopPropagation(); cart.add(item, -1); };

  return (
    <div
      className={'qty-wrap qty-wrap--' + size + (active ? ' qty-wrap--active' : '')}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Add-face: visible when qty=0 */}
      <button
        type="button"
        className="qty-face qty-face--add"
        onClick={onAdd}
        disabled={active}
        tabIndex={active ? -1 : 0}
        aria-hidden={active}
      >
        <span>{addLabel}</span>
        {size !== 'sm' && (
          <span className="mono" style={{fontWeight: 600}}>
            {item.price != null ? `${item.price} ₽` : '—'}
          </span>
        )}
      </button>

      {/* Stepper-face: visible when qty>0 */}
      <div className="qty-face qty-face--stepper" aria-hidden={!active}>
        <button type="button" className="qty-btn qty-btn--minus" onClick={onSub} disabled={!active} tabIndex={active ? 0 : -1} aria-label="Убрать">−</button>
        <div className="qty-count">
          {qty} <span style={{color:'var(--ink-60)', fontWeight: 500}}>шт</span>
        </div>
        <button type="button" className="qty-btn qty-btn--plus" onClick={onAdd} disabled={!active} tabIndex={active ? 0 : -1} aria-label="Добавить">+</button>
      </div>
    </div>
  );
};

Object.assign(window, { useCart, useHashRoute, FloatingCartButton, CartPage, QtyStepper });
