import React from "react";
import { useEffect } from "react";
import { fetchTodos } from "./store/TodoSlice";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
const TodoList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  const todos = useSelector((to) => to.todos.todos);
  console.log(todos);
  return (
    <div>
      {todos.length
        ? todos.map((todo) => {
            return <TodoItem todo={todo} key={todo.id} />;
          })
        : "hello"}
    </div>
  );
};
export default TodoList;
