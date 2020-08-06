import React from "react";
import { Route, Link } from "react-router-dom";

class BookMark extends React.Component {
  // tutorial here: https://ithelp.ithome.com.tw/articles/10205439

  render() {
    return (
      <Route
        // The exact param disables the partial matching for a route
        exact
        path={this.props.to}
        children={(props) => {
          let className = "bookMark";
          {
            props.match
              ? (className += " select_bookMark")
              : (className = "bookMark");
          }
          return (
            <Link to={this.props.to}>
              <button class={className}>{this.props.name}</button>
            </Link>
          );
        }}
      />
    );
  }
}

export { BookMark };
