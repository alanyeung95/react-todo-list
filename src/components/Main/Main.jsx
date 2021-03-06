import React from "react";
// TOSTUDY
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";

import { TopBlock } from "../TopBlock";
import { MyTasks } from "../MyTasks";
import { todoListStore } from "../../store";
import { addTodoList } from "../../actions";
import { InProgress } from "../InProgress";
import { Completed } from "../Completed";

class Main extends React.Component {
  render() {
    return (
      // The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.
      // Since any React component in a React Redux app can be connected, most applications will render a <Provider> at the top level, with the entire app’s component tree inside of it.
      <Provider store={todoListStore}>
        <HashRouter>
          <div>
            <TopBlock />
            <Route exact path="/" component={MyTasks} />
            <Route exact path="/inProgress" component={InProgress} />
            <Route exact path="/completed" component={Completed} />
          </div>
        </HashRouter>
      </Provider>
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
