// Hero: split layout (photo + text card)

const Hero = () => {
  return (
    <section style={{ padding: '20px 0 48px', position: 'relative' }}>
      <div className="wrap" style={{ position: 'relative' }}>
        <Blob color="var(--peach)" size={420} style={{ top: -80, left: -120, opacity: 0.4 }}/>
        <Blob color="var(--coral)" size={360} style={{ top: 200, right: -80, opacity: 0.35 }}/>
        <HeroSplit/>
      </div>
    </section>
  );
};

const HeroSplit = () => {
  return (
    <div className="hero-split" style={{
      display:'grid', gridTemplateColumns:'1.15fr 1fr', gap: 18,
      position:'relative', zIndex: 1,
      alignItems: 'stretch',
    }}>
      {/* Left: white card with subtle gradient */}
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
            fontSize: 'clamp(34px, 4.6vw, 60px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.04,
            whiteSpace: 'nowrap',
          }}>
            Кейтеринг<br/>
            в Казани<br/>
            <em className="accent-italic">от 600 ₽</em>/чел.
          </h1>
        </div>

        <p style={{
          fontSize: 'clamp(15px, 1.2vw, 16px)',
          color:'var(--ink-60)',
          maxWidth: 440,
          lineHeight: 1.45,
        }}>
          От доставки боксов до банкета под ключ — подготовим персональное предложение под любое мероприятие.
        </p>
        <div style={{display:'flex', gap: 14, flexWrap:'wrap', alignItems:'center'}}>
          <a href="#calc" className="btn btn-primary">Получить предложение <Icon.Arrow/></a>
          <a href="#menu" className="btn btn-glass" style={{background: '#F9F5EB'}}>Смотреть меню</a>
        </div>
      </div>

      {/* Right: large photo with chip badge in top-left */}
      <div className="hero-photo" style={{
        borderRadius: 'clamp(24px, 3vw, 36px)',
        overflow:'hidden',
        position:'relative',
        minHeight: 550,
      }}>
        <img src="images/hero.jpeg" alt="Фуршетный стол с канапе" style={{position:'absolute', inset: 0, width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--tomato)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 1 L15 4 L20 4 L20 9 L23 12 L20 15 L20 20 L15 20 L12 23 L9 20 L4 20 L4 15 L1 12 L4 9 L4 4 L9 4 Z"/>
          </svg>
          Халяль по запросу
        </div>

        {/* Bottom glass plate with label + CTA */}
        <a href="#formats" style={{
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
            <div className="mono" style={{fontSize: 11, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--ink-60)', lineHeight: 1}}>Популярно</div>
            <div style={{fontSize: 15, fontWeight: 600, marginTop: 4, lineHeight: 1.2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>Гастробоксы с доставкой</div>
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
  );
};

Object.assign(window, { Hero });
