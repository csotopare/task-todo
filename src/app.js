import './css/styles.css';
if (process.env.NODE_ENV === "development") {
   require("./index.html");
}

import {
   Todo,
   TodoList,
   crearTodoHtml,
   countHtml
} from './js';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml); // (todo) => crearTodoHtml(todo) - Cuando tenemos dos argumentos iguales también podemos usar solo (creandoTodoHtml)