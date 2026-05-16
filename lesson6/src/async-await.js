const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

export async function fetchTodosWithAsyncAwait() {
    const response = await fetch(todosUrl);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const todos = await response.json();

    return processTodos(todos);
}

function processTodos(todos) {
    return todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed
    }));
}
