// Main app — nav + sections

const Nav = ({ isFormatPage = false } = {}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  // На форматных страницах секции "Форматы" и "Расчёт" тоже есть — ссылки локальные
  const logoHref = isFormatPage ? ASSET('/') : '#';

  return (
    <>
      <nav className="nav">
        <div className="nav-inner glass">
          <a href={logoHref} className="logo">
            <img src={ASSET("/images/logo.png")} alt="Gastronom Catering" className="logo-img"/>
            <span className="logo-text">
              <span className="logo-text-main">GASTRONOM</span>
              <span className="logo-text-sub">CATERING</span>
            </span>
          </a>
          <div className="nav-links">
            <a href="#formats">Форматы</a>
            <a href="#menu">Меню</a>
            <a href="#calc">Расчёт</a>
            <a href="#faq">Вопросы</a>
          </div>
          <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
            <a href="tel:+79934185343" className="nav-phone">
              <span className="online-dot"></span>
              +7 (993) 418-53-43
            </a>
            <a href="#cta" className="nav-cta">
              <span className="nav-cta-label">Перезвоните мне!</span>
              <Icon.Arrow size={14}/>
            </a>
            <button className="nav-burger" onClick={() => setMenuOpen(true)} aria-label="Меню">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7"/>
                <line x1="4" y1="12" x2="20" y2="12"/>
                <line x1="4" y1="17" x2="20" y2="17"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={'mobile-menu' + (menuOpen ? ' on' : '')}>
        <button className="close" onClick={close} aria-label="Закрыть">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="5" y1="5" x2="19" y2="19"/>
            <line x1="19" y1="5" x2="5" y2="19"/>
          </svg>
        </button>
        <a href="#formats" onClick={close}>Форматы</a>
        <a href="#menu" onClick={close}>Меню</a>
        <a href="#calc" onClick={close}>Расчёт</a>
        <a href="#faq" onClick={close}>Вопросы</a>
        <div className="cta-row">
          <a href="#cta" onClick={close} className="btn btn-primary" style={{justifyContent: 'center'}}>
            Перезвоните мне! <Icon.Arrow/>
          </a>
          <a href="tel:+79934185343" onClick={close} className="btn" style={{justifyContent: 'center', background: 'rgba(255,255,255,0.1)', color: 'var(--cream-50)', border: '1px solid rgba(255,255,255,0.18)'}}>
            <Icon.Phone size={16}/> +7 (993) 418-53-43
          </a>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const hash = useHashRoute();
  const isCart = hash === '#/cart';
  const [quoteOpen, setQuoteOpen] = React.useState(false);

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    if (isCart) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isCart]);

  React.useEffect(() => {
    window.openQuoteModal = () => setQuoteOpen(true);
    return () => { delete window.openQuoteModal; };
  }, []);

  return (
    <div data-screen-label={isCart ? 'Cart' : 'Landing'}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
      <Nav/>
      <Hero/>
      <StatsBand/>
      <Formats/>
      <Advantages/>
      <QuizCalc/>
      <MenuHighlights/>
      <Process/>
      <FAQ/>
      <FinalCTA/>
      <Footer/>

      <div className={'cart-overlay' + (isCart ? ' cart-overlay--visible' : '')} aria-hidden={!isCart}>
        <CartPage/>
      </div>

      <FloatingCartButton/>
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)}/>}
    </div>
  );
};

const Root = () => {
  // Форматная страница устанавливает window.__FORMAT__ = '<slug>' до загрузки jsx
  if (window.__FORMAT__) return <FormatPage/>;
  return <App/>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root/>);
