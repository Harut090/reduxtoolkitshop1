import React from "react";
import "./App.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { editeTodo } from "./store/TodoSlice";
import { useDispatch } from "react-redux";

const EditeTodo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [edite, setEdite] = useState("");
  const submit = (e) => {
    e.preventDefault();
    dispatch(editeTodo({ id: id, title: edite }));
    navigate("/");
    setEdite("");
  };
  return (
    <div className="edite-todo">
      <form onSubmit={submit}>
        <input
          type="text"
          value={edite}
          onChange={(e) => setEdite(e.target.value)}
        />
        <button>Edit</button>
      </form>
    </div>
  );
};
export default EditeTodo;
