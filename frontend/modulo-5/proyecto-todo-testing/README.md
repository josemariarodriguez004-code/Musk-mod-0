# Todo List con pruebas automatizadas

Proyecto del Módulo 5. Aplicación React para agregar, completar, reabrir y eliminar
tareas. Incluye pruebas unitarias, de snapshot, integración y aceptación con
Jest y React Testing Library.

## Instalación y ejecución

Con Node.js 22.12 o superior, abre una terminal dentro de esta carpeta:

```bash
npm ci
npm test
npm run dev
```

Vite imprime la dirección local de la aplicación. Para compilar la versión de
producción:

```bash
npm run build
```

Para consultar la cobertura:

```bash
npm run test:coverage -- --runInBand
```

## Tipos de prueba

- **Unitaria:** `TodoItem.test.js` comprueba el texto recibido como propiedad.
- **Snapshot:** `TodoList.test.js` compara el fragmento del DOM con la referencia
  guardada en `tests/__snapshots__`. La comparación no evalúa píxeles ni estilos.
- **Integración:** `TodoApp.test.js` comprueba formulario, estado y lista:
  alta, validación, cambio de estado, eliminación y recuperación de datos.
- **Aceptación:** `TodoAppAcceptance.test.js` recorre acciones del usuario y
  verifica los cambios visibles.

`tests/setupTests.js` carga los matchers de jest-dom. Babel se configura en
`package.json` para interpretar JSX; Jest usa el entorno `jsdom`.
Los tests no necesitan conexión a una API.

## Organización

`TodoApp` compone el formulario y `TodoList`, que reutiliza `TodoItem`.
`useTodos` coordina el estado y recibe un repositorio con operaciones
`read` y `save`. El adaptador de localStorage implementa esas operaciones;
en pruebas puede sustituirse por un objeto controlado.

Las funciones de `domain/todos.js` actualizan listas sin modificarlas
directamente. La UI representa los datos y comunica acciones mediante
propiedades y callbacks. Se aplica una separación ligera inspirada en puertos
y adaptadores; la aplicación se construye y despliega como un único frontend.
El documento de arquitecturas compara otras opciones sin atribuirlas a esta
implementación.

## Datos y validación

El texto se recorta antes de crear una tarea. Un título vacío o con solo
espacios muestra un aviso y no se agrega. Las tareas quedan guardadas en
el mismo navegador y dirección mediante localStorage. Si este falla, la
aplicación avisa y permite seguir trabajando en memoria.

## Cómo explicar el proyecto

1. Un cambio del input modifica el estado del formulario.
2. Al enviar, se valida el texto y se solicita agregar la tarea.
3. El hook aplica la operación de dominio; React vuelve a renderizar la lista.
4. Un efecto guarda el nuevo estado mediante el repositorio.
5. Los tests realizan esas acciones y comparan el DOM con el resultado esperado.

Un snapshot distinto puede indicar un cambio válido o un error. Primero se
revisa la diferencia. Si el cambio es intencional, se actualiza con
`npm test -- -u` y se ejecutan de nuevo las pruebas.

## Referencias

- Enunciado: Proyecto Módulo 5, Escuela Musk.
- https://jestjs.io/docs/getting-started
- https://jestjs.io/docs/snapshot-testing
- https://testing-library.com/docs/react-testing-library/intro/

## Entrega y verificación

La ejecución verificada supera **12 pruebas en 4 suites** y compara **1 snapshot**
sin actualizarlo. El detalle y el alcance están en `evidencias/verificacion.json`.

Código fuente: https://github.com/josemariarodriguez004-code/Musk-mod-0/tree/main/frontend/modulo-5/proyecto-todo-testing
