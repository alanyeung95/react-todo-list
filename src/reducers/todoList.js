import { todoData } from "../constants/todoList.js";
import { ADD_TODOLIST } from "../constants/todoAction-type.js";
import { EDIT_TODOLIST } from "../constants/todoAction-type.js";

// Reducers specify how the application's state changes in response to actions sent to the store.
// first argument is the initial state
const todoListReducer = (state = todoData, action) => {
  switch (action.type) {
    case ADD_TODOLIST: {
      // id值可以跟著長度一直累加是因為todolost沒有刪除功能，如果有的話就會出現單號重複的狀況，無法這樣做！
      action.payload.id = state.length + 1;
      return [...state, action.payload];
    }
    case EDIT_TODOLIST: {
      //先以目前的資料去複製另一個全新的陣列
      let newState = state.slice(0);
      //下迴圈比對id值
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.payload.id) {
          //將新的資料用splice()取代原本的位置中的資料
          newState.splice(i, 1, action.payload);
          break;
        }
      }
      //回傳處理後的新資料
      return newState;
    }
    default: {
      return state;
    }
  }
};

export { todoListReducer };
