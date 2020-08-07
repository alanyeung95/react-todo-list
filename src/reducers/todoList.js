import { todoData } from "../constants/todoList.js";
import { ADD_TODOLIST } from "../constants/todoAction-type.js";

// Reducers specify how the application's state changes in response to actions sent to the store.

// first argument is the initial state
const todoListReducer = (state = todoData, action) => {
  switch (action.type) {
    case ADD_TODOLIST: {
      // id值可以跟著長度一直累加是因為todolost沒有刪除功能，如果有的話就會出現單號重複的狀況，無法這樣做！
      action.payload.id = state.length + 1;
      return [...state, action.payload];
    }
    default: {
      return state;
    }
  }
};

export { todoListReducer };
