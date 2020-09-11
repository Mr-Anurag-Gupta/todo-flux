import TodoDispatcher from "./TodoDispatcher";
import TodoActionTypes from "./TodoActionTypes";

const Actions = {
  addTodo(text) {
    // debugger;
    TodoDispatcher.dispatch({
      type: TodoActionTypes.ADD_TODO,
      text,
    });
  },
  toggleTodo(id) {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.TOGGLE_TODO,
      id,
    });
  },
  deleteTodo(id) {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.DELETE_TODO,
      id,
    });
  },
};

export default Actions;
