import React from "react";
import "./App.css";

const Form = ({ add, item, setItem }) => {
  return (
    <form onSubmit={add} className="form">
      <input
        type="text"
        placeholder="entertext"
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
      />
      <button>Submit</button>
    </form>
  );
};

export default Form;
