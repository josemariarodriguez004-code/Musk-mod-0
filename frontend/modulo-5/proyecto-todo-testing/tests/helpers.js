import { fireEvent, screen, within } from '@testing-library/react';

// Una acción compartida evita repetir la búsqueda y escritura del formulario.
export function agregarTarea(texto) {
  fireEvent.change(screen.getByRole('textbox', { name: 'Nueva tarea' }), {
    target: { value: texto },
  });
  fireEvent.click(screen.getByRole('button', { name: /agregar tarea/i }));
  // La búsqueda queda limitada a la lista: el texto puede coincidir con el label.
  return within(screen.getByRole('list', { name: 'Lista de tareas' })).getByText(texto.trim());
}
