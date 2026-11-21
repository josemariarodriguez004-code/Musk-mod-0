import { useId, useRef, useState } from 'react';
import TodoList from './TodoList';
import useTodos from './hooks/useTodos';
import { MAX_TASK_LENGTH } from './domain/todos';
import { localStorageRepository } from './adapters/localStorageRepository';

// La aplicación conecta el formulario, las tareas y el hook.
// repository permite probar el mismo flujo con almacenamiento de memoria.
export default function TodoApp({ repository = localStorageRepository }) {
  // El hook mantiene las tareas; el campo de texto tiene su propio estado
  // controlado, de modo que la interfaz refleja siempre lo escrito.
  const { tasks, error, storageWarning, addTask, completeTask, deleteTask } = useTodos(repository);
  const [inputValue, setInputValue] = useState('');
  const inputId = useId();
  const inputRef = useRef(null);
  // Son datos derivados de las tareas, no estados duplicados que sincronizar.
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0;

  function handleAddTask(event) {
    // Se evita recargar la página. Solo una tarea válida limpia el campo;
    // después se devuelve el foco para facilitar la siguiente entrada.
    event.preventDefault();
    if (addTask(inputValue)) setInputValue('');
    inputRef.current?.focus();
  }

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      {/* Cabecera compartida: identifica la aplicación y permite volver al inicio. */}
      <header className="site-header">
        <div className="page-width header-inner">
          <a className="brand" href="#" aria-label="Todo List, inicio">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <rect x="5" y="3.5" width="14" height="17" rx="3" />
                <path d="m8.5 12 2.3 2.3 4.8-4.8" />
              </svg>
            </span>
            <span>Todo List<small>Tu espacio para avanzar</small></span>
          </a>
          <span className="header-note"><span aria-hidden="true">●</span> Un paso cada vez</span>
        </div>
      </header>

      <main id="contenido" className="page-width" tabIndex={-1}>
        {/* El progreso y el resumen cambian al añadir, completar o eliminar tareas. */}
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">ORGANIZADOR PERSONAL</p>
            <h1 id="page-title">Todo List</h1>
            <p>Haz sitio a lo importante.<br />Anota tus tareas y celebra cada paso completado.</p>
          </div>
          <div className="hero-progress">
            <div><span>Tu progreso</span><strong>{progress}%</strong></div>
            <progress aria-label="Progreso de las tareas" value={completed} max={tasks.length || 1} />
            <p>{completed} de {tasks.length} tareas completadas</p>
          </div>
        </section>

        <div className="stats" aria-label="Resumen de tareas">
          <p><span>Tareas en tu lista</span><strong>{tasks.length}</strong></p>
          <p><span>Pendientes</span><strong>{pending}</strong></p>
          <p><span>Completadas</span><strong>{completed}</strong></p>
        </div>

        {/* Un fallo al guardar se comunica sin impedir el trabajo en memoria. */}
        {storageWarning && <p className="storage-warning" role="alert">{storageWarning} Puedes seguir trabajando en esta sesión.</p>}
        <div className="workspace">
          <section className="panel add-panel" aria-labelledby="add-title">
            <div className="panel-intro">
              <span className="panel-icon" aria-hidden="true">+</span>
              <div><h2 id="add-title">¿Qué quieres hacer?</h2><p>Empieza por una tarea concreta.</p></div>
            </div>
            {/* El formulario usa la validación del dominio. La etiqueta y los
                atributos ARIA relacionan el campo con la ayuda o el error. */}
            <form onSubmit={handleAddTask} noValidate>
              <label htmlFor={inputId}>Nueva tarea</label>
              <input
                ref={inputRef}
                id={inputId}
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                placeholder="Ej. Repasar la próxima lección"
                maxLength={MAX_TASK_LENGTH}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? inputId + '-error' : inputId + '-hint'}
              />
              {error && <p id={inputId + '-error'} className="form-error" role="alert">{error}</p>}
              <p id={inputId + '-hint'} className="input-hint">Hasta {MAX_TASK_LENGTH} caracteres.</p>
              <button className="add-button" type="submit"><span aria-hidden="true">+</span> Agregar Tarea</button>
            </form>
            <div className="form-tip">
              <strong>Pequeñas tareas, grandes avances.</strong>
              <p>Si algo parece demasiado grande, empieza por su primer paso.</p>
            </div>
          </section>

          <section className="panel list-panel" aria-labelledby="list-title">
            <div className="panel-intro">
              <span className="panel-icon" aria-hidden="true">✓</span>
              <div><h2 id="list-title">Tus tareas</h2><p>Márcalas al terminar o elimina las que ya no necesites.</p></div>
            </div>
            {/* El estado vacío orienta al usuario sin insertar tareas de ejemplo. */}
            {tasks.length === 0 && (
              <div className="empty-state">
                <div aria-hidden="true">
                  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="17" y="9" width="30" height="45" rx="6" />
                    <path d="M25 22h14M25 31h14M25 40h9" />
                    <circle cx="46" cy="46" r="11" fill="currentColor" stroke="none" />
                    <path d="m41 46 3.5 3.5L51 43" stroke="#fff" strokeWidth="2" />
                  </svg>
                </div>
                <h3>Una lista nueva, un buen comienzo</h3>
                <p>Añade tu primera tarea y empieza a avanzar.</p>
              </div>
            )}
            {/* Las props llevan los datos a la lista y los callbacks devuelven
                las acciones al hook que actualiza el estado del padre. */}
            <TodoList tasks={tasks} onToggle={completeTask} onDelete={deleteTask} />
            {tasks.length > 0 && <p className="list-hint">Pulsa el texto o la casilla para cambiar el estado.</p>}
          </section>
        </div>
      </main>
      {/* El pie informa de si los cambios pueden conservarse en el navegador. */}
      <footer className="page-width site-footer">
        <span>Todo List</span>
        <span>{storageWarning ? 'Cambios en la sesión actual' : 'Guardado en este navegador'}</span>
      </footer>
    </>
  );
}
