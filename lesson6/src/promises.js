const todosUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

export function fetchTodosWithPromises() {
    return fetch(todosUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return response.json();
        })
        .then(todos => processTodos(todos));
}

function processTodos(todos) {
    return todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed
    }));
}
