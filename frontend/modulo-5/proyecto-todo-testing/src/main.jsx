import { createRoot } from 'react-dom/client';
import TodoApp from './TodoApp';
import './styles.css';

// Punto de entrada del navegador. Las pruebas importan los componentes solos.
createRoot(document.getElementById('root')).render(<TodoApp />);
