import { ImageWithFallback } from './components'

function Icon({ children }) {
  return <span className="material-symbols-outlined" aria-hidden="true">{children}</span>
}

const formatMoney = (amount) => `Bs. ${amount}`

export function ProductModal({ product, quantity, onQuantityChange, onClose, onAdd }) {
  const isOpen = Boolean(product)

  return (
    <div className={`pm-modal${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
      {isOpen && (
        <>
          <button className="pm-overlay" type="button" aria-label="Cerrar detalles del producto" onClick={onClose} />
          <section className="pm-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="pm-close" type="button" onClick={onClose} aria-label="Cerrar">×</button>
            <ImageWithFallback src={product.image} alt={product.name} className="pm-image" />
            <div className="pm-info">
              <h2 id="modal-title">{product.name}</h2>
              <p className="pm-desc">{product.details || product.description}</p>
              <div className="pm-price"><span>Precio unitario</span><strong>{formatMoney(product.price)}</strong></div>
              <div className="pm-qty">
                <span>Cantidad</span>
                <div className="pm-qty-control">
                  <button type="button" aria-label="Restar una unidad" onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>−</button>
                  <span aria-live="polite">{quantity}</span>
                  <button type="button" aria-label="Sumar una unidad" onClick={() => onQuantityChange(quantity + 1)}>+</button>
                </div>
              </div>
              <button className="btn btn-primary pm-add-btn" type="button" onClick={() => onAdd(product, quantity)}>
                Agregar al carrito
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export function CartFab({ count, onOpen }) {
  return (
    <button className="cart-fab" type="button" aria-label={`Ver carrito, ${count} productos`} onClick={onOpen}>
      <Icon>shopping_cart</Icon>
      <span className="cart-fab-count" aria-hidden="true">{count}</span>
    </button>
  )
}

export function CartDrawer({
  open,
  cart,
  productCatalog,
  total,
  deliveryType,
  deliveryAddress,
  addressError,
  addressInputRef,
  onClose,
  onQuantityChange,
  onRemove,
  onDeliveryChange,
  onAddressChange,
  onCheckout,
}) {
  return (
    <aside className={`cart-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
      {open && <button className="cart-overlay" type="button" aria-label="Cerrar carrito" onClick={onClose} />}
      <section className="cart-panel" role={open ? 'dialog' : undefined} aria-modal={open || undefined} aria-label="Carrito de compras">
        <div className="cart-header">
          <h2><Icon>shopping_cart</Icon> Tu pedido</h2>
          <button className="cart-close" type="button" onClick={onClose} aria-label="Cerrar carrito">×</button>
        </div>

        <div className="cart-items" aria-live="polite">
          {cart.length === 0 ? (
            <p className="cart-empty">Tu carrito está vacío. ¡Agrega algo rico del menú!</p>
          ) : cart.map((item) => {
            const product = productCatalog.get(item.name)
            if (!product) return null
            return (
              <article className="cart-line" key={item.name}>
                <ImageWithFallback src={product.image} alt="" className="cart-line-image" />
                <div className="cart-line-info">
                  <strong>{item.name}</strong>
                  <span>{formatMoney(product.price)} c/u · Subtotal: {formatMoney(product.price * item.qty)}</span>
                  <button className="cart-line-remove" type="button" onClick={() => onRemove(item.name)}>Quitar</button>
                </div>
                <div className="cart-line-qty" aria-label={`Cantidad de ${item.name}`}>
                  <button type="button" aria-label={`Quitar una unidad de ${item.name}`} onClick={() => onQuantityChange(item.name, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button type="button" aria-label={`Agregar una unidad de ${item.name}`} onClick={() => onQuantityChange(item.name, 1)}>+</button>
                </div>
              </article>
            )
          })}
        </div>

        <form className="cart-footer" onSubmit={onCheckout} noValidate>
          <div className="cart-total-row"><span>Total</span><strong>{formatMoney(total)}</strong></div>
          <fieldset className="delivery-options">
            <legend className="delivery-label">¿Cómo quieres tu pedido?</legend>
            <label className="delivery-choice">
              <input type="radio" name="deliveryType" value="recoger" checked={deliveryType === 'recoger'} onChange={() => onDeliveryChange('recoger')} />
              Recoger en el local
            </label>
            <label className="delivery-choice">
              <input type="radio" name="deliveryType" value="delivery" checked={deliveryType === 'delivery'} onChange={() => onDeliveryChange('delivery')} />
              Delivery
            </label>
          </fieldset>
          <label className="sr-only" htmlFor="delivery-address">Dirección para el delivery</label>
          <input
            ref={addressInputRef}
            type="text"
            id="delivery-address"
            className={`delivery-address${deliveryType === 'delivery' ? ' show' : ''}`}
            value={deliveryAddress}
            onChange={(event) => onAddressChange(event.target.value)}
            placeholder="Dirección para el delivery"
            autoComplete="street-address"
            aria-invalid={addressError}
            aria-describedby={addressError ? 'delivery-error' : undefined}
          />
          {addressError && <p id="delivery-error" className="sr-only">Escribe tu dirección para el delivery.</p>}
          <button className="btn btn-whatsapp cart-checkout-btn" type="submit" disabled={cart.length === 0}>
            <Icon>chat</Icon> Pedir por WhatsApp
          </button>
        </form>
      </section>
    </aside>
  )
}
