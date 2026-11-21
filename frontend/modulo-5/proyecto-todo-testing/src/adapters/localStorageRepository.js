export const STORAGE_KEY = 'proyecto-modulo-5:todos:v1';

// Adaptador de navegador: cumple el contrato read() / save(tasks).
// Los errores se propagan al hook para mostrarlos en la interfaz.
export const localStorageRepository = {
  read() {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === null ? [] : JSON.parse(saved);
  },
  save(tasks) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },
};
