import React from "react";
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
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          value={edite}
          onChange={(e) => setEdite(e.target.value)}
        />
        <button>Edite</button>
      </form>
    </div>
  );
};
export default EditeTodo;
