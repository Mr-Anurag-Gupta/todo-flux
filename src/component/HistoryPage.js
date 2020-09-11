import React, { useState, useEffect } from "react";
import TodoStores from "./TodoStores";

function HistoryPage() {
  const [history, setHistory] = useState(TodoStores.getHistories());

  useEffect(() => {
    TodoStores.addChangeListener(onChange);
    return () => TodoStores.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setHistory(TodoStores.getHistories());
  }

  return (
    <div className="container">
      <h1 className="display-4">History</h1>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-10">
          <ul>
            {history.map((todo) => (
              <li key={todo.id}>
                <i>[{todo.date}]</i> {todo.text}{" "}
                <span
                  className={
                    "alert " + todo.complete ? "alert-success" : "alert-danger"
                  }
                >
                  {todo.complete ? "Completed" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
