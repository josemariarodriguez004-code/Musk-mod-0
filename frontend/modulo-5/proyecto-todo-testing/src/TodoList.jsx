import TodoItem from './TodoItem';

// Reutiliza TodoItem. Los objetos del estado tienen IDs estables; los índices
// solo se usan para los textos de la lista de demostración del enunciado.
export default function TodoList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="todo-list" aria-label="Lista de tareas">
      {tasks.map((task, index) => (
        <TodoItem
          key={typeof task === 'string' ? index : task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
