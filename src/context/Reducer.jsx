export const Reducer = (state, action) => {

  switch (action.type) {
    case "ADD_TO_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length === 0 ? 1 : state.todos[state.todos.length - 1].id + 1,
            title: action.payload.title,
            complete: action.payload.status === "COMPLETED",
            date: new Date().toISOString()
          }
        ]
      }
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => todo.id === action.payload ? { ...todo, complete: !todo.complete} : todo)
      }
    case "DELETE_TO_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id != action.payload)
      }
    case "UPDATE_TO_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title, complete: action.payload.status === "COMPLETED" }
            : todo
        ),
      };
    default:
      return state;
  }
}


const saveToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
