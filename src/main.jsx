import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Bootstrap 5: hoja de estilos y bundle de JS (este último habilita
// componentes interactivos como el modal, que usan data-bs-toggle).
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Estilos propios del proyecto (los mismos ajustes del lab 6).
import './index.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
