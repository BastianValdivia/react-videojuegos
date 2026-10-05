/**
 * Carrito
 * Props:
 *  - items: arreglo de productos agregados, ya agrupados con su
 *    "cantidad".
 *  - onEliminar: función que App.jsx pasa para sacar un producto
 *    del carrito cuando se hace click en "Quitar".
 *
 * aria-live="polite" avisa a los lectores de pantalla cuando cambia
 * el contenido del carrito, igual que en la versión HTML del lab 6.
 */
function Carrito({ items, onEliminar }) {
  const total = items.reduce(
    (acumulado, item) => acumulado + item.precio * item.cantidad,
    0
  );

  return (
    <div className="card-body" aria-live="polite">
      {/* Renderizado condicional: carrito vacío vs. carrito con productos */}
      {items.length === 0 ? (
        <p className="text-muted mb-0">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group list-group-flush mb-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center px-0"
              >
                <span>
                  {item.nombre} x{item.cantidad}
                </span>
                <span className="d-flex align-items-center gap-2">
                  ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onEliminar(item.id)}
                    aria-label={`Quitar ${item.nombre} del carrito`}
                  >
                    Quitar
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <p className="fw-bold text-end mb-0">
            Total: ${total.toLocaleString('es-CL')}
          </p>
        </>
      )}
    </div>
  );
}

export default Carrito;
