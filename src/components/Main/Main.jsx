import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { TopBlock } from "../TopBlock";
import { MyTasks } from "../MyTasks";

import { todoListStore } from "../../store";
import { addTodoList } from "../../actions";

class Main extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <TopBlock />
          <Route exact path="/" component={MyTasks} />
        </div>
      </HashRouter>
    );
  }
}

// test redux state
// https://ithelp.ithome.com.tw/articles/10206364
window.store = todoListStore;
window.addTodoList = addTodoList;
// store.getState()
// store.dispatch(addTodoList({id: 3,name: "testing",date: "2018-10-19",time: "20:00",file: "",commit: "今天的目標是30分跑完6公里",important: "",complete: true,}))
export { Main };
