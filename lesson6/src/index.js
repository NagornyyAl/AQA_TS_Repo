import { fetchTodosWithPromises } from './promises.js';
import { fetchTodosWithAsyncAwait } from './async-await.js';
import { fetchWithFallback } from './try-catch.js';

console.log('--------promises--------');
const promiseTodos = await fetchTodosWithPromises();
console.log(promiseTodos);

console.log('--------async-await--------');
const asyncAwaitTodos = await fetchTodosWithAsyncAwait();
console.log(asyncAwaitTodos);

console.log('--------try-catch--------');
const fallbackTodos = await fetchWithFallback();
console.log(fallbackTodos);
