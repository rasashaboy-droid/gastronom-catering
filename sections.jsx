// Major sections of the landing

// ---------- STATS BAND (light airy divider between hero and formats) ----------
const StatsBand = () => {
  const [v1, r1] = useCountUp(9);
  const [v2, r2] = useCountUp(2000);
  const [v3, r3] = useCountUp(90);
  const [v4, r4] = useCountUp(60);

  const stats = [
    { ref: r1, val: v1, unit: '', label: 'лет опыта в кейтеринге' },
    { ref: r2, val: v2.toLocaleString('ru-RU'), unit: '+', label: 'накрытых столов на мероприятиях' },
    { ref: r3, val: v3, unit: '%+', label: 'клиентов по рекомендациям в 2025 г.' },
    { ref: r4, val: v4, unit: '%+', label: 'клиентов обращаются повторно' },
  ];

  return (
    <section aria-label="Цифры" style={{padding: '24px 0 36px'}}>
      <div className="wrap">
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(4, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--ink-08)',
          borderBottom: '1px solid var(--ink-08)',
          padding: '26px 0',
        }}>
          {stats.map((s, i) => (
            <div key={i} ref={s.ref} style={{
              padding: i === 0 ? '0 24px 0 0' : '0 24px',
              borderLeft: i === 0 ? 'none' : '1px solid var(--ink-08)',
              display:'flex', flexDirection:'column', gap: 8,
            }}>
              <div className="display" style={{
                fontSize: 'clamp(34px, 3.6vw, 54px)',
                fontWeight: 600,
                letterSpacing:'-0.03em',
                lineHeight: 0.95,
                color: 'var(--ink)',
              }}>
                {s.val}<span style={{color:'var(--tomato)', fontWeight: 600}}>{s.unit}</span>
              </div>
              <div style={{
                fontSize: 13.5,
                lineHeight: 1.4,
                color:'var(--ink-60)',
                fontWeight: 500,
                maxWidth: 220,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 820px) {
            section[aria-label="Цифры"] .wrap > div {
              grid-template-columns: repeat(2, 1fr) !important;
              row-gap: 24px !important;
            }
            section[aria-label="Цифры"] .wrap > div > div:nth-child(3) {
              border-left: none !important;
              padding-left: 0 !important;
            }
          }
          @media (max-width: 520px) {
            section[aria-label="Цифры"] .wrap > div {
              grid-template-columns: repeat(2, 1fr) !important;
              row-gap: 22px !important;
              column-gap: 18px !important;
              padding: 20px 0 !important;
            }
            section[aria-label="Цифры"] .wrap > div > div {
              border-left: none !important;
              padding: 0 !important;
            }
            section[aria-label="Цифры"] .wrap > div > div:nth-child(odd) {
              padding-right: 12px !important;
              border-right: 1px solid var(--ink-08);
            }
          }
        `}</style>
      </div>
    </section>
  );
};


// ---------- FORMATS (pill-list + hover image) ----------
const Formats = ({ label = '01 · Форматы' } = {}) => {
  // 10 formats. Each has a pill color and a paired image placeholder.
  const formats = [
    { title: 'Гастробоксы',          sub: 'от 600 ₽/чел',   color: 'var(--peach)',      icon: 'Package',         iconColor: 'var(--tomato)',  img: 'боксы с подачей',          imgVariant: 'peach', photo: ASSET('/images/optimized/s1-1200.jpg'), href: ASSET('/formats/gastroboxes.html') },
    { title: 'Фуршет',               sub: 'от 900 ₽/чел',   color: 'var(--cream-100)',  icon: 'Martini',         iconColor: 'var(--coral)',   img: 'канапе и фуршетные столы', imgVariant: 'peach', photo: ASSET('/images/optimized/s2-1200.jpg'), href: ASSET('/formats/furshet.html') },
    { title: 'Банкет',               sub: 'от 2 400 ₽/чел', color: 'var(--cream-200)',  icon: 'UtensilsCrossed', iconColor: 'var(--tomato)',  img: 'сервированный банкетный зал', imgVariant: 'cream', photo: ASSET('/images/optimized/s3-1200.jpg'), href: ASSET('/formats/banket.html') },
    { title: 'Детский праздник',     sub: 'от 700 ₽/чел',   color: 'var(--peach)',      icon: 'PartyPopper',     iconColor: 'var(--raspberry)',  img: 'детские десерты',          imgVariant: 'cream', photo: ASSET('/images/optimized/s4-1200.jpg'), href: ASSET('/formats/detskiy-prazdnik.html') },
    { title: 'Свадьба',              sub: 'под ключ',       color: 'var(--peach)',      icon: 'HeartHandshake',  iconColor: 'var(--raspberry)',  img: 'свадебная подача',         imgVariant: 'peach', photo: ASSET('/images/optimized/s5-1200.jpg'), href: ASSET('/formats/svadba.html') },
    { title: 'Корпоратив',           sub: 'от 1 200 ₽/чел', color: 'var(--cream-300)',  icon: 'Briefcase',       iconColor: 'var(--tomato)',     img: 'офисный кейтеринг',        imgVariant: 'peach', photo: ASSET('/images/optimized/s6-1200.jpg'), href: ASSET('/formats/korporativ.html') },
    { title: 'Выпускной',            sub: 'от 1 500 ₽/чел', color: 'var(--cream-100)',  icon: 'GraduationCap',   iconColor: 'var(--coral)',   img: 'выпускной вечер',          imgVariant: 'cream', photo: ASSET('/images/optimized/s7-1200.jpg'), href: ASSET('/formats/vypusknoy.html') },
    { title: 'День рождения',        sub: 'от 800 ₽/чел',   color: 'var(--cream-200)',  icon: 'Cake',            iconColor: 'var(--coral)', img: 'стол ко дню рождения',     imgVariant: 'cream', photo: ASSET('/images/optimized/s8-1200.jpg'), href: ASSET('/formats/den-rozhdeniya.html') },
    { title: 'Девичник / Мальчишник',sub: 'от 1 000 ₽/чел', color: 'var(--cream-200)',  icon: 'Wine',            iconColor: 'var(--coral)',   img: 'бокалы и закуски',         imgVariant: 'peach', photo: ASSET('/images/optimized/s9-1200.jpg'), href: ASSET('/formats/devichnik-malchishnik.html') },
  ];

  // active = индекс с подсветкой пилюли и показом фото (null — ничего не подсвечено)
  // shownIdx = индекс фото, которое сейчас видно (фото остаётся показанным даже если пилюля больше не подсвечена)
  const [active, setActive] = React.useState(null);
  const shownIdx = active != null ? active : 0;

  return (
    <section style={{padding: '60px 0 30px'}} id="formats">
      <div className="wrap">
        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom: 32, gap: 20, flexWrap: 'wrap'}}>
          <div>
            <SecLabel>{label}</SecLabel>
            <h2 className="display" style={{fontFamily:'Unbounded, sans-serif', fontSize:'clamp(34px, 4.2vw, 60px)', fontWeight: 600, marginTop: 14, maxWidth: 720, letterSpacing:'-0.02em'}}>
              Кейтеринг <em className="accent-italic">на любой</em> случай
            </h2>
          </div>
          <p style={{maxWidth: 340, color:'var(--ink-60)', fontSize: 15}}>
            Сохраняем высокий уровень на заказах любого масштаба — от доставки боксов до крупных банкетов.
          </p>
        </div>

        <div className="formats-split" style={{
          display:'grid',
          gridTemplateColumns:'1.15fr 1fr',
          gap: 24,
          alignItems:'stretch',
        }}>
          {/* LEFT: pill list + compact footer */}
          <div style={{display:'flex', flexDirection:'column', gap: 14}}>
            <div className="formats-pills" style={{
              display:'flex', flexWrap:'wrap',
              gap: 10,
            }}>
              {formats.map((f, i) => (
                <FormatPill
                  key={f.title}
                  f={f}
                  active={active === i}
                  onEnter={() => { if (window.innerWidth > 900) setActive(i); }}
                />
              ))}
            </div>

            {/* "Не нашли свой формат" — compact footer pill */}
            <div className="formats-nf" style={{
              marginTop: 'auto',
              padding: '14px 18px',
              borderRadius: 999,
              background: 'white',
              color: 'var(--ink)',
              border: '1px solid var(--ink-08)',
              display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{display:'flex', alignItems:'center', gap: 12}}>
                <div style={{width: 34, height: 34, borderRadius:'50%', background:'var(--tomato)', color:'var(--cream-50)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
                  <LucideIcon name="HelpCircle" size={18} color="currentColor" strokeWidth={2}/>
                </div>
                <div className="display" style={{fontFamily:'Unbounded, sans-serif', fontSize: 15, fontWeight: 500, letterSpacing:'-0.01em'}}>
                  Не нашли свой формат?
                </div>
              </div>
              <a href="#cta" className="btn" style={{background:'rgb(26, 10, 15)', color:'#fff', padding: '10px 18px', fontSize: 13}}>
                Подобрать решение <Icon.Arrow size={13}/>
              </a>
            </div>
          </div>

          {/* RIGHT: image that changes on hover */}
          <div style={{
            position:'relative',
            borderRadius: 28,
            overflow:'hidden',
            minHeight: 400,
            background: 'var(--cream-100)',
          }}>
            {formats.map((f, i) => (
              <a
                key={f.title}
                href={f.href}
                className="formats-slide"
                aria-label={`Подробнее: ${f.title}`}
                style={{
                  position:'absolute', inset: 0,
                  display:'block',
                  opacity: shownIdx === i ? 1 : 0,
                  transform: shownIdx === i ? 'scale(1)' : 'scale(1.04)',
                  transition: 'opacity .45s ease, transform .8s ease',
                  pointerEvents: shownIdx === i ? 'auto' : 'none',
                  overflow: 'hidden',
                }}
              >
                {f.photo ? (
                  <img src={f.photo} alt={f.title} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
                ) : (
                  <Placeholder
                    label={f.img}
                    variant={f.imgVariant || 'peach'}
                    style={{width:'100%', height:'100%'}}
                  />
                )}
                <div style={{
                  position:'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(28,20,15,0.55))',
                }}/>
              </a>
            ))}

            {/* active caption overlay (bottom-left) — декоративный, клики проходят к ссылке */}
            <div style={{
              position:'absolute', left: 22, bottom: 22, right: 22,
              display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 16,
              color:'white', zIndex: 1,
              pointerEvents: 'none',
            }}>
              <div>
                {formats[shownIdx].tag && (
                  <span className="chip" style={{
                    background: 'rgba(255,249,241,0.95)', color: 'var(--ink)',
                    fontSize: 10, padding: '5px 9px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600,
                    marginBottom: 10,
                  }}>
                    <span className="chip-dot" style={{background:'var(--tomato)'}}></span>
                    {formats[shownIdx].tag}
                  </span>
                )}
                <div className="display" style={{fontFamily:'Unbounded, sans-serif', fontSize: 'clamp(26px, 2.6vw, 36px)', fontWeight: 600, letterSpacing:'-0.02em', lineHeight: 1.05, marginTop: 8}}>
                  {formats[shownIdx].title}
                </div>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius:'50%',
                background:'var(--cream-50)', color:'var(--ink)',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink: 0,
              }}>
                <Icon.Arrow size={16}/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const FormatPill = ({ f, active, onEnter }) => {
  return (
    <a
      href={f.href}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      style={{
        textDecoration: 'none',
        border: '1px solid ' + (active ? 'transparent' : 'var(--ink-08)'),
        borderRadius: 999,
        padding: '20px 30px 20px 22px',
        background: active ? f.color : 'white',
        color: 'var(--ink)',
        fontFamily: 'inherit',
        fontSize: 18,
        fontWeight: 500,
        letterSpacing:'-0.005em',
        cursor:'pointer',
        display:'inline-flex',
        alignItems:'center',
        gap: 12,
        transition: 'background .2s ease, border-color .2s ease, transform .2s ease, box-shadow .2s ease',
        transform: active ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: active ? '0 8px 20px -10px rgba(28,20,15,0.18)' : '0 2px 6px -2px rgba(28,20,15,0.06), 0 1px 2px rgba(28,20,15,0.03)',
        whiteSpace:'nowrap',
      }}
    >
      <span style={{
        display:'inline-flex', alignItems:'center', justifyContent:'center',
        flexShrink: 0,
      }}>
        <LucideIcon name={f.icon} color={f.iconColor || 'var(--tomato)'} size={20} strokeWidth={2} glow/>
      </span>
      <span>{f.title}</span>
      {f.tag && (
        <span style={{
          fontSize: 9.5,
          padding: '3px 7px',
          borderRadius: 999,
          background: 'var(--ink)',
          color: 'var(--cream-50)',
          textTransform:'uppercase',
          letterSpacing:'0.12em',
          fontWeight: 600,
        }}>
          {f.tag}
        </span>
      )}
    </a>
  );
};


// ---------- QUIZ CALCULATOR ----------
const QuizCalc = () => {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({ event: null, people: 50, budget: null });
  const [phone, setPhone] = React.useState('');
  const [agree, setAgree] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const steps = [
    {
      q: 'Какое у вас мероприятие?',
      k: 'event',
      opts: [
        { v: 'bday', label: 'День рождения', icon: 'Cake' },
        { v: 'wedding', label: 'Свадьба', icon: 'HeartHandshake' },
        { v: 'banket', label: 'Банкет', icon: 'UtensilsCrossed' },
        { v: 'corporate', label: 'Корпоратив', icon: 'Briefcase' },
        { v: 'party', label: 'Вечеринка', icon: 'PartyPopper' },
        { v: 'other', label: 'Другое', icon: 'Sparkles' },
      ],
    },
    {
      q: 'Сколько будет гостей?',
      k: 'people',
      slider: { min: 5, max: 300, step: 5 },
    },
    {
      q: 'Желаемый бюджет на персону',
      k: 'budget',
      opts: [
        { v: '600-1000', label: '600 – 1 000 ₽' },
        { v: '1000-1300', label: '1 000 – 1 300 ₽' },
        { v: '1300-1500', label: '1 300 – 1 500 ₽' },
        { v: 'custom', label: 'Свой вариант' },
      ],
    },
  ];

  const cur = steps[step];
  const setAns = (k, v) => setAnswers(a => ({ ...a, [k]: v }));
  const canProceed = answers[cur?.k] != null;
  const done = step >= steps.length;

  return (
    <section id="calc" style={{padding: '80px 0'}}>
      <div className="wrap">
        <div className="calc-shell" style={{
          position:'relative',
          borderRadius: 36,
          padding: 'clamp(28px, 4vw, 56px)',
          background: `linear-gradient(150deg, var(--raspberry-soft) 0%, var(--raspberry) 100%)`,
          overflow:'hidden',
          color: 'white',
          boxShadow: '0 30px 60px -30px rgba(233,30,76,0.5)',
        }}>
          {/* Glossy */}
          <div style={{position:'absolute', top:0, left:0, right:0, height:'55%', background:'linear-gradient(180deg, rgba(255,255,255,0.22), transparent)', pointerEvents:'none'}}/>
          {/* Decorative */}
          <div style={{position:'absolute', right: -100, top: -100, width: 360, height: 360, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,235,105,0.55), transparent 70%)', pointerEvents:'none'}}/>

          <div className="calc-split" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 40, position:'relative', zIndex: 1}}>
            {/* Left: title */}
            <div>
              <span className="chip" style={{background:'rgba(255,255,255,0.2)', color:'white', border:'1px solid rgba(255,255,255,0.3)', backdropFilter:'blur(8px)'}}>
                <span className="chip-dot" style={{background:'white'}}></span>
                Калькулятор · 30 сек
              </span>
              <h2 className="display" style={{fontSize:'clamp(40px, 5vw, 68px)', fontWeight: 800, marginTop: 20, marginBottom: 32, letterSpacing:'-0.03em'}}>
                Ответьте на <em className="accent-italic" style={{color:'white', fontWeight: 500}}>3 вопроса</em> —<br/>
                рассчитаем стоимость
              </h2>

              {/* Progress */}
              <div style={{display:'flex', gap: 8, marginBottom: 20}}>
                {steps.map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: 4, borderRadius: 2,
                    background: i <= step ? 'white' : 'rgba(255,255,255,0.3)',
                    transition: 'background .3s',
                  }}/>
                ))}
              </div>
              <div style={{fontSize: 13, opacity: 0.85, fontFamily:'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase'}}>
                {done ? (submitted ? 'Готово' : 'Контакты') : `Шаг ${step + 1} из ${steps.length}`}
              </div>
            </div>

            {/* Right: glass card with current step */}
            <div className="glass" style={{
              borderRadius: 28,
              padding: 28,
              background: '#FFEAD9',
              color: 'var(--ink)',
              minHeight: 420,
              display:'flex', flexDirection:'column',
              border: '1px solid rgba(255,255,255,0.8)',
            }}>
              {!done ? (
                <>
                  <div style={{fontSize: 13, color:'var(--ink-60)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom: 10, fontFamily:'JetBrains Mono, monospace'}}>
                    Вопрос {step + 1}
                  </div>
                  <h3 className="display" style={{fontSize: 28, fontWeight: 600, marginBottom: 24, letterSpacing:'-0.02em'}}>
                    {cur.q}
                  </h3>

                  {cur.opts && (
                    <div className="calc-opts" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10}}>
                      {cur.opts.map(o => {
                        const active = answers[cur.k] === o.v;
                        return (
                          <button key={o.v}
                            onClick={() => setAns(cur.k, o.v)}
                            style={{
                              textAlign:'left',
                              padding: '16px 16px',
                              borderRadius: 18,
                              border: active ? '2px solid var(--tomato)' : '2px solid var(--ink-08)',
                              background: active ? 'rgba(255,55,55,0.06)' : 'white',
                              transition: 'all .2s',
                            }}
                          >
                            <div style={{display:'flex', alignItems:'center', gap: 10, fontWeight: 600, fontSize: 15}}>
                              {o.icon && <LucideIcon name={o.icon} color="var(--tomato)" size={18} strokeWidth={2}/>}
                              <span>{o.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {cur.slider && (
                    <div style={{marginTop: 8}}>
                      <div className="display" style={{fontSize: 72, fontWeight: 700, color:'var(--tomato)', lineHeight: 1, letterSpacing:'-0.03em', display:'flex', alignItems:'baseline', flexWrap:'wrap'}}>
                        <label className="calc-people-label" style={{
                          display:'inline-flex', alignItems:'center',
                          background:'var(--cream-50)',
                          border:'1px solid var(--ink-08)',
                          borderRadius: 18,
                          padding: '6px 18px',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px -4px rgba(28,20,15,0.08)',
                          cursor: 'text',
                        }}>
                          <input type="text" inputMode="numeric" pattern="[0-9]*"
                            value={answers.people}
                            onChange={e => { const v = e.target.value.replace(/\D/g, ''); setAns('people', Math.max(2, Math.min(1000, +v || 2))); }}
                            style={{
                              fontFamily: 'Unbounded, sans-serif',
                              fontSize: 72, fontWeight: 700, color:'var(--tomato)', lineHeight: 1, letterSpacing:'-0.03em',
                              width: `${String(answers.people).length}ch`,
                              padding: 0, margin: 0, border: 'none', outline: 'none', background: 'transparent',
                              verticalAlign: 'baseline',
                              textAlign: 'center',
                            }}
                          />
                          <span className="calc-caret" aria-hidden="true"/>
                        </label>
                        <span style={{fontSize: 24, color:'var(--ink-60)', fontWeight: 500, marginLeft: 12}}>гостей</span>
                      </div>
                      <input type="range"
                        min={cur.slider.min} max={cur.slider.max} step={cur.slider.step}
                        value={Math.max(cur.slider.min, Math.min(cur.slider.max, answers.people))}
                        onChange={e => setAns('people', +e.target.value)}
                        style={{width:'100%', marginTop: 20, accentColor:'var(--tomato)'}}
                      />
                      <div style={{display:'flex', justifyContent:'space-between', fontSize: 12, color:'var(--ink-60)', fontFamily:'JetBrains Mono, monospace', marginTop: 8}}>
                        <span>{cur.slider.min}</span>
                        <span>{cur.slider.max}+</span>
                      </div>
                    </div>
                  )}

                  <div style={{marginTop:'auto', display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop: 20}}>
                    <button
                      onClick={() => setStep(s => Math.max(0, s - 1))}
                      disabled={step === 0}
                      style={{
                        padding: '10px 18px', borderRadius: 999,
                        color: 'var(--ink-60)', fontWeight: 500, fontSize: 14,
                        opacity: step === 0 ? 0.3 : 1,
                        cursor: step === 0 ? 'default' : 'pointer',
                      }}
                    >
                      ← Назад
                    </button>
                    <button
                      onClick={() => canProceed && setStep(s => s + 1)}
                      disabled={!canProceed}
                      className="btn btn-primary"
                      style={{ opacity: canProceed ? 1 : 0.5, cursor: canProceed ? 'pointer' : 'default' }}
                    >
                      {step === steps.length - 1 ? 'Далее' : 'Далее'}
                      <Icon.Arrow/>
                    </button>
                  </div>
                </>
              ) : submitted ? (
                <ThankYouPane/>
              ) : (
                <LeadFormPane
                  phone={phone} setPhone={setPhone}
                  agree={agree} setAgree={setAgree}
                  onSubmit={() => { if (phone && agree) setSubmitted(true); }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadFormPane = ({ phone, setPhone, agree, setAgree, onSubmit }) => {
  const valid = phone.replace(/\D/g, '').length >= 10 && agree;
  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <h3 className="display" style={{fontSize: 25, fontWeight: 600, letterSpacing:'-0.02em', lineHeight: 1.15}}>
        Получите расчёт стоимости по вашему мероприятию
      </h3>
      <p style={{color:'var(--ink-60)', fontSize: 14, lineHeight: 1.5, marginTop: 12, marginBottom: 20}}>
        Оставьте номер телефона — подготовим предложение и рассчитаем стоимость с учётом количества гостей, бюджета и ваших пожеланий.
      </p>

      <label style={{fontSize: 12, color:'var(--ink-60)', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'JetBrains Mono, monospace', marginBottom: 6}}>
        Ваш номер телефона
      </label>
      <input
        type="tel"
        placeholder="+7 ___ ___ __ __"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        style={{
          padding: '14px 16px', borderRadius: 14,
          border: '1.5px solid var(--ink-15)', background:'white',
          fontSize: 16, fontFamily: 'inherit',
          marginBottom: 16,
        }}
      />

      <button
        onClick={onSubmit}
        disabled={!valid}
        className="btn btn-primary"
        style={{ justifyContent:'center', opacity: valid ? 1 : 0.5, cursor: valid ? 'pointer' : 'default' }}
      >
        Получить предложение <Icon.Arrow/>
      </button>

      <label style={{display:'flex', alignItems:'flex-start', gap: 10, marginTop: 14, fontSize: 12, lineHeight: 1.45, color:'var(--ink-60)', cursor:'pointer'}}>
        <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}
          style={{marginTop: 2, accentColor:'var(--tomato)', flexShrink: 0, width: 16, height: 16}}/>
        <span>Я согласен на обработку персональных данных согласно <a href="#" className="policy-link" onClick={(e) => e.stopPropagation()}>политике конфиденциальности</a></span>
      </label>
    </div>
  );
};

const ThankYouPane = () => (
  <div style={{display:'flex', flexDirection:'column', height:'100%', justifyContent:'center', alignItems:'flex-start', gap: 16}}>
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      background: 'var(--tomato)', color: 'white',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      <Icon.Check size={28}/>
    </div>
    <h3 className="display" style={{fontSize: 36, fontWeight: 700, letterSpacing:'-0.02em'}}>
      Спасибо!
    </h3>
    <p style={{color:'var(--ink-60)', fontSize: 15, lineHeight: 1.5, maxWidth: 420}}>
      Скоро свяжемся с вами, чтобы уточнить детали и предложить подходящий формат, меню и стоимость.
    </p>
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div style={{padding: '12px 14px', background:'white', borderRadius: 14, border: '1px solid var(--ink-08)'}}>
    <div style={{fontSize: 11, color:'var(--ink-60)', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'JetBrains Mono, monospace'}}>{label}</div>
    <div style={{fontSize: 15, fontWeight: 600, marginTop: 2}}>{value}</div>
  </div>
);


// ---------- MENU HIGHLIGHTS ----------
const MenuHighlights = ({ label = '03 · Меню' } = {}) => {
  const [cat, setCat] = React.useState(() => (window.PageState && window.PageState.menuCategory) || 'canape');
  React.useEffect(() => { window.PageState.menuCategory = cat; }, [cat]);
  const cats = [
    { v: 'canape', label: 'Канапе' },
    { v: 'bruschetta', label: 'Брускетты' },
    { v: 'cold', label: 'Холодные закуски' },
    { v: 'hot', label: 'Горячее' },
    { v: 'salad', label: 'Салаты' },
    { v: 'dessert', label: 'Десерты' },
    { v: 'drinks', label: 'Напитки' },
  ];
  const items = {
    canape: [
      { name: 'Канапе «Моцарелла и черри»', price: 110, weight: '30 г', desc: 'Моцарелла, томаты, соус песто.', photo: ASSET('/images/Канапе черри моцарелла.jpeg'), step: 10 },
      { name: 'Канапе «Старорусское»', price: 90, weight: '30 г', desc: 'Филе сельди с луком на бородинском хлебе.', photo: ASSET('/images/Канапе старорусское.jpeg'), step: 10 },
      { name: 'Канапе «Тигровая креветка с черри»', price: 135, weight: '30 г', desc: 'Тигровая креветка, томаты черри, соус «азиатский».', photo: ASSET('/images/Канапе тигровая креветка с черри.jpeg'), step: 10 },
      { name: 'Канапе «Тигровая креветка в панировке»', price: 135, weight: '40 г', desc: 'Тигровая креветка в панировке, соус спайс.', photo: ASSET('/images/Канапе тигровая креветка в панировке.jpeg'), step: 10 },
      { name: 'Канапе «Ростбиф с горчичным соусом»', price: 150, weight: '30 г', desc: 'Ростбиф медиум, медово-горчичный соус, корнишон.', photo: ASSET('/images/Канапе с ростбифом.jpeg'), step: 10 },
      { name: 'Канапе «Казылык с вяленым томатом»', price: 155, weight: '30 г', desc: 'Казылык, вяленый томат.', photo: ASSET('/images/Канапе с казылыком.jpeg'), step: 10 },
      { name: 'Канапе «Красная икра на сендвичном хлебе»', price: 170, weight: '40 г', desc: 'Хлеб сендвичный, красная икра, масло сливочное.', photo: ASSET('/images/Канапе с красной икрой.png'), step: 10 },
      { name: 'Канапе «Фрукты в шоколаде»', price: 155, weight: '50 г', desc: 'Клубника, мандарин, банан, шоколад.', photo: ASSET('/images/Канапе фрукты в шоколаде.png'), step: 10 },
      { name: 'Канапе «Сыр и виноград»', price: 75, weight: '30 г', desc: 'Виноград, сыр, грецкий орех.', photo: ASSET('/images/Канапе сыр виноград.png'), step: 10 },
    ],
    bruschetta: [
      { name: 'Брускетта с черри, песто, моцарелла', price: 170, weight: '40 г', desc: 'Чиабатта, томаты черри, соус песто, сыр моцарелла.', photo: ASSET('/images/Брускетта черри песто моцарелла.jpeg'), step: 5 },
      { name: 'Брускетта с подкопченной индейкой', price: 170, weight: '40 г', desc: 'Чиабатта, томаты черри, лист салата.', photo: ASSET('/images/Брускетта с подкопченной индейкой.jpeg'), step: 5 },
      { name: 'Брускетта с ростбифом и горчичным соусом', price: 170, weight: '40 г', desc: 'Чиабатта, ростбиф медиум, томаты черри, соус из зернистой горчицы.', photo: ASSET('/images/Брускетта с ростбифом.jpeg'), step: 5 },
      { name: 'Брускетта с лососем слабосолёным', price: 180, weight: '40 г', desc: 'Чиабатта, лосось слабосолёный, сливочный сыр, авокадо.', photo: ASSET('/images/Брускетта с лососем слабосоленым.jpeg'), step: 5 },
      { name: 'Брускетта с тар-таром из лосося', price: 180, weight: '50 г', desc: 'Чиабатта, лосось с/с, огурцы свежие, сыр сливочный, яйцо перепелиное, имитация чёрной икры.', photo: ASSET('/images/Брускетта с тар-таром из слабосоленого лосося.jpeg'), step: 5 },
      { name: 'Брускетта с тигровой креветкой и салатом чука', price: 170, weight: '40 г', desc: 'Чиабатта, тигровая креветка, салат чука, соус азиатский, кунжут.', photo: ASSET('/images/Брускетта с тигровой креветкой и салатом чука.jpeg'), step: 5 },
      { name: 'Брускетта с сыром дор блю и грушей', price: 180, weight: '40 г', desc: 'Чиабатта, сыр дор блю, груши, мёд, орехи.', photo: ASSET('/images/Брускетта с сыром дор блю и с грушей.jpeg'), step: 5 },
      { name: 'Брускетта овощи гриль с мягким сыром', price: 170, weight: '40 г', desc: 'Чиабатта, мягкий сыр, печёные овощи, зелень.', photo: ASSET('/images/Брускетта овощи гриль.jpeg'), step: 5 },
    ],
    cold: [
      { name: 'Мясное ассорти', price: 1050, weight: '375 г', desc: 'Говядина европейская, сырокопчёные деликатесы, буженина из индейки, казылык.', photo: ASSET('/images/Мясное ассорти.png') },
      { name: 'Мясное ассорти «Татарстан»', price: 1300, weight: '300 г', desc: 'Язык говяжий, филе утиной грудки сыровяленое, казылык.', photo: ASSET('/images/Ассорти татарстан.png') },
      { name: 'Мясное ассорти «Фермерский»', price: 1500, weight: '340 г', desc: 'Язык говяжий, куриный рулет, ростбиф, казы.', photo: ASSET('/images/Ассорти фермерский.png') },
      { name: 'Сырное плато', price: 820, weight: '260 г', desc: '3–4 вида сыра, орехи, мёд.', photo: ASSET('/images/Сырное плато.png') },
      { name: 'Рыбное плато', price: 950, weight: '220 г', desc: 'Сёмга слабосолёная, масляная х/к, кальмар г/к, морепродукты.', photo: ASSET('/images/Рыбное плато.png') },
      { name: 'Средиземноморская закуска', price: 1400, weight: '310 г', desc: 'Сёмга с/с, тунец с/с, креветки тигровые, лайм, маслины, зелень.', photo: ASSET('/images/Средиземноморская закуска.png') },
      { name: 'Овощное ассорти', price: 650, weight: '510 г', desc: 'Огурцы, томаты, перец, редис, морковь, зелень.', photo: ASSET('/images/Овощное ассорти.png') },
      { name: 'Ассорти из солений', price: 550, weight: '460 г', desc: 'Огурцы малосольные, томаты черри, капуста квашеная, морковь по-корейски.', photo: ASSET('/images/Асорти из солений.png') },
      { name: 'Фруктовое ассорти', price: 1850, weight: '1500 г', desc: 'Сезонные фрукты.', photo: ASSET('/images/Плато фруктовый микс.jpeg') },
      { name: 'Закуска «Старорусская»', price: 520, weight: '360 г', desc: 'Филе сельди, запечённый картофель бэби, лук маринованный.', photo: ASSET('/images/Закуска старорусская .png') },
      { name: 'Капрезе', price: 1150, weight: '400 г', desc: 'Сыр моцарелла, томаты, соус песто.', photo: ASSET('/images/Капрезе.png') },
      { name: '«Татарское трио» на 8–10 человек', price: 3300, weight: '2150 г', desc: 'Отварное мясо конины, курицы, говядины; картофель отварной; пассированный лук и морковь на сливочном масле.', photo: ASSET('/images/Татарское трио.png') },
      { name: 'Ассорти фермера в стол на 10–12 человек', price: 6300, weight: '2000 г', desc: 'Шашлычки из говядины, куриного филе, свиной шеи; люля-кебаб из баранины; картофель запечённый, овощи гриль, соус томатный.', photo: ASSET('/images/Ассорти фермера в стол.png') },
    ],
    hot: [
      { name: 'Томлёная телятина', price: 560, weight: '180 г', desc: 'Телячья щека 8 часов в красном вине, пюре из корня сельдерея, демиглас, жареный лук-шалот.' },
      { name: 'Лосось на гриле', price: 640, tag: 'хит', weight: '160 г', desc: 'Филе лосося, соус бёрр-блан, спаржа гриль, лимон, укропное масло.' },
      { name: 'Утиная грудка · апельсин', price: 590, weight: '170 г', desc: 'Грудка утки medium, апельсиновый жю, пюре из батата, свекольные чипсы.' },
      { name: 'Ризотто с белыми грибами', price: 420, tag: 'veg', weight: '220 г', desc: 'Арборио, белые грибы, пармезан 24 мес, трюфельное масло, петрушка.' },
      { name: 'Стейк мираторг · картофель', price: 780, weight: '200 г', desc: 'Стейк Рибай Black Angus, картофель бейби на углях, розмарин, соус BBQ домашний.' },
      { name: 'Треска · цветная капуста', price: 480, weight: '160 г', desc: 'Филе трески су-вид, пюре из цветной капусты, капуста романеско, соус на белом вине.' },
    ],
    salad: [
      { name: 'Цезарь с креветкой', price: 380, weight: '220 г', desc: 'Микс-салат, тигровые креветки, черри, гренки из чиабатты, пармезан, классический соус цезарь.' },
      { name: 'Руккола · груша · пармезан', price: 340, tag: 'veg', weight: '200 г', desc: 'Руккола, груша конференс, пармезан хлопьями, кедровый орех, бальзамический крем.' },
      { name: 'Тёплый салат с уткой', price: 420, weight: '210 г', desc: 'Копчёная утиная грудка, микс-салат, печёная свёкла, апельсин, малиновый соус.' },
      { name: 'Оливье премиум', price: 360, weight: '220 г', desc: 'Телячий язык, перепелиные яйца, корнишоны, картофель, домашний майонез, чёрная икра.' },
    ],
    dessert: [
      { name: 'Павлова с ягодами', price: 240, tag: 'хит', weight: '90 г', desc: 'Безе, крем маскарпоне с ванилью, свежая клубника, малина, голубика, мятный сироп.' },
      { name: 'Трюфели ручной работы', price: 180, weight: '3 шт', desc: 'Шоколад 70%, сливки, ассорти: фундук, какао, малина. Ручная работа.' },
      { name: 'Чизкейк нью-йорк', price: 220, weight: '110 г', desc: 'Классический чизкейк на песочной основе, сливочный сыр, ягодный кули.' },
      { name: 'Эклеры ассорти · 3 шт', price: 260, weight: '3 шт', desc: 'Ваниль, фисташка, шоколад. Заварное тесто, крем на сливочном масле.' },
    ],
    drinks: [
      { name: 'Домашний лимонад', price: 180, weight: '300 мл', desc: 'На выбор: облепиха-имбирь, малина-базилик, тархун-лайм. Без сахара, на стевии по запросу.' },
      { name: 'Вино Rioja, 150мл', price: 420, weight: '150 мл', desc: 'Испания, Rioja Reserva 2019, темпранильо. Ноты вишни, ванили и табака.' },
      { name: 'Свежий сок апельсин', price: 220, weight: '250 мл', desc: 'Фреш из сицилийского апельсина, отжим в день мероприятия.' },
      { name: 'Чайная станция', price: 80, tag: 'на гостя', weight: 'станция', desc: 'Ассорти чаёв: эрл грей, зелёный жасмин, ройбуш, травяные сборы. Термосы, чашки, мёд, лимон.' },
    ],
  };
  const list = items[cat];
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [selected]);

  return (
    <section id="menu" style={{padding: '80px 0'}}>
      <div className="wrap">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 20, flexWrap:'wrap', marginBottom: 36}}>
          <div>
            <SecLabel>{label}</SecLabel>
            <h2 className="display" style={{fontSize:'clamp(40px, 5vw, 72px)', fontWeight: 600, marginTop: 16}}>
              120+ позиций<br/>
              <em className="accent-italic">собственной кухни</em>
            </h2>
          </div>
          <div style={{display:'flex', gap: 6, flexWrap:'wrap'}}>
            {cats.map(c => (
              <button key={c.v} onClick={() => setCat(c.v)}
                style={{
                  padding: '10px 18px', borderRadius: 999,
                  background: cat === c.v ? 'var(--ink)' : 'transparent',
                  color: cat === c.v ? 'var(--cream-50)' : 'var(--ink)',
                  border: `1.5px solid ${cat === c.v ? 'var(--ink)' : 'var(--ink-15)'}`,
                  fontWeight: 500, fontSize: 14, transition: 'all .2s',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid" style={{
          display:'grid',
          gridTemplateColumns:'repeat(3, 1fr)',
          gap: 16,
        }}>
          {list.map((it, i) => (
            <MenuCard key={cat + i} item={it} delay={i * 60} onClick={() => setSelected(it)}/>
          ))}
          <MenuAllCard delay={list.length * 60}/>
        </div>
      </div>
      {selected && <MenuDrawer item={selected} onClose={() => setSelected(null)}/>}
    </section>
  );
};

const MenuDrawer = ({ item, onClose }) => {
  const [closing, setClosing] = React.useState(false);
  const requestClose = React.useCallback(() => setClosing(true), []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') requestClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [requestClose]);

  const handleAnimEnd = (e) => {
    if (closing && e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <div
        className={'menu-drawer-backdrop' + (closing ? ' closing' : '')}
        onClick={requestClose}
      />
      <aside
        className={'menu-drawer' + (closing ? ' closing' : '')}
        role="dialog" aria-modal="true" aria-label={item.name}
        onAnimationEnd={handleAnimEnd}
      >
        <div className="menu-drawer__head">
          <h3 className="display" style={{fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 700, lineHeight: 1.2, margin: 0}}>
            {item.name}
          </h3>
          <button className="menu-drawer__close" onClick={requestClose} aria-label="Закрыть">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 3L13 13M13 3L3 13"/>
            </svg>
          </button>
        </div>
        <div className="menu-drawer__body">
          <div style={{
            position:'relative',
            borderRadius: 20,
            overflow:'hidden',
            aspectRatio: '4 / 3',
            marginBottom: 20,
          }}>
            {item.photo ? (
              <OptImg photo={item.photo} alt={item.name} sizes="(max-width: 720px) 100vw, 624px" style={{width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset: 0}}/>
            ) : (
              <Placeholder label={item.name.toLowerCase()} variant="cream" style={{width:'100%', height:'100%', position:'absolute', inset: 0}}/>
            )}
            {item.tag && (
              <span style={{
                position:'absolute', top: 14, left: 14,
                padding: '6px 12px', borderRadius: 999,
                background: item.tag === 'хит' ? 'var(--tomato)' : (item.tag === 'veg' ? '#5a7a3a' : 'rgba(255,249,241,0.9)'),
                color: item.tag === 'хит' || item.tag === 'veg' ? 'white' : 'var(--ink)',
                fontSize: 11, textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600,
              }}>
                {item.tag}
              </span>
            )}
          </div>

          <div style={{fontWeight: 700, fontSize: 14, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--ink)', marginBottom: 10}}>
            Состав
          </div>
          <p style={{fontSize: 15, lineHeight: 1.55, color:'var(--ink-60)', margin: 0}}>
            {item.desc}
          </p>
          {item.weight && (
            <div className="mono" style={{
              marginTop: 16,
              display:'inline-flex', padding:'6px 12px', borderRadius: 999,
              background: 'var(--cream-100)', fontSize: 12, color: 'var(--ink-60)',
            }}>
              {item.weight}
            </div>
          )}
          {item.step > 1 && (
            <div style={{
              marginTop: 14,
              fontSize: 13,
              color: 'var(--ink-60)',
            }}>
              Минимальный заказ от {item.step} шт.
            </div>
          )}
        </div>
        <div className="menu-drawer__foot">
          <QtyStepper item={item} size="md"/>
        </div>
      </aside>
    </>
  );
};

const QuoteModal = ({ onClose }) => {
  const [closing, setClosing] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [consent, setConsent] = React.useState(false);

  const requestClose = React.useCallback(() => setClosing(true), []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') requestClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [requestClose]);

  const handleAnimEnd = (e) => {
    if (closing && e.target === e.currentTarget) onClose();
  };

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0 && consent;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    requestClose();
  };

  return (
    <>
      <div
        className={'menu-drawer-backdrop' + (closing ? ' closing' : '')}
        onClick={requestClose}
      />
      <form
        className={'quote-modal' + (closing ? ' closing' : '')}
        role="dialog" aria-modal="true" aria-labelledby="quoteModalTitle"
        onAnimationEnd={handleAnimEnd}
        onSubmit={handleSubmit}
      >
        <div className="quote-modal__head">
          <div>
            <h3 id="quoteModalTitle" className="display" style={{fontFamily:'Unbounded, sans-serif', fontSize:'clamp(22px, 2.4vw, 26px)', fontWeight: 700, lineHeight: 1.15, margin: 0, letterSpacing:'-0.02em'}}>
              Получите расчет <em className="accent-italic">стоимости</em>
            </h3>
            <p style={{marginTop: 10, fontSize: 14, lineHeight: 1.45, color:'var(--ink-60)'}}>
              Оставьте свои контакты — свяжемся с Вами и сориентируем по стоимости
            </p>
          </div>
          <button type="button" className="quote-modal__close" onClick={requestClose} aria-label="Закрыть">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 3L13 13M13 3L3 13"/>
            </svg>
          </button>
        </div>
        <div className="quote-modal__body">
          <label>
            <span className="quote-field__label">Имя</span>
            <input
              className="quote-input"
              type="text" autoComplete="name"
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться?"
              required
            />
          </label>
          <label>
            <span className="quote-field__label">Номер телефона</span>
            <input
              className="quote-input"
              type="tel" autoComplete="tel"
              value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              required
            />
          </label>
          <label className="quote-consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}/>
            <span className="quote-consent__box">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.2L5 8.6L9.8 3.6"/>
              </svg>
            </span>
            <span>Я согласен на обработку персональных данных согласно <a href="#" className="policy-link" onClick={(e) => e.stopPropagation()}>политике конфиденциальности</a></span>
          </label>
          <button
            type="submit"
            className="btn btn-primary quote-submit"
            disabled={!canSubmit}
          >
            Получить расчет <Icon.Arrow/>
          </button>
        </div>
      </form>
    </>
  );
};

Object.assign(window, { QuoteModal });

const MenuAllCard = ({ delay }) => {
  return (
    <a
      href="#cta"
      className="menu-card--all"
      style={{
        background: 'var(--cream-100)',
        borderRadius: 24,
        overflow: 'hidden',
        animation: `fadeUp .5s ${delay}ms both`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'var(--ink)',
        padding: 24,
        minHeight: 280,
        gap: 16,
        cursor: 'pointer',
        transition: 'transform .2s ease, box-shadow .2s ease',
      }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'var(--cream-50)', border: '1px solid var(--ink-08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--tomato)',
      }}>
        <Icon.Arrow size={22}/>
      </div>
      <div className="display" style={{fontFamily: 'Unbounded, sans-serif', fontSize: 18, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em'}}>
        Смотреть всё меню
      </div>
      <div style={{fontSize: 13, color: 'var(--ink-60)'}}>
        120+ позиций по всем категориям
      </div>
    </a>
  );
};

const MenuCard = ({ item, delay, onClick }) => {
  return (
    <div
      className="menu-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick && onClick(); } }}
      style={{
        background: 'var(--cream-100)',
        borderRadius: 24,
        overflow:'hidden',
        animation: `fadeUp .5s ${delay}ms both`,
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{height: 225, position:'relative'}}>
        {item.photo ? (
          <OptImg photo={item.photo} alt={item.name} sizes="(max-width: 640px) 48vw, 300px" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
        ) : (
          <Placeholder label={item.name.toLowerCase()} variant="cream" style={{width:'100%', height:'100%'}}/>
        )}
        {item.tag && (
          <span style={{
            position:'absolute', top: 12, left: 12,
            padding: '5px 10px', borderRadius: 999,
            background: item.tag === 'хит' ? 'var(--tomato)' : (item.tag === 'veg' ? '#5a7a3a' : 'rgba(255,249,241,0.9)'),
            color: item.tag === 'хит' || item.tag === 'veg' ? 'white' : 'var(--ink)',
            fontSize: 11, textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600,
          }}>
            {item.tag}
          </span>
        )}
      </div>
      <div className="menu-card__body" style={{padding: 18, display:'flex', flexDirection:'column', gap: 12, flex: 1}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap: 10}}>
          <div style={{fontWeight: 600, fontSize: 15, lineHeight: 1.3}}>{item.name}</div>
          <div className="mono" style={{fontSize: 14, fontWeight: 600, color: 'var(--tomato)', whiteSpace:'nowrap'}}>
            {item.price != null ? `${item.price} ₽` : '—'}
          </div>
        </div>
        <div style={{marginTop:'auto'}}>
          <QtyStepper item={item} size="sm"/>
        </div>
      </div>
    </div>
  );
};


// ---------- PROCESS / HOW IT WORKS ----------
const Process = ({ label = '04 · Как это работает' } = {}) => {
  const steps = [
    { n: '01', title: 'Заявка', time: '10 мин', desc: 'Бронируем дату и время, фиксируем количество гостей, пожелания и концепцию мероприятия.' },
    { n: '02', title: 'Меню и формат', time: '2 часа', desc: 'Совместно обговариваем меню, бюджет, площадку и прочие детали мероприятия. При желании организуем дегустацию.' },
    { n: '03', title: 'Согласование', time: 'за 1–2 дн', desc: 'Утверждаем итоговое меню, нюансы обслуживания и организацию. При необходимости вносим корректировки в расписание и количество гостей.' },
    { n: '04', title: 'Событие', time: 'в день', desc: 'Привезём, расставим и обслужим всё на площадке. После мероприятия — уберём, если это входит в формат.' },
  ];
  return (
    <section style={{padding: '80px 0'}}>
      <div className="wrap">
        <div style={{marginBottom: 40}}>
          <SecLabel>{label}</SecLabel>
          <h2 className="display" style={{fontSize:'clamp(40px, 5vw, 72px)', fontWeight: 600, marginTop: 16, maxWidth: 800}}>
            От <em className="accent-italic">заявки</em> до события — 4 шага
          </h2>
        </div>

        <div className="process-grid" style={{
          display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 14,
        }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              background: i === 3 ? 'var(--ink)' : 'var(--cream-100)',
              color: i === 3 ? 'var(--cream-50)' : 'var(--ink)',
              borderRadius: 24,
              padding: 24,
              minHeight: 180,
              display:'flex', flexDirection:'column', justifyContent:'space-between',
              position:'relative', overflow:'hidden',
            }}>
              <div className="mono" style={{fontSize: 12, letterSpacing:'0.12em', opacity: 0.5}}>
                {s.n}
              </div>
              <div>
                <div style={{marginBottom: 8}}>
                  <div className="display" style={{fontSize: 27, fontWeight: 600}}>{s.title}</div>
                </div>
                <div style={{fontSize: 14, opacity: 0.7, lineHeight: 1.5}}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// ---------- TESTIMONIALS + STATS ----------
const Social = () => {
  const [val1, ref1] = useCountUp(2400);
  const [val2, ref2] = useCountUp(98);
  const [val3, ref3] = useCountUp(120);

  const reviews = [
    { name: 'Алия', event: 'Свадьба · 120 гостей', text: 'Сервис превзошёл ожидания. Гости до сих пор спрашивают про канапе с форелью. Спасибо за терпение с правками меню!' },
    { name: 'Компания «Пихтомаш»', event: 'Корпоратив · 80 чел', text: 'Привезли ровно в 18:00 как договаривались. Всё красиво расставили. Повара работали «тихо», без суеты. Рекомендуем.' },
    { name: 'Дамир', event: 'День рождения · 30 чел', text: 'Заказывали гастробоксы, 3 варианта — всё вкусно. Упаковка выглядит как подарок, не стыдно дарить.' },
  ];

  return (
    <section style={{padding: '80px 0'}}>
      <div className="wrap">
        <div className="social-stats" style={{
          display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 14, marginBottom: 24,
        }}>
          <div ref={ref1} style={statCardStyle}>
            <div className="display" style={{fontSize: 'clamp(52px, 6vw, 84px)', fontWeight: 700, color: 'var(--tomato)', letterSpacing: '-0.03em'}}>
              {val1.toLocaleString('ru-RU')}+
            </div>
            <div style={{color:'var(--ink-60)', fontWeight: 500}}>событий проведено</div>
          </div>
          <div ref={ref2} style={{...statCardStyle, background: 'var(--yellow)'}}>
            <div className="display" style={{fontSize: 'clamp(52px, 6vw, 84px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.03em'}}>
              {val2}<span style={{fontSize: '0.55em'}}>%</span>
            </div>
            <div style={{color:'var(--ink)', fontWeight: 500, opacity: 0.7}}>возвращаются снова</div>
          </div>
          <div ref={ref3} style={{...statCardStyle, background: 'var(--ink)', color:'var(--cream-50)'}}>
            <div className="display" style={{fontSize: 'clamp(52px, 6vw, 84px)', fontWeight: 800, color: 'var(--yellow)', letterSpacing: '-0.03em'}}>
              {val3}+
            </div>
            <div style={{opacity: 0.7, fontWeight: 500}}>позиций в меню</div>
          </div>
        </div>

        <div className="social-reviews" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 14}}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              background: 'var(--cream-100)',
              borderRadius: 24,
              padding: 24,
              display:'flex', flexDirection:'column', gap: 16,
            }}>
              <div style={{display:'flex', gap: 2}}>
                {[1,2,3,4,5].map(n => (<Icon.Star key={n} size={14} fill="var(--tomato)"/>))}
              </div>
              <p style={{fontSize: 15, lineHeight: 1.5, flex: 1}}>{r.text}</p>
              <div style={{display:'flex', alignItems:'center', gap: 10, paddingTop: 12, borderTop: '1px solid var(--ink-08)'}}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `linear-gradient(135deg, var(--coral), var(--peach))`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'white', fontWeight: 700, fontSize: 14,
                }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{r.name}</div>
                  <div style={{fontSize: 12, color:'var(--ink-60)'}}>{r.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const statCardStyle = {
  background: 'var(--cream-100)',
  borderRadius: 24,
  padding: 28,
  minHeight: 180,
  display:'flex', flexDirection:'column', justifyContent:'space-between',
};


// ---------- FAQ ----------
const FAQ = ({ label = '05 · Вопросы' } = {}) => {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: 'За сколько дней нужно бронировать?', a: 'Лучше обращаться заранее, но в целом можем взять заказ и за сутки. Для мероприятий это тоже рабочий срок. Если событие крупное, с индивидуальным меню, оформлением или дополнительными услугами, лучше писать раньше — так будет больше времени спокойно всё согласовать.' },
    { q: 'Можно ли заказать посуду, сервировку и обслуживание?', a: 'Да. Можем привезти еду в боксах, сделать выкладку на вашу посуду или привезти свою. При необходимости добавим сервировку, обслуживание на мероприятии, приготовление на площадке, декор и другие детали — всё это можно собрать в одном заказе.' },
    { q: 'Можно ли сделать халяль, веган или другое особое меню?', a: 'Да, меню можно адаптировать под запрос гостей. Халяль делаем отдельно: для этого используем отдельные халяльные ножи и доски и закупаем халяльные продукты животного происхождения. Если есть другие ограничения по составу, их тоже лучше обсудить заранее при согласовании меню.' },
    { q: 'Как проходит оплата?', a: 'Стандартно работаем так: 50% предоплата и оставшиеся 50% за 3 дня до мероприятия. Документы можно оформить электронно, а детали согласовать дистанционно — в созвоне или переписке.' },
    { q: 'От чего зависит стоимость и можно ли уложиться в нужный бюджет?', a: 'Стоимость зависит от формата заказа, количества гостей, состава меню, уровня подачи, посуды, обслуживания и дополнительных услуг. Решения есть в разном бюджете: от более простых гастробоксов до полного сопровождения мероприятия. На этапе согласования подбираем вариант под ваш запрос и сразу смотрим, во что реально можно уложиться.' },
    { q: 'Как доставляете заказ и в каком виде он приезжает?', a: 'Готовим в день отдачи. Перед отправкой фотографируем заказ и отправляем фото клиенту, а упаковку собираем так, чтобы еда приехала в том же виде, в котором её отправили. Если в доставке по сторонним причинам что-то повредилось, возвращаем стоимость; если проблема возникает на мероприятии, стараемся либо оперативно решить её на месте, либо возвращаем деньги.' },
  ];

  return (
    <section id="faq" style={{padding: '80px 0'}}>
      <div className="wrap">
        <div className="faq-split" style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap: 60, alignItems:'flex-start'}}>
          <div style={{position:'sticky', top: 100}}>
            <SecLabel>{label}</SecLabel>
            <h2 className="display" style={{fontSize:'clamp(36px, 4.5vw, 64px)', fontWeight: 600, marginTop: 16, letterSpacing:'-0.02em'}}>
              Часто спрашивают
            </h2>
            <p style={{color:'var(--ink-60)', marginTop: 16, maxWidth: 340}}>
              Не нашли ответ? Напишите в мессенджер — отвечаем за 15 минут.
            </p>
            <a href="#cta" className="btn btn-ghost" style={{marginTop: 24}}>
              <LucideIcon name="Send" size={16} strokeWidth={2}/> Написать менеджеру
            </a>
          </div>

          <div>
            {items.map((it, i) => (
              <div key={i} style={{
                borderBottom: '1px solid var(--ink-08)',
                padding: '20px 0',
                cursor:'pointer',
              }} onClick={() => setOpen(open === i ? -1 : i)}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap: 20}}>
                  <div className="display" style={{fontSize: 20, fontWeight: 500, letterSpacing:'-0.01em'}}>{it.q}</div>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: open === i ? 'var(--tomato)' : 'var(--cream-100)',
                    color: open === i ? 'white' : 'var(--ink)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transform: open === i ? 'rotate(45deg)' : 'none',
                    transition: 'all .3s',
                  }}>
                    <Icon.Plus size={16}/>
                  </div>
                </div>
                <div style={{
                  maxHeight: open === i ? 200 : 0,
                  overflow:'hidden',
                  transition: 'max-height .35s ease, margin-top .2s',
                  marginTop: open === i ? 12 : 0,
                }}>
                  <p style={{color:'var(--ink-60)', fontSize: 15, lineHeight: 1.6, maxWidth: 580}}>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// ---------- FINAL CTA ----------
const FinalCTA = () => {
  return (
    <section id="cta" style={{padding: '60px 0 40px'}}>
      <div className="wrap">
        <div style={{
          borderRadius: 40,
          padding: 'clamp(36px, 5vw, 72px)',
          background: 'var(--ink)',
          color:'var(--cream-50)',
          position:'relative', overflow:'hidden',
        }}>
          <div style={{position:'absolute', right: -120, top: -120, width: 400, height: 400, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(255,55,55,0.5), transparent 70%)', pointerEvents:'none'}}/>
          <div style={{position:'absolute', left: -80, bottom: -80, width: 300, height: 300, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(255,193,147,0.3), transparent 70%)', pointerEvents:'none'}}/>

          <div className="cta-split" style={{position:'relative', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap: 40, alignItems:'center'}}>
            <div>
              <span className="chip" style={{background:'rgba(255,255,255,0.1)', color:'white', border:'1px solid rgba(255,255,255,0.2)'}}>
                <span className="chip-dot" style={{background:'var(--coral)'}}></span>
                Свяжитесь с нами
              </span>
              <h2 className="display" style={{fontSize:'clamp(40px, 11vw, 80px)', fontWeight: 800, marginTop: 24, letterSpacing:'-0.04em', lineHeight: 0.95}}>
                <span style={{display:'block'}}>Остались</span>
                <em className="accent-italic" style={{display:'block', color:'var(--yellow)', fontWeight: 500}}>вопросы?</em>
              </h2>
              <p style={{opacity: 0.7, fontSize: 17, marginTop: 20, maxWidth: 440}}>
                Свяжитесь с нами удобным способом или оставьте заявку — ответим в течение часа.
              </p>
              <div className="cta-contact-row" style={{display:'flex', gap: 10, marginTop: 28, flexWrap:'wrap'}}>
                <button className="btn btn-primary">
                  Telegram <Icon.Arrow/>
                </button>
                <button className="btn" style={{background:'rgba(255,255,255,0.1)', color:'var(--cream-50)', border:'1px solid rgba(255,255,255,0.2)'}}>
                  <Icon.Phone size={16}/> +7 (993) 418-53-43
                </button>
              </div>
            </div>

            <div className="glass-dark" style={{
              borderRadius: 28, padding: 28,
              background: 'rgba(255,255,255,0.06)',
            }}>
              <div className="mono" style={{fontSize: 'clamp(9.5px, 2.8vw, 12px)', opacity: 0.6, marginBottom: 16, letterSpacing:'0.08em', textTransform:'uppercase', whiteSpace:'nowrap'}}>
                Введите ваши данные
              </div>
              <input placeholder="Ваше имя" style={ctaInput}/>
              <input placeholder="Номер телефона" style={ctaInput}/>
              <button className="btn btn-primary" style={{width:'100%', justifyContent:'center', marginTop: 8}}>
                Отправить <Icon.Arrow/>
              </button>
              <label style={{display:'flex', alignItems:'flex-start', gap: 10, marginTop: 14, fontSize: 12, lineHeight: 1.45, opacity: 0.7, cursor:'pointer'}}>
                <input type="checkbox" style={{marginTop: 2, accentColor:'var(--tomato)', flexShrink: 0, width: 16, height: 16}}/>
                <span>Я согласен на обработку персональных данных согласно политике конфиденциальности</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ctaInput = {
  width:'100%',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--cream-50)',
  padding: '14px 16px',
  borderRadius: 14,
  fontSize: 15,
  marginBottom: 10,
  outline: 'none',
  fontFamily: 'inherit',
};


// ---------- FOOTER ----------
const Footer = () => (
  <footer style={{padding: '40px 0 30px', borderTop:'1px solid var(--ink-08)', marginTop: 40}}>
    <div className="wrap" style={{display:'flex', justifyContent:'space-between', gap: 20, flexWrap:'wrap', alignItems:'center'}}>
      <div style={{display:'flex', alignItems:'center', gap: 10}}>
        <img src={ASSET("/images/logo.png")} alt="Gastronom Catering" style={{height: 36, width:'auto', display:'block'}}/>
        <span className="logo-text" style={{fontFamily:'Unbounded, sans-serif'}}>
          <span className="logo-text-main">GASTRONOM</span>
          <span className="logo-text-sub">CATERING</span>
        </span>
        <span style={{color:'var(--ink-60)', fontSize: 13, marginLeft: 8}}>Казань · с 2017</span>
      </div>
      <div style={{display:'flex', gap: 20, fontSize: 13, color:'var(--ink-60)', flexWrap:'wrap'}}>
        <a href="#">Политика конф.</a>
        <a href="#">Договор оферты</a>
        <a href="#">Реквизиты</a>
        <a href="#">Telegram</a>
        <a href="#">Instagram</a>
      </div>
      <div style={{fontSize: 13, color:'var(--ink-60)'}}>© 2026 GASTRONOM CATERING</div>
    </div>
  </footer>
);

// ---------- ADVANTAGES (bento) ----------
const Advantages = ({ label = '02 · Почему мы' } = {}) => {
  const items = [
    {
      n: '01',
      kicker: 'Вкусно',
      text: 'Меню и подачу продумывает шеф-повар с многолетним опытом.',
      bg: '#ed1d51', fg: 'white',
      img: 'фото: блюдо от шеф-повара',
      photo: ASSET('/images/1.jpg'),
      imgVariant: 'peach',
      decor: 'rings',
    },
    {
      n: '02',
      kicker: 'Красиво',
      text: 'Готовые варианты оформления, проверенные на многочисленных мероприятиях.',
      bg: '#ffe270', fg: 'var(--ink)',
      img: 'фото: сервировка фуршета',
      photo: ASSET('/images/2.jpg'),
      imgVariant: 'cream',
      decor: 'grid',
    },
    {
      n: '03',
      kicker: 'Индивидуально',
      text: 'Соберём меню, оформление и формат под ваш повод и задачи.',
      bg: '#fbebdb', fg: 'var(--ink)',
      decor: 'dots',
    },
    {
      n: '04',
      kicker: 'Надёжно',
      text: 'Проверенная система работы — без сбоев и накладок в день мероприятия.',
      bg: '#ffbfa3', fg: 'var(--ink)',
      img: 'фото: команда на выезде',
      photo: ASSET('/images/3.jpg'),
      imgVariant: 'peach',
      decor: 'waves',
    },
    {
      n: '05',
      kicker: 'Безопасно',
      text: 'Свежие продукты, проверенные поставщики и регулярный санитарный контроль.',
      bg: '#ffffff', fg: 'var(--ink)',
      decor: 'arc',
    },
  ];

  return (
    <section id="advantages" style={{padding: '60px 0 40px'}}>
      <div className="wrap">
        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom: 28, gap: 20, flexWrap:'wrap'}}>
          <div>
            <SecLabel>{label}</SecLabel>
            <h2 className="display" style={{fontSize:'clamp(34px, 4.2vw, 60px)', fontWeight: 600, marginTop: 14, maxWidth: 760, letterSpacing:'-0.02em'}}>
              Пять причин <em className="accent-italic">доверить</em> нам событие
            </h2>
          </div>
          <p style={{maxWidth: 340, color:'var(--ink-60)', fontSize: 15}}>
            То, за что нас рекомендуют другим и возвращаются снова.
          </p>
        </div>

        <div className="adv-bento" style={{
          display:'grid',
          gridTemplateColumns:'repeat(12, 1fr)',
          gridAutoRows: '128px',
          gap: 14,
        }}>
          {/* Top row: 3 image cards, portrait / square proportions */}
          <AdvCard item={items[0]} style={{gridColumn:'span 5', gridRow:'span 3'}}/>
          <AdvCard item={items[1]} style={{gridColumn:'span 4', gridRow:'span 3'}}/>
          <AdvCard item={items[3]} style={{gridColumn:'span 3', gridRow:'span 3'}}/>
          {/* Bottom row: 2 wide text tiles */}
          <AdvCard item={items[2]} style={{gridColumn:'span 6', gridRow:'span 1'}}/>
          <AdvCard item={items[4]} style={{gridColumn:'span 6', gridRow:'span 1'}}/>
        </div>
      </div>
    </section>
  );
};

const AdvDecor = ({ kind, fg }) => {
  const stroke = fg === 'white' || fg === 'var(--cream-50)' ? 'rgba(255,255,255,0.28)' : 'rgba(28,20,15,0.10)';
  if (kind === 'rings') return (
    <svg style={{position:'absolute', right:-60, top:-60, opacity:0.9}} width="280" height="280" viewBox="0 0 280 280">
      <circle cx="140" cy="140" r="50" fill="none" stroke={stroke} strokeWidth="1"/>
      <circle cx="140" cy="140" r="90" fill="none" stroke={stroke} strokeWidth="1"/>
      <circle cx="140" cy="140" r="130" fill="none" stroke={stroke} strokeWidth="1"/>
    </svg>
  );
  if (kind === 'grid') return (
    <svg style={{position:'absolute', right:-20, bottom:-20, opacity:0.9}} width="180" height="180" viewBox="0 0 180 180">
      {[...Array(8)].map((_,i) => <line key={'h'+i} x1="0" y1={i*24} x2="180" y2={i*24} stroke={stroke}/>) }
      {[...Array(8)].map((_,i) => <line key={'v'+i} x1={i*24} y1="0" x2={i*24} y2="180" stroke={stroke}/>) }
    </svg>
  );
  if (kind === 'dots') return (
    <svg style={{position:'absolute', right:20, top:'50%', transform:'translateY(-50%)', opacity:0.9}} width="160" height="90" viewBox="0 0 160 90">
      {[...Array(5)].map((_,r) => [...Array(9)].map((_,c) =>
        <circle key={r+'-'+c} cx={10+c*18} cy={10+r*18} r="1.6" fill={stroke}/>
      ))}
    </svg>
  );
  if (kind === 'waves') return (
    <svg style={{position:'absolute', right:-10, top:-10, opacity:0.9}} width="220" height="160" viewBox="0 0 220 160">
      <path d="M0,120 Q55,70 110,120 T220,120" stroke={stroke} strokeWidth="1" fill="none"/>
      <path d="M0,90 Q55,40 110,90 T220,90" stroke={stroke} strokeWidth="1" fill="none"/>
      <path d="M0,60 Q55,10 110,60 T220,60" stroke={stroke} strokeWidth="1" fill="none"/>
    </svg>
  );
  if (kind === 'arc') return (
    <svg style={{position:'absolute', right:-40, bottom:-40, opacity:0.9}} width="220" height="220" viewBox="0 0 220 220">
      <path d="M 20 200 A 180 180 0 0 1 200 20" stroke={stroke} strokeWidth="1" fill="none"/>
      <path d="M 50 200 A 150 150 0 0 1 200 50" stroke={stroke} strokeWidth="1" fill="none"/>
      <path d="M 80 200 A 120 120 0 0 1 200 80" stroke={stroke} strokeWidth="1" fill="none"/>
    </svg>
  );
  return null;
};

const AdvCard = ({ item, style }) => {
  const [hover, setHover] = React.useState(false);
  const rowSpan = parseInt(String(style.gridRow).replace(/[^\d]/g, '')) || 1;
  const isBig = rowSpan >= 2;
  const hasImg = !!item.img;
  const padding = isBig ? 22 : 20;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...style,
        position:'relative',
        overflow:'hidden',
        borderRadius: 24,
        background: item.bg,
        color: item.fg,
        padding: isBig ? '22px 22px 16px' : '20px 20px 16px',
        display:'flex', flexDirection:'column',
        justifyContent: hasImg ? 'flex-start' : 'flex-end',
        gap: 14,
        transform: 'none',
        transition: 'transform .25s ease, box-shadow .25s',
        boxShadow: '0 3px 10px -6px rgba(28,20,15,0.08)',
      }}
      className="adv-card"
    >
      {!hasImg && <AdvDecor kind={item.decor} fg={item.fg}/>}

      {/* Image placeholder, fills available space. Spark badge overlays top-right. */}
      {hasImg && (
        <div className="adv-photo" style={{
          position:'relative', zIndex:1,
          flex: 1, minHeight: 0,
          borderRadius: 16, overflow:'hidden',
        }}>
          {item.photo ? (
            <img src={item.photo} alt={item.img} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
          ) : (
            <Placeholder label={item.img} variant={item.imgVariant || 'peach'} style={{width:'100%', height:'100%'}}/>
          )}
          <div style={{
            position:'absolute', top: 12, right: 12,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,249,241,0.92)',
            color: 'var(--ink)',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 4px 12px -4px rgba(28,20,15,0.25)',
          }}>
            <Icon.Spark size={13}/>
          </div>
        </div>
      )}

      {/* Text-only cards: spark in top-right, absolutely positioned so it doesn't affect flex centering */}
      {!hasImg && (
        <div style={{
          position:'absolute', top: 16, right: 16, zIndex: 3,
          width: 28, height: 28, borderRadius: '50%',
          background: item.fg === 'var(--ink)' ? 'rgba(28,20,15,0.08)' : 'rgba(255,255,255,0.18)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <Icon.Spark size={12}/>
        </div>
      )}

      <div style={{position:'relative', zIndex:2, marginTop: 0}}>
        <div className="display" style={{
          fontSize: isBig ? 'clamp(28px, 2.8vw, 40px)' : 'clamp(22px, 2vw, 30px)',
          fontWeight: 600,
          letterSpacing:'-0.02em',
          lineHeight: 1.02,
          marginBottom: 8,
          overflowWrap: 'anywhere',
          hyphens: 'auto',
        }}>
          {item.kicker}
        </div>
        <p style={{
          fontSize: isBig ? 16 : 14,
          lineHeight: 1.45,
          opacity: item.fg === 'var(--ink)' ? 0.72 : 0.88,
          maxWidth: 420,
          margin: 0,
          fontWeight: 500,
        }}>
          {item.text}
        </p>
      </div>
    </div>
  );
};


Object.assign(window, { Formats, StatsBand, Advantages, QuizCalc, MenuHighlights, Process, Social, FAQ, FinalCTA, Footer });
