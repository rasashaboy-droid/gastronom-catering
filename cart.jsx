// ============ EPHEMERAL PAGE STATE (for restoring scroll/category on nav) ============
window.PageState = window.PageState || { scrollY: 0, menuCategory: 'bruschetta' };

// ============ OPTIMIZED IMAGE HELPER ============
// Takes "images/foo.jpeg" → { src: "...-600.jpg", srcSet: "...-600.jpg 600w, ...-1200.jpg 1200w" }
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

const OptImg = ({ photo, alt, sizes, style, className }) => {
  const opt = getOptimizedPhoto(photo);
  if (!photo || !opt) return null;
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

// ============ FLOATING CONTACT BUTTONS (Telegram + Phone) ============
const FloatingContactBar = () => {
  const hash = useHashRoute();
  const hidden = hash === '#/cart';
  const hiddenCls = hidden ? ' contact-fab--hidden' : '';
  return (
    <>
      <a
        href="tel:+79934185343"
        className={'contact-fab contact-fab--phone' + hiddenCls}
        aria-hidden={hidden}
        tabIndex={hidden ? -1 : 0}
        aria-label="Позвонить"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.6-3 20 20 0 0 1-6-6 20 20 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c1 .3 1.9.5 2.9.6A2 2 0 0 1 22 17z"/>
        </svg>
      </a>
      <a
        href="https://t.me/gastronom_catering"
        target="_blank"
        rel="noopener noreferrer"
        className={'contact-fab contact-fab--telegram' + hiddenCls}
        aria-hidden={hidden}
        tabIndex={hidden ? -1 : 0}
        aria-label="Написать в Telegram"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{transform: 'translate(-1.5px, 1.5px)'}}>
          <path d="m22 2-7 20-4-9-9-4 20-7z"/>
          <path d="M22 2 11 13"/>
        </svg>
      </a>
    </>
  );
};

