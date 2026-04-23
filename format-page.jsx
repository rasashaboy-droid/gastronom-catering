// Форматная страница. Рендерится, если установлен window.__FORMAT__ = '<slug>'.

const FormatPage = () => {
  const slug = window.__FORMAT__;
  const data = FORMATS_DATA.find(f => f.slug === slug);
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const hash = useHashRoute();
  const isCart = hash === '#/cart';

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

  if (!data) {
    return (
      <div style={{padding: 80, textAlign: 'center'}}>
        <h1>Формат не найден</h1>
        <p><a href={ASSET("/")}>Вернуться на главную</a></p>
      </div>
    );
  }

  return (
    <div data-screen-label={isCart ? 'Cart' : `Format: ${data.name}`}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
      <Nav isFormatPage={true}/>
      <FormatHero data={data}/>
      <StatsBand/>
      {slug === 'gastroboxes' ? (
        <>
          <MenuHighlights label="01 · Меню"/>
          <Advantages label="02 · Почему мы"/>
          <Process label="03 · Как это работает"/>
          <ConsultCard/>
          <FAQ label="04 · Вопросы"/>
          <QuizCalc/>
          <Formats label="05 · Форматы"/>
        </>
      ) : (
        <>
          <Advantages label="01 · Почему мы"/>
          <Process label="02 · Как это работает"/>
          <ConsultCard/>
          <MenuHighlights label="03 · Меню"/>
          <FAQ label="04 · Вопросы"/>
          <QuizCalc/>
          <Formats label="05 · Форматы"/>
        </>
      )}
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

// Hero формата — формула: "Кейтеринг на <формат> в Казани" + подзаголовок + 2 кнопки + фото
const FormatHero = ({ data }) => {
  return (
    <section style={{ padding: '20px 0 48px', position: 'relative', overflowX: 'clip' }}>
      <div className="wrap" style={{ position: 'relative' }}>
        <Blob color="var(--peach)" size={420} style={{ top: -80, left: -120, opacity: 0.4 }}/>
        <Blob color="var(--coral)" size={360} style={{ top: 200, right: -80, opacity: 0.35 }}/>

        <div className="hero-split" style={{
          display:'grid', gridTemplateColumns:'1.15fr 1fr', gap: 18,
          position:'relative', zIndex: 1,
          alignItems: 'stretch',
        }}>
          {/* Left: white card */}
          <div style={{
            background: 'linear-gradient(325deg, #FFE7E8 0%, #FFFFFF 60%)',
            borderRadius: 'clamp(24px, 3vw, 36px)',
            padding: 'clamp(24px, 3.4vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'clamp(24px, 3vw, 32px)',
            minHeight: 550,
            boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 6px -6px 24px -10px rgba(28,20,15,0.07), -6px 6px 24px -10px rgba(28,20,15,0.07), 0 10px 30px -15px rgba(28,20,15,0.08)',
          }}>
            <div>
              <span className="chip" style={{
                marginBottom: 'clamp(16px, 2.4vw, 24px)',
                background: '#f7ece4',
                backdropFilter: 'blur(12px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(12px) saturate(1.3)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 4px 14px -6px rgba(28,20,15,0.08)',
              }}>
                <LucideIcon name="Medal" size={14} color="var(--tomato)" strokeWidth={2}/>
                В Казани с 2017 года
              </span>
              <h1 className="display hero-title" style={{
                fontFamily: 'Unbounded, sans-serif',
                fontSize: 'clamp(30px, 4vw, 54px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
              }}>
                {data.heroTitle || (<>Кейтеринг на <em className="accent-italic">{data.nameAcc}</em><br/>в Казани</>)}
              </h1>
            </div>

            <p style={{
              fontSize: 'clamp(15px, 1.2vw, 16px)',
              color:'var(--ink-60)',
              maxWidth: 480,
              lineHeight: 1.5,
            }}>
              {data.heroSubtitle || `Расскажите о вашем событии — подберем меню, подачу и формат обслуживания для ${data.nameForYour} с учетом деталей мероприятия и Ваших пожеланий.`}
            </p>
            <div className="hero-cta" style={{display:'flex', gap: 14, flexWrap:'wrap', alignItems:'center'}}>
              <button type="button" onClick={() => window.openQuoteModal && window.openQuoteModal()} className="btn btn-primary hero-cta__primary">{data.primaryCtaText || 'Подобрать меню'}</button>
              <a href="#menu" className="btn btn-glass hero-cta__ghost" style={{background: '#F9F5EB'}}>{data.ghostCtaText || 'Меню'} <Icon.Arrow/></a>
            </div>
          </div>

          {/* Right: photo with halal chip + glass plate (как на главной) */}
          <div className="hero-photo" style={{
            borderRadius: 'clamp(24px, 3vw, 36px)',
            overflow:'hidden',
            position:'relative',
            minHeight: 550,
            background: 'var(--cream-100)',
          }}>
            {data.photo ? (
              <img src={data.photo} alt={data.name} style={{position:'absolute', inset: 0, width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
            ) : (
              <Placeholder label={data.name} variant="peach" style={{width:'100%', height:'100%'}}/>
            )}

            <div style={{
              position:'absolute', top: 'clamp(16px, 1.6vw, 22px)', left: 'clamp(16px, 1.6vw, 22px)',
              display:'inline-flex', alignItems:'center', gap: 8,
              padding: '8px 14px',
              background: 'rgba(255, 249, 241, 0.45)',
              backdropFilter: 'blur(14px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
              border: '1px solid rgba(255, 255, 255, 0.55)',
              borderRadius: 999,
              fontSize: 13, fontWeight: 600,
              boxShadow: '0 1px 0 rgba(255,255,255,0.65) inset, 0 8px 22px -8px rgba(28,20,15,0.18)',
            }}>
              <img src={ASSET("/images/halal.png")} alt="Halal" width="18" height="18" style={{display:'block', objectFit:'contain'}}/>
              Халяль по запросу
            </div>

            <a href={ASSET("/formats/gastroboxes.html")} className="hero-glass-plate" style={{
              position:'absolute', left: 'calc(clamp(24px, 3.4vw, 48px) - 24px)', right: 'calc(clamp(24px, 3.4vw, 48px) - 24px)', bottom: 'calc(clamp(24px, 3.4vw, 48px) - 24px)',
              display:'flex', alignItems:'center', justifyContent:'space-between', gap: 12,
              padding: '13px 10px 13px 20px',
              background: 'rgba(255, 249, 241, 0.55)',
              backdropFilter: 'blur(16px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
              border: '1px solid rgba(255,255,255,0.6)',
              borderRadius: 20,
              color: 'var(--ink)',
              textDecoration: 'none',
              boxShadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 8px 22px -8px rgba(28,20,15,0.18)',
            }}>
              <div style={{minWidth: 0}}>
                <div className="mono" style={{fontSize: 11, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--ink-60)', lineHeight: 1}}>{data.glassPlateKicker || 'Популярно'}</div>
                <div style={{fontSize: 15, fontWeight: 600, marginTop: 4, lineHeight: 1.2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{data.glassPlateTitle || 'Гастробоксы с доставкой'}</div>
              </div>
              <span style={{
                flexShrink: 0,
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--ink)', color: 'var(--cream-50)',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon.Arrow size={16}/>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Небольшая карточка под Process: "Остались вопросы?"
const ConsultCard = () => {
  const [phone, setPhone] = React.useState('');
  const canSubmit = phone.replace(/\D/g, '').length >= 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    // позже: отправка
  };

  return (
    <section style={{padding: '10px 0 40px'}}>
      <div className="wrap">
        <form className="consult-card" onSubmit={handleSubmit}>
          <div className="consult-card__text">
            <h3 className="display" style={{fontFamily:'Unbounded, sans-serif', fontSize:'clamp(22px, 2.2vw, 28px)', fontWeight: 700, letterSpacing:'-0.02em', lineHeight: 1.15, margin: 0}}>
              Остались <em className="accent-italic">вопросы?</em>
            </h3>
            <p style={{marginTop: 10, fontSize: 14, lineHeight: 1.5, color:'var(--ink-60)', maxWidth: 440}}>
              Оставьте номер телефона — обсудим ваши пожелания, ответим на вопросы и сориентируем по стоимости.
            </p>
          </div>
          <div className="consult-card__form">
            <label className="consult-field">
              <span className="quote-field__label">Ваш номер телефона</span>
              <input
                type="tel" autoComplete="tel"
                className="quote-input"
                value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </label>
            <button
              type="submit"
              className="btn btn-primary consult-submit"
              disabled={!canSubmit}
            >
              Получить консультацию <Icon.Arrow/>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

Object.assign(window, { FormatPage, FormatHero, ConsultCard });
