import { useState } from 'react';

/**
 * VideojuegoForm
 * Adaptamos el formulario de la guía (que agregaba videojuegos nuevos
 * al catálogo) a la funcionalidad real del proyecto: un buscador que
 * filtra el catálogo por nombre o consola, igual que en el lab 6.
 *
 * El valor del input se controla con su propio useState local: así
 * el input siempre refleja el estado de React (input controlado)
 *
 * Props:
 *  - onBuscar: función que App.jsx pasa para recibir el término
 *    de búsqueda cuando se envía el formulario (evento submit).
 *  - onLimpiar: función que App.jsx pasa para limpiar la búsqueda.
 */
function VideojuegoForm({ onBuscar, onLimpiar }) {
  const [termino, setTermino] = useState('');

  const manejarSubmit = (evento) => {
    evento.preventDefault();
    onBuscar(termino.trim().toLowerCase());
  };

  const manejarLimpiar = () => {
    setTermino('');
    onLimpiar();
  };

  return (
    <form onSubmit={manejarSubmit} className="row g-2 justify-content-center" role="search">
      <div className="col-12 col-md-6">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar por nombre o consola (ej: Mario, SNES)"
          aria-label="Buscar producto"
          value={termino}
          onChange={(evento) => setTermino(evento.target.value)}
        />
      </div>
      <div className="col-6 col-md-2">
        <button type="submit" className="btn btn-primary w-100">
          Buscar
        </button>
      </div>
      <div className="col-6 col-md-2">
        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={manejarLimpiar}
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}

export default VideojuegoForm;