// ============ FLOATING CART BUTTON ============
const FloatingCartButton = () => {
  const cart = useCart();
  const hash = useHashRoute();
  const hidden = hash === '#/cart';
  const count = cart.count();
  const goToCart = (e) => {
    e.preventDefault();
    history.pushState(null, '', '#/cart');
    window.dispatchEvent(new Event('hashchange'));
  };
  return (
    <a
      href="#/cart"
      onClick={goToCart}
      className={'cart-fab' + (hidden ? ' cart-fab--hidden' : '')}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      aria-label={`Корзина, позиций: ${count}`}
    >
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
  const hash = useHashRoute();
  const isOpen = hash === '#/cart';
  const entries = cart.all();
  const total = cart.totalPrice();

  const [step, setStep] = React.useState(0); // 0 = cart, 1 = form, 2 = sent
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [hp, setHp] = React.useState(''); // honeypot
  const [status, setStatus] = React.useState('idle'); // idle | sending | error
  const [errorMsg, setErrorMsg] = React.useState('');

  // Сброс шага и формы, когда drawer закрыт (после анимации)
  React.useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setStep(0); setName(''); setPhone(''); setConsent(false);
      setStatus('idle'); setErrorMsg(''); setHp('');
    }, 400);
    return () => clearTimeout(t);
  }, [isOpen]);

  // При смене шага — прокрутить наверх контейнера
  React.useEffect(() => {
    const el = document.querySelector('.cart-overlay');
    if (el) el.scrollTo({top: 0, behavior: 'smooth'});
  }, [step]);

  const closeDrawer = (e) => {
    if (e) e.preventDefault();
    history.pushState(null, '', location.pathname + location.search);
    window.dispatchEvent(new Event('hashchange'));
  };

  const goToMenu = (e) => {
    e.preventDefault();
    history.pushState(null, '', location.pathname + location.search);
    window.dispatchEvent(new Event('hashchange'));
    const target = document.getElementById('menu');
    if (target) window.scrollTo({top: target.offsetTop - 60});
  };

  const canSubmit =
    name.trim().length > 0 &&
    phone.replace(/\D/g, '').length >= 10 &&
    consent &&
    status !== 'sending';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      await window.sendLead({
        source: 'cart',
        name: name.trim(),
        phone: phone.trim(),
        hp_field: hp,
        format: (window.currentFormatName && window.currentFormatName()) || '',
        cart: {
          items: entries.map(({item, qty}) => ({
            name: item.name,
            price: item.price,
            qty,
          })),
          count: cart.count(),
          total,
        },
      });
      setStatus('idle');
      setStep(2);
      cart.clear();
    } catch (err) {
      console.error('cart sendLead failed:', err);
      setStatus('error');
      setErrorMsg('Не удалось отправить. Попробуйте ещё раз или позвоните нам.');
    }
  };

  return (
    <div style={{minHeight:'100vh', background:'var(--cream-50)', padding: '40px 20px 120px'}}>
      <div className={'cart-stepper cart-stepper--step-' + step}>
        <div className="cart-stepper__track">
          {/* ---------- STEP 0: CART ---------- */}
          <div className="cart-stepper__pane" aria-hidden={step !== 0}>
            <div className="wrap" style={{maxWidth: 900}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 32, gap: 20, flexWrap:'wrap'}}>
                <a
                  href="#"
                  onClick={closeDrawer}
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
                    onClick={goToMenu}
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

                  <div className="cart-checkout-bar" style={{
                    background:'var(--cream-100)', borderRadius: 24, padding: '22px 24px',
                    display:'flex', justifyContent:'space-between', alignItems:'center', gap: 16, flexWrap:'wrap',
                  }}>
                    <div>
                      <div style={{fontSize: 13, color:'var(--ink-60)', marginBottom: 4}}>Итого</div>
                      <div className="display" style={{fontSize: 28, fontWeight: 700, color:'var(--ink)'}}>
                        {total.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <div className="cart-checkout-col" style={{display:'flex', flexDirection:'column', alignItems:'stretch', gap: 8}}>
                      <button
                        className="btn btn-primary cart-checkout-btn"
                        disabled={total < 5000}
                        onClick={() => { if (total >= 5000) setStep(1); }}
                      >
                        Оформить заказ
                      </button>
                      {total < 5000 && (
                        <div style={{fontSize: 13, color:'var(--tomato)', fontWeight: 500, textAlign:'center'}}>
                          Минимальный заказ от 5000 ₽
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ---------- STEP 1: FORM ---------- */}
          <div className="cart-stepper__pane" aria-hidden={step !== 1}>
            <div className="wrap" style={{maxWidth: 640}}>
              <div style={{marginBottom: 32}}>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  style={{display:'inline-flex', alignItems:'center', gap: 8, color:'var(--ink-60)', fontSize: 14, background:'none', border:'none', padding: 0, cursor:'pointer'}}
                  tabIndex={step === 1 ? 0 : -1}
                >
                  ← Назад
                </button>
              </div>
              <h1 className="display" style={{fontSize:'clamp(30px, 3.6vw, 48px)', fontWeight: 700, letterSpacing:'-0.02em', lineHeight: 1.1, marginBottom: 16}}>
                Как с вами <em className="accent-italic">связаться?</em>
              </h1>
              <p style={{color:'var(--ink-60)', fontSize: 16, lineHeight: 1.5, marginBottom: 28, maxWidth: 520}}>
                Оставьте свои контакты — утвердим меню, нюансы обслуживания и прочие детали мероприятия.
              </p>

              <form onSubmit={handleSubmit} className="cart-form">
                <label>
                  <span className="quote-field__label">Имя</span>
                  <input
                    className="quote-input"
                    type="text" autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться?"
                    tabIndex={step === 1 ? 0 : -1}
                    required
                  />
                </label>
                <label>
                  <span className="quote-field__label">Номер телефона</span>
                  <input
                    className="quote-input"
                    type="tel" autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    tabIndex={step === 1 ? 0 : -1}
                    required
                  />
                </label>
                {/* Honeypot */}
                <input
                  type="text" name="hp_field" tabIndex="-1" autoComplete="off"
                  value={hp} onChange={(e) => setHp(e.target.value)}
                  aria-hidden="true"
                  style={{position:'absolute', left:'-9999px', width: 1, height: 1, opacity: 0}}
                />
                <label className="quote-consent">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    tabIndex={step === 1 ? 0 : -1}
                  />
                  <span className="quote-consent__box">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 6.2L5 8.6L9.8 3.6"/>
                    </svg>
                  </span>
                  <span>Я согласен на <a href={ASSET('/personal-data.html')} target="_blank" rel="noopener" className="policy-link" onClick={(e) => e.stopPropagation()}>обработку персональных данных</a> согласно <a href={ASSET('/privacy-policy.html')} target="_blank" rel="noopener" className="policy-link" onClick={(e) => e.stopPropagation()}>политике конфиденциальности</a></span>
                </label>
                {status === 'error' && (
                  <div style={{fontSize: 13, color: 'var(--tomato)'}}>
                    {errorMsg}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary cart-form__submit"
                  disabled={!canSubmit}
                  tabIndex={step === 1 ? 0 : -1}
                >
                  {status === 'sending' ? 'Отправляем…' : 'Отправить'} {status !== 'sending' && <Icon.Arrow/>}
                </button>
              </form>
            </div>
          </div>

          {/* ---------- STEP 2: SENT ---------- */}
          <div className="cart-stepper__pane" aria-hidden={step !== 2}>
            <div className="wrap" style={{maxWidth: 640}}>
              <div className="cart-sent">
                <div className="cart-sent__icon">
                  <Icon.Check size={36}/>
                </div>
                <h1 className="display" style={{fontSize:'clamp(30px, 3.6vw, 48px)', fontWeight: 700, letterSpacing:'-0.02em', lineHeight: 1.1, marginBottom: 16}}>
                  Спасибо! Мы <em className="accent-italic">уже получили</em> вашу заявку.
                </h1>
                <p style={{color:'var(--ink-60)', fontSize: 16, lineHeight: 1.55, marginBottom: 32, maxWidth: 520}}>
                  Мы свяжемся с вами в ближайшее время, уточним детали и подготовим подходящее решение по меню и формату подачи.
                </p>
                <button
                  type="button"
                  className="btn btn-primary cart-sent__btn"
                  onClick={closeDrawer}
                  tabIndex={step === 2 ? 0 : -1}
                >
                  На главную <Icon.Arrow/>
                </button>
              </div>
            </div>
          </div>
        </div>
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
  const step = item.step || 1;
  const addLabel = 'В корзину';

  const onAdd = (e) => { e.stopPropagation(); cart.add(item, step); };
  const onSub = (e) => { e.stopPropagation(); cart.add(item, -step); };

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

Object.assign(window, { useCart, useHashRoute, FloatingCartButton, FloatingContactBar, CartPage, QtyStepper });
