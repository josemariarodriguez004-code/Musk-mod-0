import { render, screen } from '@testing-library/react';
import TodoList from '../src/TodoList';

describe('TodoList · prueba de snapshot', () => {
  test('genera el snapshot de la lista de dos tareas', () => {
    const tasks = ['Tarea 1', 'Tarea 2'];
    const { asFragment } = render(<TodoList tasks={tasks} />);

    // La referencia se guarda en __snapshots__. Un cambio del DOM exige revisión.
    expect(asFragment()).toMatchSnapshot();
  });

  test('conserva el texto y el orden de las tareas', () => {
    render(<TodoList tasks={['Primera tarea', 'Segunda tarea']} />);

    expect(screen.getAllByRole('listitem').map(item => item.textContent))
      .toEqual(['Primera tarea', 'Segunda tarea']);
  });
});
