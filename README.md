# Bastian-RetroZone (versión React)

Migración a **React + Vite** del proyecto Bastian-RetroZone, para la actividad sumativa Semana 8 de Desarrollo Frontend I (PFY2201): *"Mejorando funcionalidades clave en el eCommerce con React"*.

Continúa el proyecto de la Semana 6 (HTML + Bootstrap + JavaScript vanilla), reimplementado con componentes funcionales, `useState`, `useEffect` y renderizado condicional.

> Proyecto con fines académicos. La tienda es ficticia y el botón "Comprar" solo muestra un aviso de tienda cerrada.

## Enlaces

- **Sitio publicado:** <https://bastianvaldivia.github.io/react-videojuegos/>
- **Repositorio:** <https://github.com/BastianValdivia/react-videojuegos>

## Tecnologías

- [React 19](https://react.dev/) con [Vite](https://vitejs.dev/)
- Bootstrap 5 (instalado por npm, no por CDN)
- `fetch` + Hooks (`useState`, `useEffect`) para cargar datos y manejar errores
- `gh-pages` para publicar en GitHub Pages

## Cómo ejecutarlo en local

```bash
npm install
npm run dev
```

Abrí la URL que indique la terminal (por defecto <http://localhost:5173>).

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Despliegue en GitHub Pages

El sitio se publica desde la rama `gh-pages`, que contiene solo la carpeta `dist` generada por Vite. La rama `main` guarda el código fuente.

- `vite.config.js` define `base: '/react-videojuegos/'`, porque GitHub Pages sirve el proyecto en una subcarpeta con el nombre del repositorio.
- El paquete `gh-pages` (dependencia de desarrollo) hace la publicación.
- Scripts en `package.json`:
  - `predeploy`: ejecuta `npm run build` automáticamente.
  - `deploy`: ejecuta `gh-pages -d dist`, que sube `dist` a la rama `gh-pages`.

Para actualizar el sitio después de hacer cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push
npm run deploy
```

En GitHub, en *Settings → Pages*, el origen está configurado como *Deploy from a branch*, rama `gh-pages`, carpeta `/ (root)`.

## Estructura del proyecto

```
react-videojuegos/
├── index.html
├── public/
│   ├── img/            # Imágenes de los productos
│   └── fonts/          # Tipografía Nasalization
├── snapshots/          # Capturas de pantalla para la entrega solicitadas en la guia
└── src/
    ├── main.jsx            # Punto de entrada; importa Bootstrap (CSS y JS)
    ├── App.jsx             # Componente raíz: estados y orquestación
    ├── index.css           # Estilos propios (los del lab 6)
    ├── data/
    │   └── productos.json  # Catálogo de productos (mismo que el lab 6)
    └── components/
        ├── Header.jsx
        ├── VideojuegoForm.jsx
        ├── VideojuegoList.jsx
        └── Carrito.jsx
```

## Componentes y estado

| Componente | Props | Qué hace |
|---|---|---|
| `Header` | — | Encabezado de bienvenida |
| `VideojuegoForm` | `onBuscar`, `onLimpiar` | Buscador con su propio `useState` para el input controlado. Al enviar el formulario (evento `submit`), avisa a `App` con el término de búsqueda |
| `VideojuegoList` | `productos`, `onAgregar` | Recorre el catálogo filtrado con `.map()` y dibuja las cards. Cada botón llama a `onAgregar(producto)` |
| `Carrito` | `items`, `onEliminar` | Lista los productos agregados, con cantidad y total. Cada fila tiene un botón "Quitar" |

El estado vive centralizado en `App.jsx` y baja a los hijos por props (patrón *lifting state up*):

- `productos`: catálogo completo, cargado por `useEffect`.
- `cargando` / `error`: estado de la carga de datos.
- `terminoBusqueda`: texto del buscador.
- `carrito`: productos agregados, con su cantidad.
- `textoBotonComprar`: el "elemento interactivo que cambia de texto al hacer clic" — el botón de compra pasa de "Comprar" a "Tienda cerrada".

## Carga de datos (`useEffect` + Fetch API)

Al montar `App` (arreglo de dependencias `[]`, equivalente a `ngOnInit`), se simula la carga de datos desde una fuente externa haciendo `fetch` sobre el archivo JSON local (`src/data/productos.json`). Si falla, se guarda un mensaje de error en el estado y se muestra con renderizado condicional, igual que en el lab 6.

## Renderizado condicional

- Mientras se cargan los productos: mensaje "Cargando productos...".
- Si falla la carga: mensaje de error en rojo.
- Catálogo (filtrado) sin resultados: mensaje de "no se encontraron productos".
- Carrito vacío vs. carrito con productos (con total y botón "Quitar" por ítem).

## Accesibilidad

- `lang="es"` y jerarquía de títulos ordenada.
- `alt` descriptivo en las imágenes de productos.
- Buscador con `role="search"` y `aria-label`.
- Resumen del carrito con `aria-live="polite"`.
- Botón "Quitar" con `aria-label` que incluye el nombre del producto.
- Modal de Bootstrap con `aria-labelledby`.