import React, { useState, useEffect } from "react";
import TodoActions from "./component/TodoActions";
import TodoStores from "./component/TodoStores";

function App() {
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

  return (
    <>
      <div className="container">
        <h1 className="display-4">Todo App In Flux</h1>
        <p className="lead ml-2">Todo app using Flux data flow pattern.</p>
        <div className="row">
          <div className="col-6">
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
          <div className="col-6">
            <table className="table">
              <tbody>
                {todos.count !== 0 &&
                  todos.map((todo, index) => (
                    // <div key={todo.id} className="card">
                    //   <ul className="list-group list-group-flush">
                    //     <li className="list-group-item">
                    //       <div className="form-check">
                    //         <input
                    //           className="form-check-input"
                    //           type="checkbox"
                    //           value=""
                    //           id="defaultCheck1"
                    //         />
                    //         <label
                    //           className="form-check-label"
                    //           htmlFor="defaultCheck1"
                    //         >
                    //           {todo.text}
                    //         </label>
                    //       </div>
                    //     </li>
                    //   </ul>
                    // </div>
                    <tr key={todo.id}>
                      <td>#{index + 1}</td>
                      <td
                        style={
                          todo.complete
                            ? { textDecoration: "line-through" }
                            : {}
                        }
                      >
                        {todo.text}
                      </td>
                      <td>
                        {!todo.complete ? (
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => handleComplete(todo.id)}
                          >
                            Complete
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
