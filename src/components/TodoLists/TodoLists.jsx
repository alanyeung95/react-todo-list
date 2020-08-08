import React from "react";
import { connect } from "react-redux";
import { List } from "../List";

class ConnectTodoLists extends React.Component {
  render() {
    // 上方的sort帶有一個函式和兩個參數，他們分別為目前索引值和下個索引值
    // 函式內的內容則是去比較兩者的大小，當該函式回傳的數值小於零時，就不會將他們調換位
    // 相反的如果回傳的數值大於零就會將他們兩個位置互換。
    this.props.data
      .sort((f, s) => {
        return f.important > s.important ? 1 : -1;
      })
      .sort((f, s) => {
        return f.complete > s.complete ? 1 : -1;
      });

    let todoCount = 0;
    let Lists = this.props.data.map((item) => {
      if (!item.complete) {
        todoCount++;
      }
      return <List key={item.id} listData={item} />;
    });

    return (
      <div>
        <div>{Lists}</div>
        <div class="countText">
          <span>{todoCount} tasks left</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { data: state };
};

const TodoLists = connect(mapStateToProps)(ConnectTodoLists);

export { TodoLists };
