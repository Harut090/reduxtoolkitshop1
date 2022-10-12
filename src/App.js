import "./App.css";
import { useDispatch } from "react-redux";
import { addMoreTodo } from "./store/TodoSlice";
import TodoList from "./TodoList";
import Form from "./Form";
import { useState } from "react";
function App() {
  const dispatch = useDispatch();
  const [item, setItem] = useState("");

  const add = (e) => {
    e.preventDefault();
    
    dispatch(addMoreTodo(item));
    setItem("");
  };
  return (
    <div className="App">
      <Form add={add} item={item} setItem={setItem} />
      <TodoList />
    </div>
  );
}

export default App;
