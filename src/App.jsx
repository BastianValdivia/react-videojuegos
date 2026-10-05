import { useState, useEffect } from 'react';

import Header from './components/Header.jsx';
import VideojuegoForm from './components/VideojuegoForm.jsx';
import VideojuegoList from './components/VideojuegoList.jsx';
import Carrito from './components/Carrito.jsx';

/**
 * App
 * Componente raíz. Reúne todos los estados de la aplicación y los
 * pasa como props a los componentes hijos (Header, VideojuegoForm,
 * VideojuegoList, Carrito).
 */
function App() {
  // Catálogo completo de productos, cargado por el useEffect de abajo.
  const [productos, setProductos] = useState([]);

  // Estados de la carga de datos (equivalente a lo que en el lab 6
  // hacía el try/catch de cargarProductos()).
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Término de búsqueda escrito en el formulario.
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Productos agregados al carrito.
  const [carrito, setCarrito] = useState([]);

  // El "elemento interactivo que cambie de texto al hacer clic" que
  // pide la actividad: el botón de compra del modal.
  const [textoBotonComprar, setTextoBotonComprar] = useState('Comprar');

  // useEffect con arreglo de dependencias vacío ([]): se ejecuta una
  // sola vez, cuando App se monta por primera vez.

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch(
          `${import.meta.env.BASE_URL}data/productos.json`
        );

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // Las rutas de imagen en productos.json son relativas (ej.
        // "img/m64.png"), así que acá les anteponemos el BASE_URL
        // para que apunten al lugar correcto tanto en local como
        // una vez publicado en la subcarpeta de GitHub Pages.
        const datosConRutasCompletas = datos.map((producto) => ({
          ...producto,
          imagen: `${import.meta.env.BASE_URL}${producto.imagen}`,
        }));

        setProductos(datosConRutasCompletas);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError(
          'No se pudieron cargar los productos en este momento. Por favor, intenta nuevamente más tarde.'
        );
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  // Filtra el catálogo según el término de búsqueda. No hace falta
  // guardarlo en un estado aparte: se recalcula en cada render a
  // partir de "productos" y "terminoBusqueda".
  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(terminoBusqueda) ||
      producto.consola.toLowerCase().includes(terminoBusqueda)
  );

  /**
   * Agrega un producto al carrito. Nunca mutamos el estado
   * directamente (nada de carrito.push): siempre se construye un
   * arreglo nuevo con setCarrito, que es lo que le indica a React
   * que debe volver a renderizar.
   */
  function agregarAlCarrito(producto) {
    const yaEstaEnElCarrito = carrito.find((item) => item.id === producto.id);

    if (yaEstaEnElCarrito) {
      // Si ya existe, solo le sumamos 1 a su cantidad.
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      // Si es nuevo, lo agregamos con cantidad 1.
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  }

  /**
   * Elimina por completo un producto del carrito (sin importar la
   * cantidad), usando filter para construir un arreglo nuevo sin él.
   */
  function eliminarDelCarrito(idProducto) {
    setCarrito(carrito.filter((item) => item.id !== idProducto));
  }

  // Cantidad total de unidades en el carrito, para el contador del navbar.
  const cantidadEnCarrito = carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0
  );

  /**
   * Maneja el click en el botón "Comprar" del modal: cambia su texto
   * como ejemplo del "elemento interactivo" que pide la actividad.
   * La tienda sigue sin vender nada, es solo un proyecto académico.
   */
  function manejarClickComprar() {
    setTextoBotonComprar('Tienda cerrada');
  }

  return (
    <>
      <Header />

      <nav className="navbar navbar-expand-lg navbar-dark navbar-retro border-top border-white sticky-top">
        <div className="container-fluid">
          <span className="navbar-brand">🕹️ Bastian-RetroZone</span>
          <span className="text-white">
            🛒 Carrito{' '}
            <span className="badge bg-danger rounded-pill ms-1">
              {cantidadEnCarrito}
            </span>
          </span>
        </div>
      </nav>

      <main className="container my-4">
        <section className="mb-4">
          <VideojuegoForm
            onBuscar={setTerminoBusqueda}
            onLimpiar={() => setTerminoBusqueda('')}
          />
        </section>

        <section>
          <h2 className="mb-3">Productos destacados</h2>

          {/* Renderizado condicional según el estado de la carga */}
          {cargando && <p className="text-muted">Cargando productos...</p>}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!cargando && !error && (
            <VideojuegoList
              productos={productosFiltrados}
              onAgregar={agregarAlCarrito}
              idsEnCarrito={carrito.map((item) => item.id)}
            />
          )}
        </section>

        <aside className="mt-4">
          <div className="card">
            <div className="card-header">
              <h2 className="h5 mb-0">Carrito de compras</h2>
            </div>
            <Carrito items={carrito} onEliminar={eliminarDelCarrito} />
            <div className="card-footer text-end">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalComprar"
                onClick={manejarClickComprar}
              >
                {textoBotonComprar}
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Modal de Bootstrap: se abre con data-bs-toggle, igual que en el lab 6 */}
      <div
        className="modal fade"
        id="modalComprar"
        tabIndex="-1"
        aria-labelledby="modalComprarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="modalComprarLabel">
                Finalizar compra
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">
                Lo sentimos. La tienda se encuentra cerrada temporalmente. No
                es posible realizar compras en este momento.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setTextoBotonComprar('Comprar')}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white pt-4 pb-3 mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h2 className="h5">Contacto</h2>
              <p className="mb-1">Email: contacto@bastian-retrozone.cl</p>
              <p className="mb-0">Teléfono: +56 9 1234 5678</p>
            </div>
            <div className="col-md-6 mb-3">
              <h2 className="h5">Horario de atención</h2>
              <p className="mb-1">Lunes a viernes: 10:00 - 19:00 hrs</p>
              <p className="mb-0">Sábado: 10:00 - 14:00 hrs</p>
            </div>
          </div>
          <p className="text-center mb-0">
            &copy; 2026 Bastian-RetroZone. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
