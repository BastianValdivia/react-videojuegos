/**
 * VideojuegoList
 * Recibe el catálogo ya filtrado (prop "productos"), la función
 * "onAgregar" (prop) que App.jsx le pasa para poder avisarle cuando
 * el usuario agrega un producto al carrito, y "idsEnCarrito" (prop),
 * el arreglo de ids que ya están en el carrito.
 *
 * Usa .map() para recorrer el arreglo, que es el equivalente en React
 * de *ngFor en Angular. Cada tarjeta necesita una prop "key" única
 * (usamos el id del producto) para que React identifique cada fila.
 */
function VideojuegoList({ productos, onAgregar, idsEnCarrito }) {
  // Renderizado condicional: si no hay resultados (catálogo vacío o
  // búsqueda sin coincidencias), mostramos un mensaje en vez de la grilla.
  if (productos.length === 0) {
    return (
      <p className="text-muted">
        No se encontraron productos que coincidan con tu búsqueda.
      </p>
    );
  }

  return (
    <div className="row g-3">
      {productos.map((producto) => (
        <div className="col-12 col-sm-6 col-md-4" key={producto.id}>
          <div className="card h-100">
            <span className="badge bg-dark m-2 align-self-start">
              {producto.consola}
            </span>
            <img
              src={producto.imagen}
              className="card-img-top"
              loading="lazy"
              alt={`Portada del videojuego ${producto.nombre}`}
            />
            <div className="card-body d-flex flex-column">
              <h3 className="h5 card-title">{producto.nombre}</h3>
              <p className="card-text small flex-grow-1">
                {producto.descripcion}
              </p>
              <p className="fw-bold">
                ${producto.precio.toLocaleString('es-CL')}
              </p>
              {/* Renderizado condicional: el texto (y el estilo) del botón
                  cambian según si el producto ya está en el carrito. */}
              {idsEnCarrito.includes(producto.id) ? (
                <button
                  type="button"
                  className="btn btn-outline-success mt-auto"
                  disabled
                >
                  ✓ En el carrito
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success mt-auto"
                  onClick={() => onAgregar(producto)}
                >
                  Agregar al carrito
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideojuegoList;
