import { fireEvent, render, screen } from '@testing-library/react';
import TodoApp from '../src/TodoApp';
import { agregarTarea } from './helpers';

beforeEach(() => {
  // Cada prueba empieza con un navegador vacío, sin tareas de otra prueba.
  localStorage.clear();
});

describe('TodoApp · integración entre formulario, estado y lista', () => {
  test('agregar una tarea la muestra y limpia el campo', () => {
    render(<TodoApp />);

    expect(agregarTarea('Nueva tarea')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Nueva tarea' })).toHaveValue('');
  });

  test.each(['', '   '])('rechaza una tarea vacía o con solo espacios: %j', texto => {
    render(<TodoApp />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Nueva tarea' }), {
      target: { value: texto },
    });
    fireEvent.click(screen.getByRole('button', { name: /agregar tarea/i }));

    expect(screen.getByRole('alert')).toHaveTextContent('Escribe una tarea antes de añadirla.');
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('completa una tarea concreta y elimina sin afectar a la otra', () => {
    render(<TodoApp />);
    const primera = agregarTarea('Primera tarea');
    const segunda = agregarTarea('Segunda tarea');

    fireEvent.click(screen.getByRole('checkbox', { name: 'Completar: Primera tarea' }));
    expect(primera).toHaveClass('completed');
    expect(segunda).not.toHaveClass('completed');
    expect(screen.getByRole('checkbox', { name: 'Reabrir: Primera tarea' })).toBeChecked();

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar: Primera tarea' }));
    expect(screen.queryByText('Primera tarea')).not.toBeInTheDocument();
    expect(screen.getByText('Segunda tarea')).toBeInTheDocument();
  });

  test('recorta espacios exteriores antes de guardar el texto', () => {
    render(<TodoApp />);
    agregarTarea('  Repasar Jest  ');

    expect(screen.getByText('Repasar Jest')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('recupera una tarea completada al volver a montar la aplicación', () => {
    const primeraVista = render(<TodoApp />);
    const tarea = agregarTarea('Conservar mi progreso');
    fireEvent.click(tarea);
    primeraVista.unmount();

    // Un nuevo montaje reproduce la recuperación del mismo navegador.
    render(<TodoApp />);
    expect(screen.getByText('Conservar mi progreso')).toHaveClass('completed');
    expect(screen.getByRole('checkbox', { name: 'Reabrir: Conservar mi progreso' })).toBeChecked();
  });

  test('muestra un aviso y sigue siendo utilizable si el almacenamiento falla', () => {
    const repository = {
      read: jest.fn(() => { throw new Error('Lectura bloqueada'); }),
      save: jest.fn(() => { throw new Error('Escritura bloqueada'); }),
    };
    render(<TodoApp repository={repository} />);
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudieron recuperar las tareas guardadas.');

    expect(agregarTarea('Seguir trabajando')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudieron guardar los cambios en este navegador.');
  });
});
