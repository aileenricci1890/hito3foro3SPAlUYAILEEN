import { useEffect, useState } from 'react'
import logo from './assets/logo-cochala-bistro.svg'

const navigation = [
  ['inicio', 'Inicio'],
  ['menu', 'Menú'],
  ['sabores', 'Sabores'],
  ['promociones', 'Promociones'],
  ['nosotros', 'Sobre nosotros'],
  ['cochabamba', 'Llajta querida'],
  ['ubicaciones', 'Ubicaciones'],
]

function Icon({ children, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`} aria-hidden="true">{children}</span>
}

export function ImageWithFallback({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`image-frame ${className}`}>
      {failed ? (
        <div className="image-fallback" role="img" aria-label={alt}>
          <Icon>restaurant</Icon>
          <span>{alt}</span>
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  )
}

export function OrderButton({ productName, onOrder, children, className = 'btn btn-primary', label }) {
  return (
    <button
      className={className}
      type="button"
      data-product={productName}
      aria-label={label}
      onClick={() => onOrder(productName)}
    >
      {children}
    </button>
  )
}

export function Header({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container nav-container">
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Cochala Bistro, inicio">
          <img src={logo} alt="" />
          <span>Cochala Bistro</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon>{menuOpen ? 'close' : 'menu'}</Icon>
        </button>

        <nav id="main-navigation" className={`nav${menuOpen ? ' open' : ''}`} aria-label="Navegación principal">
          {navigation.map(([id, label]) => (
            <a
              className={`nav-link${activeSection === id ? ' active' : ''}`}
              href={`#${id}`}
              key={id}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </nav>

        <a className="nav-order" href="#ubicaciones" onClick={closeMenu}>Pedir ahora</a>
      </div>
    </header>
  )
}

export function SectionHeading({ eyebrow, children, id }) {
  return (
    <div className="section-heading">
      <span aria-hidden="true">—</span>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 id={id}>{children}</h2>
      </div>
      <span aria-hidden="true">—</span>
    </div>
  )
}

