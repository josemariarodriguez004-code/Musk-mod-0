import { fireEvent, render, screen } from '@testing-library/react';
import TodoApp from '../src/TodoApp';
import { agregarTarea } from './helpers';

beforeEach(() => localStorage.clear());

describe('TodoApp · aceptación del flujo de usuario', () => {
  test('permite agregar, completar, reabrir y eliminar una tarea', () => {
    render(<TodoApp />);

    // 1. La persona escribe y agrega su tarea desde el formulario.
    const task = agregarTarea('Tarea importante');
    expect(task).toBeInTheDocument();
    expect(task).not.toHaveClass('completed');

    // 2. El clic en el texto reproduce la interacción del ejemplo del enunciado.
    fireEvent.click(task);
    expect(task).toHaveClass('completed');
    expect(screen.getByRole('checkbox', { name: 'Reabrir: Tarea importante' })).toBeChecked();

    // 3. Puede desmarcarla sin perderla y después eliminarla.
    fireEvent.click(screen.getByRole('checkbox', { name: 'Reabrir: Tarea importante' }));
    expect(task).not.toHaveClass('completed');
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar: Tarea importante' }));
    expect(screen.queryByText('Tarea importante')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
