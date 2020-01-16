import React, { Component } from "react";
import TodoItem from "../TodoItem";

class TodoList extends Component {
  render() {
    return (
      <div>
        <TodoItem done>리액트</TodoItem>
        <TodoItem>스타일링</TodoItem>
      </div>
    );
  }
}

export default TodoList;
