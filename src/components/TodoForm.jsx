import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/TodoForm.css";
const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  };
  return (
    <form
      style={{ width: "auto" }}
      className="todo-form"
      onSubmit={handleSubmit}
    >
      {" "}
      <input
        type="text"
        required
        style={{ textAlign: "center", marginLeft: "255px", width: "300px" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a New Task Here"
      />{" "}
      <button
        style={{
          width: "15%",
          paddingLeft: "10px 20px",
          borderRadius: "50px",
          marginLeft: "340px",
        }}
        type="submit"
      >
        Add
      </button>{" "}
    </form>
  );
};
TodoForm.propTypes = { onAdd: PropTypes.func.isRequired };
export default TodoForm;