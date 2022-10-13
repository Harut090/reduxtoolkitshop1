import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import EditeTodo from "./EditeTodo";
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
    <Router className="App">
      <Form add={add} item={item} setItem={setItem} />
      <Routes>
        <Route path="edite/:id" element={<EditeTodo  />} />
        <Route path="/" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
