import { fireEvent, render, screen } from '@testing-library/react';
import TodoItem from '../src/TodoItem';

describe('TodoItem · prueba unitaria', () => {
  test('muestra la tarea recibida como prop', () => {
    render(<ul><TodoItem task="Aprender Jest" /></ul>);

    // El componente aislado debe presentar exactamente el texto recibido.
    expect(screen.getByText(/Aprender Jest/i)).toBeInTheDocument();
  });

  test('comunica el identificador al marcar y eliminar una tarea', () => {
    const task = { id: 'tarea-1', text: 'Revisar el proyecto', completed: false };
    const onToggle = jest.fn();
    const onDelete = jest.fn();
    render(<ul><TodoItem task={task} onToggle={onToggle} onDelete={onDelete} /></ul>);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Completar: Revisar el proyecto' }));
    expect(onToggle).toHaveBeenCalledWith('tarea-1');

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar: Revisar el proyecto' }));
    expect(onDelete).toHaveBeenCalledWith('tarea-1');
  });
});
