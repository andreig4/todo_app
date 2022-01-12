import React from "react";
import crossIcon from "./images/icon-cross.svg";
import checkIcon from "./images/icon-check.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectDarkMode } from "./slices/themeSlice";
import { completeTodo } from "./slices/todosSlice";
import { removeTodo } from "./slices/todosSlice";

function Todo({ content, completed, id }) {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const completeTodoHandler = () => {
    dispatch(completeTodo(id));
  };

  const removeTodoHandler = () => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="todo_container" onClick={completeTodoHandler}>
      <div className={`circle ${completed ? "active" : ""}`}>
        <img src={checkIcon} alt="" />
      </div>
      <li
        className={`todo ${completed ? "active" : ""} ${
          !darkMode ? "whiteBg" : ""
        }`}
      >
        {content}
      </li>
      <img
        src={crossIcon}
        alt=""
        className="delete-icon"
        onClick={removeTodoHandler}
      />
    </div>
  );
}

export default Todo;
