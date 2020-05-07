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
  },
  {
    id: shortid.generate(),
    complete: false,
    text: "Optimize the workdayhr source code for better performance",
  },
  {
    id: shortid.generate(),
    complete: true,
    text: "Update support after successfull smoke test in Production",
  },
];

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
}

const store = new Store();

store.dispatchToken = TodoDispatcher.register((action) => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      // debugger;
      // Don't add todos with no text.
      if (!action.text) return;
      tododb = tododb.concat({
        id: shortid.generate(),
        complete: false,
        text: action.text,
      });
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
      break;
    default:
    // do nothing.
  }
});

export default store;
