// El dominio contiene reglas independientes de React y del almacenamiento.
export const MAX_TASK_LENGTH = 120;

// Limpia y valida la entrada antes de construir una tarea pendiente.
export function createTask(text, id) {
  const cleanText = text.trim();
  if (!cleanText) throw new Error('Escribe una tarea antes de añadirla.');
  if (cleanText.length > MAX_TASK_LENGTH) {
    throw new Error('La tarea no puede superar los 120 caracteres.');
  }
  return { id, text: cleanText, completed: false };
}

// Estas operaciones devuelven un array nuevo y conservan los datos originales.
// Cambia únicamente el estado de la tarea cuyo ID coincide.
export function toggleTask(tasks, id) {
  return tasks.map(task => task.id === id
    ? { ...task, completed: !task.completed }
    : task);
}

// Excluye la tarea seleccionada y mantiene todas las demás.
export function removeTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}

// Se comprueba el formato tanto del adaptador real como de uno inyectado.
export function normalizeTasks(value) {
  if (!Array.isArray(value)) throw new Error('Formato de tareas incorrecto.');
  const ids = new Set();
  return value.map(task => {
    if (
      !task || typeof task.id !== 'string' || !task.id || ids.has(task.id) ||
      typeof task.text !== 'string' || !task.text.trim() ||
      task.text.length > MAX_TASK_LENGTH || typeof task.completed !== 'boolean'
    ) {
      throw new Error('Formato de tareas incorrecto.');
    }
    ids.add(task.id);
    return { id: task.id, text: task.text, completed: task.completed };
  });
}
