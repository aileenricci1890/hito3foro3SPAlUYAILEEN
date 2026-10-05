import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AboutUs,
  Categories,
  CityGallery,
  FeaturedProducts,
  Flavors,
  Header,
  Hero,
  HowItWorks,
  Locations,
  Menu,
  Promotions,
  SiteFooter,
  Toast,
} from './components'
import { CartDrawer, CartFab, ProductModal } from './order-components'
import {
  categories,
  cityCarousels,
  featuredProductNames,
  flavorProductNames,
  menuFilters,
  menuProductNames,
  products,
  promotions,
  steps,
  whatsappNumber,
} from './data'
import './App.css'
import './cart.css'

const routeSections = {
  '/': 'inicio',
  '/menu': 'menu',
  '/sabores': 'sabores',
  '/promociones': 'promociones',
  '/nosotros': 'nosotros',
  '/cochabamba': 'cochabamba',
  '/ubicaciones': 'ubicaciones',
}

function currentRoute() {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

function RouteNotFound({ onHome }) {
  return (
    <section className="section route-not-found" role="status">
      <p className="eyebrow">Error 404</p>
      <h1>Esta página no existe</h1>
      <p>La dirección puede haber cambiado o no ser válida.</p>
      <button className="btn btn-primary" type="button" onClick={onHome}>Volver al inicio</button>
    </section>
  )
}

const productCatalog = new Map(
  [...products, ...promotions].map((product) => [product.name, product]),
)

function readSavedCart() {
  try {
    const savedCart = JSON.parse(window.localStorage.getItem('cochala_cart') || '[]')
    if (!Array.isArray(savedCart)) return []

    return savedCart.filter((item) => (
      item && productCatalog.has(item.name) && Number.isInteger(item.qty) && item.qty > 0
    ))
  } catch {
    return []
  }
}

function App() {
  const [activeFilter, setActiveFilter] = useState('todos')
  const [activeSection, setActiveSection] = useState('inicio')
  const [route, setRoute] = useState(currentRoute)
  const [modalProduct, setModalProduct] = useState(null)
  const [modalQuantity, setModalQuantity] = useState(1)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState(readSavedCart)
  const [deliveryType, setDeliveryType] = useState('recoger')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [addressError, setAddressError] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const toastTimer = useRef(null)
  const addressInputRef = useRef(null)

  const featuredProducts = useMemo(
    () => featuredProductNames.map((name) => productCatalog.get(name)).filter(Boolean),
    [],
  )
  const menuProducts = useMemo(
    () => menuProductNames.map((name) => productCatalog.get(name)).filter(Boolean),
    [],
  )
  const flavorProducts = useMemo(
    () => flavorProductNames.map((name) => productCatalog.get(name)).filter(Boolean),
    [],
  )
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => {
    const product = productCatalog.get(item.name)
    return sum + (product ? product.price * item.qty : 0)
  }, 0)
  const overlayOpen = Boolean(modalProduct) || cartOpen

  useEffect(() => {
    function syncRoute() {
      setRoute(currentRoute())
    }
    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  useEffect(() => {
    if (!(route in routeSections)) return
    const target = routeSections[route]
    requestAnimationFrame(() => {
      if (target === 'inicio') window.scrollTo({ top: 0, behavior: 'smooth' })
      else document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [route])

  useEffect(() => {
    function updateActiveSection() {
      const currentSection = [...document.querySelectorAll('main section[id]')]
        .filter((section) => section.getBoundingClientRect().top <= 140)
        .at(-1)
      setActiveSection(currentSection?.id || 'inicio')
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem('cochala_cart', JSON.stringify(cart))
    } catch {
      // The cart remains usable for this session when browser storage is unavailable.
    }
  }, [cart])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  useEffect(() => {
    if (!overlayOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setModalProduct(null)
        setCartOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [overlayOpen])

  function notify(message) {
    window.clearTimeout(toastTimer.current)
    setToastMessage(message)
    toastTimer.current = window.setTimeout(() => setToastMessage(''), 2500)
  }

  function navigate(path, { replace = false } = {}) {
    const nextRoute = path.replace(/\/$/, '') || '/'
    if (nextRoute === route) return
    window.history[replace ? 'replaceState' : 'pushState']({}, '', nextRoute)
    setRoute(nextRoute)
  }

  function handleInternalNavigation(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const anchor = event.target.closest('a[href]')
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return
    const url = new URL(anchor.href, window.location.href)
    if (url.origin !== window.location.origin || !url.hash) return
    const section = decodeURIComponent(url.hash.slice(1))
    const destination = Object.entries(routeSections).find(([, id]) => id === section)?.[0]
    if (!destination) return
    event.preventDefault()
    navigate(destination)
  }

  function openOrder(productName) {
    if (productName === 'Pedido general') {
      setModalProduct(null)
      setCartOpen(true)
      return
    }

    const product = productCatalog.get(productName)
    if (!product) return

    setModalQuantity(1)
    setModalProduct(product)
    setCartOpen(false)
  }

  function addToCart(product, quantity) {
    setCart((items) => {
      const existingItem = items.find((item) => item.name === product.name)
      if (existingItem) {
        return items.map((item) => item.name === product.name
          ? { ...item, qty: item.qty + quantity }
          : item)
      }
      return [...items, { name: product.name, qty: quantity }]
    })

    setModalProduct(null)
    setCartOpen(true)
    notify(`${quantity} x ${product.name} agregado al carrito`)
  }

  function changeCartQuantity(productName, delta) {
    setCart((items) => items
      .map((item) => item.name === productName ? { ...item, qty: item.qty + delta } : item)
      .filter((item) => item.qty > 0))
  }

  function removeFromCart(productName) {
    setCart((items) => items.filter((item) => item.name !== productName))
  }

  function changeDeliveryType(type) {
    setDeliveryType(type)
    if (type === 'recoger') setAddressError(false)
  }

  function handleCheckout(event) {
    event.preventDefault()
    if (cart.length === 0) return

    const address = deliveryAddress.trim()
    if (deliveryType === 'delivery' && !address) {
      setAddressError(true)
      notify('Por favor escribe tu dirección para el delivery')
      addressInputRef.current?.focus()
      return
    }

    const lines = ['¡Hola Cochala Bistro! Quiero hacer este pedido:', '']
    cart.forEach((item) => {
      const product = productCatalog.get(item.name)
      lines.push(`• ${item.qty} x ${item.name} — Bs. ${(product?.price || 0) * item.qty}`)
    })
    lines.push('', `Total: Bs. ${cartTotal}`, '')
    if (deliveryType === 'delivery') {
      lines.push('Tipo de entrega: Delivery', `Dirección: ${address}`)
    } else {
      lines.push('Tipo de entrega: Recojo en el local')
    }

    const checkoutUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(checkoutUrl, '_blank', 'noopener')
  }

  return (
    <>
      <div onClick={handleInternalNavigation}>
      <Header activeSection={activeSection} />
      <main>
        {!(route in routeSections) ? <RouteNotFound onHome={() => navigate('/')} /> : <>
        <Hero />
        <Categories categories={categories} />
        <FeaturedProducts products={featuredProducts} onOrder={openOrder} />
        <Menu
          products={menuProducts}
          filters={menuFilters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onOrder={openOrder}
        />
        <Flavors products={flavorProducts} />
        <Promotions promotions={promotions} onOrder={openOrder} />
        <AboutUs />
        <CityGallery carousels={cityCarousels} />
        <HowItWorks steps={steps} />
        <Locations onOrder={openOrder} />
        </>}
      </main>
      <SiteFooter />
      </div>
      <CartFab count={cartCount} onOpen={() => setCartOpen(true)} />
      <ProductModal
        product={modalProduct}
        quantity={modalQuantity}
        onQuantityChange={setModalQuantity}
        onClose={() => setModalProduct(null)}
        onAdd={addToCart}
      />
      <CartDrawer
        open={cartOpen}
        cart={cart}
        productCatalog={productCatalog}
        total={cartTotal}
        deliveryType={deliveryType}
        deliveryAddress={deliveryAddress}
        addressError={addressError}
        addressInputRef={addressInputRef}
        onClose={() => setCartOpen(false)}
        onQuantityChange={changeCartQuantity}
        onRemove={removeFromCart}
        onDeliveryChange={changeDeliveryType}
        onAddressChange={(value) => {
          setDeliveryAddress(value)
          if (value.trim()) setAddressError(false)
        }}
        onCheckout={handleCheckout}
      />
      <Toast message={toastMessage} />
    </>
  )
}

export default App
