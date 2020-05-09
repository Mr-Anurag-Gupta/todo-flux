import React from "react";

const TodoList = (props) => {
  const { todos } = props;
  return (
    <table className="table">
      <tbody>
        {todos.count !== 0 &&
          todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>#{index + 1}</td>
              <td
                style={todo.complete ? { textDecoration: "line-through" } : {}}
              >
                {todo.text}
              </td>
              <td>
                {!todo.complete ? (
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => props.onComplete(todo.id)}
                  >
                    Complete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => props.onDelete(todo.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TodoList;
