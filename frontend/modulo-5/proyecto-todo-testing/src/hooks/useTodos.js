import { useEffect, useState } from 'react';
import { createTask, normalizeTasks, removeTask, toggleTask } from '../domain/todos';

// El hook coordina reglas, estado y persistencia. Un repositorio de memoria
// puede sustituir al navegador en los tests manteniendo el mismo contrato.
export default function useTodos(repository) {
  const [initial] = useState(() => {
    try {
      return { tasks: normalizeTasks(repository.read()), warning: '' };
    } catch {
      return { tasks: [], warning: 'No se pudieron recuperar las tareas guardadas.' };
    }
  });
  const [tasks, setTasks] = useState(initial.tasks);
  const [storageWarning, setStorageWarning] = useState(initial.warning);
  const [error, setError] = useState('');

  useEffect(() => {
    // Al montar no se sobrescriben los datos: se guarda tras una acción.
    if (tasks === initial.tasks) return;
    try {
      repository.save(tasks);
      setStorageWarning('');
    } catch {
      setStorageWarning('No se pudieron guardar los cambios en este navegador.');
    }
  }, [tasks, initial.tasks, repository]);

  function addTask(text) {
    try {
      const id = globalThis.crypto?.randomUUID?.()
        ?? Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
      const task = createTask(text, id);
      setTasks(previous => [...previous, task]);
      setError('');
      return true;
    } catch (validationError) {
      setError(validationError.message);
      return false;
    }
  }

  function completeTask(id) {
    setTasks(previous => toggleTask(previous, id));
  }

  function deleteTask(id) {
    setTasks(previous => removeTask(previous, id));
  }

  return { tasks, error, storageWarning, addTask, completeTask, deleteTask };
}
