import React from "react";
import { connect } from "react-redux";

import { InputTask } from "../InputTask";
import { editTodoList } from "../../actions";

class ConnectList extends React.Component {
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    //在constructor中指定執行時的this
    this.updateTodolist = this.updateTodolist.bind(this);

    this.state = {
      // 然後因為在顯示事項的時候，也可以同時標記已完成和是否重要
      // state只需要紀錄會變化的資料，所以只填寫兩個欄位，其他固定無法修改的就用props處理。
      important: this.props.listData.important,
      complete: this.props.listData.complete,
      editTasks: null,
    };

    this.list = React.createRef();
  }

  changeState(type) {
    switch (type) {
      case "complete": {
        this.setState(
          { complete: window.event.target.checked },
          this.updateTodolist
        );
        break;
      }
      case "important": {
        if (this.state.important == "")
          this.setState({ important: "Y" }, this.updateTodolist);
        else this.setState({ important: "" }, this.updateTodolist);
        break;
      }
    }
  }

  openEdit(event) {
    // 從event判斷如果class不含fa-star和taskChk才顯示編輯畫面
    if (
      event.target.className.indexOf("fa-star") === -1 &&
      event.target.className.indexOf("taskChk") === -1
    ) {
      this.list.current.style.display = "none";

      this.setState({
        editTasks: (
          <InputTask
            closeAdd={this.closeEdit}
            listData={this.props.listData}
            changeState={this.changeState.bind(this)}
            editTodoList={this.props.editTodoList}
          />
        ),
      });
    }
  }

  closeEdit() {
    this.list.current.style.display = "";
    this.setState({ editTasks: null });
  }

  updateTodolist() {
    //複製一份新的物件，為該代辦事項的資料
    let updateList = Object.assign({}, this.props.listData);
    //用之前學過的解構賦值把complete和important兩個欄位替換成state的值
    updateList = {
      ...updateList,
      complete: this.state.complete,
      important: this.state.important,
    };
    //透過editTodoList丟到redux更新
    this.props.editTodoList(updateList);
  }

  render() {
    return (
      <div class="listBlock">
        <div
          class={" list " + (this.state.important == "Y" ? " important " : "")}
          onClick={this.openEdit}
          ref={this.list}
        >
          > >
          <input
            type="checkbox"
            class="taskChk"
            checked={this.state.complete}
            onChange={this.changeState.bind(this, "complete")}
          />
          <input
            type="text"
            class={
              " taskTitle " +
              (this.state.complete ? " complete " : "") +
              (this.state.important ? " important " : "")
            }
            value={this.props.listData.name}
          />
          <i
            class={
              this.state.important == "Y"
                ? " fas fa-star fa-lg iconImportant icon"
                : " far fa-star fa-lg icon"
            }
            onClick={this.changeState.bind(this, "important")}
          ></i>
          <i class="fas fa-pen fa-lg icon"></i>
          <div class="listIcon">
            {this.props.listData.date != "" ? (
              <i class="far fa-calendar-alt icon"></i>
            ) : (
              ""
            )}
            {this.props.listData.date != ""
              ? ` ${this.props.listData.date.substring(5).replace("-", "/")} `
              : ""}

            {this.props.listData.file != "" ? (
              <i class="fas fa-file icon"></i>
            ) : (
              ""
            )}

            {this.props.listData.commit != "" ? (
              <i class="far fa-comment-dots icon"></i>
            ) : (
              ""
            )}
          </div>
        </div>

        {/*在這裡固定輸出this.state.editTasks*/}
        <div>{this.state.editTasks}</div>
      </div>
    );
  }
}

// TOSTUDY
const mapDispatchToProps = (dispatch) => {
  return {
    editTodoList: (todoList) => dispatch(editTodoList(todoList)),
  };
};

//因為只用到事件沒用到資料，所以第一個參數給null
const List = connect(null, mapDispatchToProps)(ConnectList);
export { List };
