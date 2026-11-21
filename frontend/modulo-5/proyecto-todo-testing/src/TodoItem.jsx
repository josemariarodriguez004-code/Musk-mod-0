// La prop task admite el texto sencillo del enunciado o una tarea con estado.
// Sin callbacks, el componente sirve también para representar listas de lectura.
export default function TodoItem({ task, onToggle, onDelete }) {
  const item = typeof task === 'string'
    ? { text: task, completed: false }
    : task;
  const text = <span className={'task-text' + (item.completed ? ' completed' : '')}>{item.text}</span>;

  return (
    <li className={'todo-item' + (item.completed ? ' todo-item-completed' : '')}>
      {onToggle ? (
        <label className="task-toggle">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
            aria-label={(item.completed ? 'Reabrir: ' : 'Completar: ') + item.text}
          />
          {text}
        </label>
      ) : text}
      {onDelete && (
        <button
          type="button"
          className="delete-task"
          aria-label={'Eliminar: ' + item.text}
          onClick={() => onDelete(item.id)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7M14 10v7" />
          </svg>
          Eliminar
        </button>
      )}
    </li>
  );
}
