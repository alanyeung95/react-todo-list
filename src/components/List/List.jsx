import React from "react";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 然後因為在顯示事項的時候，也可以同時標記已完成和是否重要
      // state只需要紀錄會變化的資料，所以只填寫兩個欄位，其他固定無法修改的就用props處理。
      important: this.props.listData.important,
      complete: this.props.listData.complete,
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(type) {
    switch (type) {
      case "complete": {
        this.setState({ complete: window.event.target.checked });
        break;
      }
      case "important": {
        if (this.state.important == "") this.setState({ important: "Y" });
        else this.setState({ important: "" });
        break;
      }
    }
  }

  render() {
    return (
      <div class="listBlock">
        <div
          class={" list " + (this.state.important == "Y" ? " important " : "")}
        >
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
      </div>
    );
  }
}

export { List };
