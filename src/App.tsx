import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import logo from '../Miravall Logo.jpg'
import { content, galleries } from './content'
import type { Language, Photo } from './content'

const mapsUrl = 'https://maps.app.goo.gl/HpAev8MCYmxoXnac9'
const instagramUrl = 'https://www.instagram.com/ktima.miravall/'
const email = 'ktima.miravall@hotmail.com'

function Arrow({ direction = 'right' }: { direction?: 'right' | 'left' | 'down' }) {
  return <svg className={`arrow ${direction}`} viewBox="0 0 32 20" fill="none" aria-hidden="true"><path d="M1 10h28M21 2l8 8-8 8" stroke="currentColor" strokeWidth="1.3" /></svg>
}

function Gallery({ photos, language, label }: { photos: Photo[]; language: Language; label: string }) {
  const [index, setIndex] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const copy = content[language]
  const photo = photos[index]
  const step = (direction: number) => setIndex(current => (current + direction + photos.length) % photos.length)
  return (
    <div className="gallery" role="region" aria-label={label} aria-roledescription={copy.carousel}>
      <div className="gallery-frame" onTouchStart={event => { start.current = { x: event.touches[0].clientX, y: event.touches[0].clientY } }} onTouchEnd={event => {
        if (!start.current) return
        const difference = start.current.x - event.changedTouches[0].clientX
        const vertical = start.current.y - event.changedTouches[0].clientY
        if (Math.abs(difference) > 45 && Math.abs(difference) > Math.abs(vertical)) step(difference > 0 ? 1 : -1)
        start.current = null
      }}>
        <button className="photo-open" onClick={() => dialog.current?.showModal()} aria-label={`${copy.enlarge}: ${photo.alt[language]}`}>
          <img key={photo.src} src={photo.src} alt={photo.alt[language]} loading="lazy" decoding="async" />
          <span className="photo-enlarge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" stroke="currentColor" strokeWidth="1.5" /></svg></span>
        </button>
        <span className="gallery-count" aria-live="polite">{String(index + 1).padStart(2, '0')} <span>/ {String(photos.length).padStart(2, '0')}</span></span>
      </div>
      <div className="gallery-bottom">
        <div className="gallery-dots">{photos.map((item, photoIndex) => <button key={item.src} aria-label={`${copy.photo} ${photoIndex + 1}`} aria-pressed={index === photoIndex} onClick={() => setIndex(photoIndex)}><span /></button>)}</div>
        <div className="gallery-arrows"><button onClick={() => step(-1)} aria-label={copy.previous}><Arrow direction="left" /></button><button onClick={() => step(1)} aria-label={copy.next}><Arrow /></button></div>
      </div>
      <dialog ref={dialog} className="lightbox" aria-label={label} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }} onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
      }}>
        <button className="lightbox-close" onClick={() => dialog.current?.close()} autoFocus>{copy.close} <span aria-hidden="true">×</span></button>
        <img src={photo.src} alt={photo.alt[language]} />
        <div className="lightbox-controls"><button onClick={() => step(-1)} aria-label={copy.previous}><Arrow direction="left" /></button><p aria-live="polite">{index + 1} / {photos.length}</p><button onClick={() => step(1)} aria-label={copy.next}><Arrow /></button></div>
      </dialog>
    </div>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'el')
  const [menuOpen, setMenuOpen] = useState(false)
  const [emailPrepared, setEmailPrepared] = useState(false)
  const copy = content[language]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = copy.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description)
  }, [language, copy])

  useEffect(() => {
    const onPopState = () => setLanguage(new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'el')
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach(element => { element.classList.add('reveal-ready'); observer.observe(element) })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  function changeLanguage(next: Language) {
    setLanguage(next)
    const url = new URL(window.location.href)
    if (next === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.pushState({}, '', url)
  }

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = `${copy.name}: ${data.get('name')}\nEmail: ${data.get('email')}\n${copy.date}: ${data.get('date') || '—'}\n${copy.guests}: ${data.get('guests') || '—'}\n\n${data.get('message')}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(body)}`
    setEmailPrepared(true)
  }

  return (
    <>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Miravall" onClick={() => setMenuOpen(false)}><span className="brand-image"><img src={logo} alt="Miravall" /></span></a>
        <nav id="navigation" aria-label={copy.navigation} className={menuOpen ? 'navigation open' : 'navigation'}>
          {copy.navigationItems.map((item, index) => <a key={item} href={['#about', '#spaces', '#experience', '#contact'][index]} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="header-actions"><div className="language-switch" aria-label={copy.language}><button lang="el" aria-label="Ελληνικά" aria-pressed={language === 'el'} onClick={() => changeLanguage('el')}>ΕΛ</button><span>/</span><button lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}>EN</button></div><a className="header-cta" href="#contact">{copy.visit}<Arrow /></a><button className="menu-toggle" aria-controls="navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? copy.close : copy.menu}<span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button></div>
      </header>
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <img className="hero-image" src={galleries.indoor[3].src} alt={galleries.indoor[3].alt[language]} fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-content"><p className="eyebrow">{copy.location}</p><h1 id="hero-heading">{copy.heroFirst}<br /><em>{copy.heroSecond}</em></h1><p className="hero-description">{copy.heroDescription}</p><a className="text-link light" href="#spaces">{copy.discover}<Arrow /></a></div>
          <div className="hero-footer"><span>{copy.venueType}</span><a href="#about" aria-label={copy.discover}><span>{copy.scroll}</span><Arrow direction="down" /></a></div>
        </section>
        <section id="about" className="intro section-shell">
          <div className="intro-heading" data-reveal><p className="eyebrow">{copy.aboutLabel}</p><h2>{copy.aboutFirst}<br /><em>{copy.aboutSecond}</em></h2></div>
          <div className="intro-body" data-reveal><p>{copy.aboutBody}</p><a className="text-link" href="#contact">{copy.knowUs}<Arrow /></a></div>
          <div className="facts" data-reveal><div><span className="fact-number">800</span><span>{copy.indoorCapacity}</span></div><div><span className="fact-number">700</span><span>{copy.outdoorCapacity}</span></div><div><span className="fact-number">03</span><span>{copy.menuChoices}</span></div></div>
        </section>
        <section id="spaces" className="spaces section-shell">
          <div className="section-heading" data-reveal><div><p className="eyebrow">{copy.spacesLabel}</p><h2>{copy.spacesFirst}<br /><em>{copy.spacesSecond}</em></h2></div><p>{copy.spacesIntro}</p></div>
          <article className="venue-row" data-reveal><Gallery photos={galleries.outdoor} language={language} label={copy.outdoorTitle} /><div className="venue-copy"><p className="eyebrow">01 / {copy.summer}</p><h3>{copy.outdoorTitle}</h3><p>{copy.outdoorBody}</p><p className="capacity"><span>700</span>{copy.upToGuests}</p><a className="text-link" href="#contact">{copy.visit}<Arrow /></a></div></article>
          <article className="venue-row reverse" data-reveal><Gallery photos={galleries.indoor} language={language} label={copy.indoorTitle} /><div className="venue-copy"><p className="eyebrow">02 / {copy.indoors}</p><h3>{copy.indoorTitle}</h3><p>{copy.indoorBody}</p><p className="capacity"><span>800</span>{copy.upToGuests}</p><a className="text-link" href="#contact">{copy.visit}<Arrow /></a></div></article>
        </section>
        <section className="moment" aria-labelledby="moment-heading"><img src={galleries.outdoor[4].src} alt={galleries.outdoor[4].alt[language]} loading="lazy" /><div className="moment-shade" /><div data-reveal><p className="eyebrow">{copy.momentLabel}</p><h2 id="moment-heading">{copy.momentFirst}<br /><em>{copy.momentSecond}</em></h2><a className="text-link light" href="#contact">{copy.plan}<Arrow /></a></div></section>
        <section id="experience" className="experience section-shell"><div className="section-heading" data-reveal><div><p className="eyebrow">{copy.experienceLabel}</p><h2>{copy.experienceFirst}<br /><em>{copy.experienceSecond}</em></h2></div><p>{copy.experienceIntro}</p></div><div className="services"><div className="included" data-reveal><p className="eyebrow">{copy.included}</p><h3>{copy.menuTitle}</h3><p>{copy.menuBody}</p><div className="service-rule" /><h3>{copy.lighting}</h3><p>{copy.lightingBody}</p></div><div className="optional" data-reveal><p className="eyebrow">{copy.optional}</p>{copy.services.map((service, index) => <div className="service-item" key={service.title}><span className="service-index">0{index + 1}</span><div><h3>{service.title}</h3><p>{service.body}</p></div></div>)}</div></div></section>
        <section id="contact" className="contact section-shell"><div className="contact-copy" data-reveal><p className="eyebrow">{copy.contactLabel}</p><h2>{copy.contactFirst}<br /><em>{copy.contactSecond}</em></h2><p>{copy.contactBody}</p><div className="contact-details"><a href={`mailto:${email}`}>{email}</a><a href="tel:+306971663735">+30 697 166 3735</a><a href={mapsUrl} target="_blank" rel="noreferrer">{copy.address}<Arrow /></a></div></div><form onSubmit={prepareEmail} className="enquiry-form" data-reveal><div className="form-field"><label htmlFor="name">{copy.name} *</label><input id="name" name="name" autoComplete="name" required maxLength={120} /></div><div className="form-field"><label htmlFor="email">Email *</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} /></div><div className="form-row"><div className="form-field"><label htmlFor="date">{copy.date}</label><input id="date" name="date" type="date" /></div><div className="form-field"><label htmlFor="guests">{copy.guests}</label><input id="guests" name="guests" type="number" min="1" max="800" /></div></div><div className="form-field"><label htmlFor="message">{copy.message}</label><textarea id="message" name="message" rows={3} maxLength={2000} /></div><button type="submit" className="submit-button">{copy.emailButton}<Arrow /></button><p className="form-note">{copy.formNote}</p>{emailPrepared && <p className="form-status" role="status">{copy.emailPrepared}</p>}</form></section>
      </main>
      <footer className="site-footer"><div className="footer-main"><a className="footer-wordmark" href="#home">MIRAVALL</a><p>{copy.venueType}<br />{copy.address}</p><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <Arrow /></a><a href={mapsUrl} target="_blank" rel="noreferrer">{copy.directions}<Arrow /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Miravall</span><span>{copy.footerNote}</span><a href="#home">{copy.backTop}<Arrow direction="down" /></a></div></footer>
    </>
  )
}
