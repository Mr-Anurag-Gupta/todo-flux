import TodoActionTypes from "./TodoActionTypes";
import TodoDispatcher from "./TodoDispatcher";
import EventEmitter from "events";
import shortid from "shortid";

const CHANGE_EVENT = "change";
let tododb = [
  {
    id: shortid.generate(),
    complete: false,
    text: "Perform operations through OneIM for RACF mainframe system",
    date: new Date().toLocaleDateString(),
  },
  {
    id: shortid.generate(),
    complete: false,
    text: "Optimize the workdayhr source code for better performance",
    date: new Date().toLocaleDateString(),
  },
  {
    id: shortid.generate(),
    complete: true,
    text: "Update support after successfull smoke test in Production",
    date: new Date().toLocaleDateString(),
  },
  {
    id: shortid.generate(),
    complete: false,
    text:
      "Update support on SFSHR feature to add dateOfBirth field to employees endpoint",
    date: new Date().toLocaleDateString(),
  },
  {
    id: shortid.generate(),
    complete: false,
    text:
      "Update support on SFSHR feature to return future-dated rehires along with prehire and existing employees records (employees endpoint)",
    date: new Date().toLocaleDateString(),
  },
  {
    id: shortid.generate(),
    complete: true,
    text:
      "Update support on SFSHR feature to configure custom attributes for all the objects",
    date: new Date().toLocaleDateString(),
  },
];

let history = [...tododb];

class Store extends EventEmitter {
  static dispatchToken;

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    return this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    return this.emit(CHANGE_EVENT);
  }

  static getDispatchToken() {
    return Store.dispatchToken;
  }

  getTodos() {
    return tododb;
  }

  getHistories() {
    return history;
  }
}

const store = new Store();

store.dispatchToken = TodoDispatcher.register((action) => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      // debugger;
      // Don't add todos with no text.
      if (!action.text) return;
      const todo = {
        id: shortid.generate(),
        complete: false,
        text: action.text,
        date: new Date().toLocaleDateString(),
      };
      tododb = tododb.concat(todo);
      history = history.concat(todo);
      store.emitChange();
      break;
    case TodoActionTypes.TOGGLE_TODO:
      tododb = tododb.map((_todo) =>
        _todo.id === action.id
          ? { id: _todo.id, complete: !_todo.complete, text: _todo.text }
          : _todo
      );
      store.emitChange();
      break;
    case TodoActionTypes.DELETE_TODO:
      tododb = tododb.filter((todo) => todo.id !== action.id);
      store.emitChange();
      break;
    default:
    // do nothing.
  }
});

export default store;