export function Hero() {
  return (
    <section id="inicio" className="hero section">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-text">
          <span className="eyebrow">Sabor cochabambino</span>
          <h1>Comida rápida,<br /><span>hecha en Bolivia.</span></h1>
          <p>Rápida, rica y hecha para ti. Disfruta los sabores bolivianos que amas, preparados con ingredientes locales y frescos.</p>
          <div className="hero-actions">
            <a href="#menu" className="btn btn-primary">Ver menú <Icon>arrow_forward</Icon></a>
            <a href="#promociones" className="btn btn-light">Ver promociones</a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-circle" />
          <ImageWithFallback
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdf6hBJkWqggSkEPhd0JE9tW8vvNpjhIRo4JhoOYq1OsqgCKffZ1xlbGntPD25Qf24fOr1nWtUHgCcgV8d6aAmAPVxY-iVlFUelBRSlNoOnXpR_frGUHrZGrRJXSa7u5H7v-QByTj73luX9O5ama7JdIPsnTtguy7wnhALP032vYzROaFusnrKm9EfLPyC6SNS0XBjdFHiDQ6ZDA-65uaLSwbccF2QSG2If2AuWOV8iv8cz6T8gDlsvg"
            alt="Pique Macho, plato estrella de Cochala Bistro"
            className="hero-food"
          />
          <div className="hero-badge">
            <Icon>local_fire_department</Icon>
            <div><small>Más pedido</small><strong>Pique Macho</strong></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Categories({ categories }) {
  return (
    <section className="categories section" aria-labelledby="categories-title">
      <div className="container">
        <SectionHeading id="categories-title">¿Qué estás buscando?</SectionHeading>
        <div className="category-grid">
          {categories.map((category) => (
            <a
              href={category.href}
              className="category-card"
              key={category.title + category.subtitle}
            >
              <Icon>{category.icon}</Icon>
              <strong>{category.title}</strong>
              <small>{category.subtitle}</small>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProductCard({ product, onOrder, featured = false }) {
  return (
    <article className={`product-card${featured ? ' featured-product' : ' menu-card'}`}>
      <ImageWithFallback src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-bottom">
          <strong>Bs. {product.price}</strong>
          {featured ? (
            <OrderButton productName={product.name} onOrder={onOrder} className="add-btn" label={`Pedir ${product.name}`}>
              <Icon>add</Icon>
            </OrderButton>
          ) : (
            <OrderButton productName={product.name} onOrder={onOrder} className="order-btn" label={`Pedir ${product.name}`}>Pedir</OrderButton>
          )}
        </div>
      </div>
    </article>
  )
}

export function FeaturedProducts({ products, onOrder }) {
  return (
    <section className="featured section section-soft">
      <div className="container">
        <div className="section-title-row">
          <div><span className="eyebrow">Favoritos</span><h2>Productos destacados</h2></div>
          <a className="text-link" href="#menu">Ver menú completo <span aria-hidden="true">→</span></a>
        </div>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.name} product={product} onOrder={onOrder} featured />)}
        </div>
      </div>
    </section>
  )
}

export function Menu({ products, filters, activeFilter, onFilterChange, onOrder }) {
  const visibleProducts = activeFilter === 'todos'
    ? products
    : products.filter((product) => product.category === activeFilter)

  return (
    <section id="menu" className="menu-section section" aria-labelledby="menu-title">
      <div className="container">
        <SectionHeading id="menu-title">Nuestro menú</SectionHeading>
        <div className="filter-buttons" role="group" aria-label="Filtrar menú por categoría">
          {filters.map((filter) => (
            <button
              className={`filter-btn${activeFilter === filter.value ? ' active' : ''}`}
              type="button"
              key={filter.value}
              aria-pressed={activeFilter === filter.value}
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        {visibleProducts.length ? (
          <div className="menu-grid">
            {visibleProducts.map((product) => <ProductCard key={product.name} product={product} onOrder={onOrder} />)}
          </div>
        ) : (
          <p className="empty-menu">Pronto tendremos productos en esta categoría.</p>
        )}
      </div>
    </section>
  )
}

export function FlavorCard({ product }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      className={`flavor-card${flipped ? ' is-flipped' : ''}`}
      aria-pressed={flipped}
      aria-label={`${product.name}: ${flipped ? 'ver foto' : 'ver ingredientes y origen'}`}
      onClick={() => setFlipped((value) => !value)}
    >
      <span className="flavor-card-inner">
        <span className="flavor-card-front">
          <ImageWithFallback src={product.image} alt="" className="flavor-image" />
          <span className="flavor-name">{product.name}</span>
          <span className="flavor-hint">Toca para conocer su historia</span>
        </span>
        <span className="flavor-card-back">
          <span className="flavor-title">{product.name}</span>
          <span><strong>Hecho de:</strong> {product.ingredients}</span>
          <span><strong>Dónde encontrarlo:</strong> {product.origin}</span>
        </span>
      </span>
    </button>
  )
}

export function Flavors({ products }) {
  return (
    <section id="sabores" className="flavors section section-soft">
      <div className="container">
        <SectionHeading>Sabores de Cochabamba</SectionHeading>
        <p className="flavors-intro">Descubre de qué está hecho cada plato y dónde se disfruta en Cochabamba.</p>
        <div className="flavor-grid">
          {products.map((product) => <FlavorCard key={product.name} product={product} />)}
        </div>
      </div>
    </section>
  )
}

export function Promotions({ promotions, onOrder }) {
  return (
    <section id="promociones" className="promotions section">
      <div className="container">
        <SectionHeading>Promociones</SectionHeading>
        <div className="promo-grid">
          {promotions.map((promotion, index) => (
            <article className={`promo-card${index === 0 ? ' promo-main' : ' promo-secondary'}`} key={promotion.name}>
              <span className="promo-tag">{promotion.tag}</span>
              <h3>{promotion.title}</h3>
              <p>{promotion.description}</p>
              <div className="promo-price">
                <strong>Bs. {promotion.price}</strong>
                {promotion.previousPrice && <del>Bs. {promotion.previousPrice}</del>}
              </div>
              <OrderButton
                productName={promotion.name}
                onOrder={onOrder}
                className={`btn ${index === 0 ? 'btn-dark' : 'btn-light'}`}
              >
                {index === 0 ? 'Añadir a la orden' : 'Pedir promo'}
              </OrderButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutUs() {
  return (
    <section id="nosotros" className="about section section-soft">
      <div className="container about-grid">
        <ImageWithFallback
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYJDxh1PV7NZ9208D2zNiV-U1MZOJXDNf2Um0ZXlkgxPOYLzVf9_kJ32yKF3i_8rtFvYVRtsjeEI_1mtH2k3eBPTYEDf_Tq9Ze1jThunWIqhK8Gh-Fgkv-kPstjqLEF6Ib3A99ZPSBYcdNQavcx59jyZyyA6SlajkfBGH1WYinDopcaO1YtAEfj53A9-gcO82QNKE1DF6uUWzsYiTL4W_dQ3pHVAt0i9l24WGCPlFho6BxzXfAYUO_Yw"
          alt="Preparación de comida boliviana en Cochala Bistro"
          className="about-image"
        />
        <div className="about-text">
          <span className="eyebrow">Sobre nosotros</span>
          <h2>El sabor de Bolivia, directo a tu mesa.</h2>
          <p>En Cochala Bistro celebramos la comida boliviana con una propuesta rápida, rica y cercana.</p>
          <p>Nuestro menú reúne sabores tradicionales de diferentes regiones de Bolivia en un espacio pensado para disfrutar, compartir y pedir fácilmente.</p>
          <p>Queremos que cada plato conserve ese sabor casero y auténtico que nos representa.</p>
        </div>
      </div>
    </section>
  )
}

export function Carousel({ label, slides }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || slides.length < 2) return undefined
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [activeIndex, paused, slides.length])

  function goTo(index) {
    setActiveIndex((index + slides.length) % slides.length)
  }

  return (
    <div
      className="carousel"
      aria-roledescription="carrusel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {slides.map((slide) => (
          <div className="carousel-slide" key={slide.caption}>
            <ImageWithFallback src={slide.image} alt={slide.caption} className="carousel-image" />
            <span className="slide-caption">{slide.caption}</span>
          </div>
        ))}
      </div>
      <button className="carousel-prev" type="button" aria-label="Foto anterior" onClick={() => goTo(activeIndex - 1)}>‹</button>
      <button className="carousel-next" type="button" aria-label="Foto siguiente" onClick={() => goTo(activeIndex + 1)}>›</button>
      <div className="carousel-dots" aria-label="Elegir foto">
        {slides.map((slide, index) => (
          <button
            className={`carousel-dot${activeIndex === index ? ' active' : ''}`}
            type="button"
            key={slide.caption}
            aria-label={`Mostrar ${slide.caption}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export function CityGallery({ carousels }) {
  return (
    <section id="cochabamba" className="city section">
      <div className="container">
        <SectionHeading>Llajta querida</SectionHeading>
        <p className="flavors-intro">La llajta que le da sabor a cada plato de nuestro menú.</p>
        <div className="city-grid">
          {carousels.map((carousel) => <Carousel key={carousel.label} {...carousel} />)}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks({ steps }) {
  return (
    <section className="how section section-soft" aria-labelledby="how-heading">
      <div className="container">
        <SectionHeading id="how-heading">¿Cómo funciona?</SectionHeading>
        <div className="steps">
          {steps.map((step, index) => (
            <article className="step" key={step.title}>
              <span>{index + 1}</span>
              <Icon className="step-icon">{step.icon}</Icon>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Locations({ onOrder }) {
  return (
    <section id="ubicaciones" className="locations section">
      <div className="container">
        <SectionHeading>Ubicaciones</SectionHeading>
        <div className="location-card">
          <div className="location-info">
            <Icon className="location-icon">location_on</Icon>
            <div>
              <h3>Cochala Bistro</h3>
              <p>Av. América Este<br />Cochabamba, Bolivia</p>
              <p><strong>Horario:</strong><br />Lun. a dom. · 11:00 a 23:00</p>
            </div>
          </div>
          <div className="map-box">
            <Icon>map</Icon>
            <p>Encuéntranos en Cochabamba</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Av.+America+Este+Cochabamba+Bolivia" target="_blank" rel="noreferrer">Abrir en Google Maps</a>
          </div>
        </div>
        <div className="final-cta">
          <h2>¿Listo para pedir?</h2>
          <p>Tu comida favorita, en minutos.</p>
          <OrderButton productName="Pedido general" onOrder={onOrder} className="btn btn-whatsapp">
            <Icon>chat</Icon> Hacer mi pedido
          </OrderButton>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a href="#inicio" className="brand footer-brand">
            <img src={logo} alt="" />
            <span>Cochala Bistro</span>
          </a>
          <p>Comida rápida<br />hecha en Cochabamba.</p>
        </div>
        <div><h3>Encuéntranos</h3><p>Av. América Este<br />Cochabamba, Bolivia</p></div>
        <div><h3>Síguenos</h3><div className="socials"><span>Instagram</span><span>Facebook</span></div></div>
        <div><h3>Contáctanos</h3><p>707 00000</p><a href="#ubicaciones">Escríbenos por WhatsApp</a></div>
      </div>
      <div className="container copyright">© 2026 Cochala Bistro. Todos los derechos reservados.</div>
    </footer>
  )
}

export function Toast({ message }) {
  return <div className={`toast${message ? ' show' : ''}`} role="status" aria-live="polite">{message}</div>
}
