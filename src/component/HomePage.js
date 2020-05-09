import React, { useState, useEffect } from "react";
import TodoActions from "./TodoActions";
import TodoStores from "./TodoStores";
import TodoList from "./TodoList";

function HomePage() {
  const [todos, setTodos] = useState(TodoStores.getTodos());
  const [todo, setTodo] = useState("");

  useEffect(() => {
    TodoStores.addChangeListener(onChange);
    return () => TodoStores.removeChangeListener(onChange);
  }, [todos]);

  function onChange() {
    // debugger;
    setTodos(TodoStores.getTodos());
  }

  function handleSubmit(event) {
    event.preventDefault();
    // debugger;
    TodoActions.addTodo(todo);
    setTodo("");
  }

  function handleComplete(id) {
    TodoActions.toggleTodo(id);
  }

  function handleDelete(id) {
    TodoActions.deleteTodo(id);
  }

  return (
    <>
      <div className="container">
        <h1 className="display-4">Todo App In Flux</h1>
        <p className="lead ml-2">Todo app using Flux data flow pattern.</p>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-10">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="todo"
                  value={todo}
                  onChange={(event) => setTodo(event.target.value)}
                  placeholder="Enter Todo Task"
                />
              </div>
              <button className="btn btn-outline-secondary">Add Todo</button>
            </form>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-sm-12 col-md-10">
            <TodoList
              todos={todos}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
