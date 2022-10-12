import React from "react";
import "./App.css";
import { completeTodo, deletTodo } from "./store/TodoSlice";
import { useDispatch } from "react-redux";
const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <div className="todo">
      <li className={todo.completed ? "done" : ""}>
        <span>{todo.title}</span>
        <input
          type="checkbox"
          onClick={() => {
            dispatch(completeTodo(todo.id));
          }}
        />
        <button
          onClick={() => {
            dispatch(deletTodo(todo.id));
          }}
        >
          delete
        </button>
      </li>
    </div>
  );
};
export default TodoItem;
