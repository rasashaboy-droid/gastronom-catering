// Main app — nav + sections

const Nav = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner glass">
          <a href="#" className="logo">
            <span className="logo-mark"></span>
            Подача
          </a>
          <div className="nav-links">
            <a href="#formats">Форматы</a>
            <a href="#menu">Меню</a>
            <a href="#calc">Расчёт</a>
            <a href="#faq">Вопросы</a>
          </div>
          <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <a href="#cta" className="nav-cta">
              <span className="nav-cta-label">Заказать</span>
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
            Заказать <Icon.Arrow/>
          </a>
          <a href="tel:+78430000000" onClick={close} className="btn" style={{justifyContent: 'center', background: 'rgba(255,255,255,0.1)', color: 'var(--cream-50)', border: '1px solid rgba(255,255,255,0.18)'}}>
            <Icon.Phone size={16}/> +7 843 ...
          </a>
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div data-screen-label="Landing">
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
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
