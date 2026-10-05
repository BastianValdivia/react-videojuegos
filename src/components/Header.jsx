/**
 * Header
 * Componente funcional simple que muestra
 * el encabezado de bienvenida del sitio
 */
function Header() {
  return (
    <header className="header-bienvenida text-white text-center py-4 px-3">
      <h1 className="mb-2 titulo-principal">BASTIAN-RETROZONE</h1>
      <p className="mb-0 px-3">
        Bienvenido a Bastian-RetroZone, tu tienda de videojuegos retro favorita.
        Descubre los títulos más icónicos para Nintendo 64, PlayStation, Sega
        Genesis, SNES, Game Boy y Dreamcast.
      </p>
    </header>
  );
}

export default Header;
