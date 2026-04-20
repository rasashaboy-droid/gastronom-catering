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
      {/* Left: white card with text */}
      <div style={{
        background: 'white',
        borderRadius: 'clamp(24px, 3vw, 36px)',
        padding: 'clamp(24px, 3.4vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 'clamp(24px, 3vw, 32px)',
        minHeight: 460,
        boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 10px 30px -15px rgba(28,20,15,0.08)',
      }}>
        <div>
          <Chip style={{marginBottom: 'clamp(16px, 2.4vw, 24px)', background: 'var(--cream-100)', border:'1px solid var(--ink-08)'}}>
            <Icon.Spark size={14}/> Кейтеринг в Казани с 2017 года
          </Chip>
          <h1 className="display" style={{
            fontFamily: 'Unbounded, sans-serif',
            fontSize: 'clamp(36px, 6.2vw, 76px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 0.98,
          }}>
            Кейтеринг<br/>
            в Казани<br/>
            <em className="accent-italic">от 600 ₽</em>/чел.
          </h1>
        </div>

        <div>
          <p style={{
            fontSize: 'clamp(15px, 1.2vw, 16px)',
            color:'var(--ink-60)',
            maxWidth: 440,
            marginBottom: 'clamp(16px, 2.4vw, 24px)',
            lineHeight: 1.45,
          }}>
            От доставки боксов до банкета под ключ — подготовим персональное предложение под любое мероприятие.
          </p>
          <div style={{display:'flex', gap: 14, flexWrap:'wrap', alignItems:'center'}}>
            <a href="#calc" className="btn btn-primary">Рассчитать стоимость <Icon.Arrow/></a>
            <a href="#menu" className="btn btn-ghost" style={{border:'none', padding:'16px 8px'}}>Меню</a>
          </div>
        </div>
      </div>

      {/* Right: large photo with chip badge in top-left */}
      <div className="hero-photo" style={{
        borderRadius: 'clamp(24px, 3vw, 36px)',
        overflow:'hidden',
        position:'relative',
        minHeight: 460,
      }}>
        <img src="images/hero.jpeg" alt="Фуршетный стол с канапе" style={{position:'absolute', inset: 0, width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
        <div style={{
          position:'absolute', top: 16, left: 16,
          display:'inline-flex', alignItems:'center', gap: 10,
          padding: '10px 18px',
          background: 'rgba(255, 249, 241, 0.92)',
          backdropFilter: 'blur(10px)',
          borderRadius: 999,
          fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 14px rgba(28,20,15,0.08)',
        }}>
          <span style={{width: 8, height: 8, borderRadius: 999, background: '#3FB56A'}}/>
          Свободны на эту неделю
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Hero });
