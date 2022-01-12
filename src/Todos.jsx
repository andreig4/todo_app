import React, { useRef, useEffect } from "react";
import moonIcon from "./images/icon-moon.svg";
import sunIcon from "./images/icon-sun.svg";
import Todo from "./Todo";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectDarkMode, toggleTheme } from "./slices/themeSlice";
import { Scrollbars } from "react-custom-scrollbars";
import {
  addTodo,
  clearCompleted,
  selectActiveTodos,
  selectActiveTodosNumber,
  selectCompletedTodos,
  selectShowActiveTodos,
  selectShowCompletedTodos,
  selectShowTodos,
  selectTodos,
} from "./slices/todosSlice";
import { showCompletedFunction } from "./slices/todosSlice";
import { showAllFunction } from "./slices/todosSlice";
import { showActiveFunction } from "./slices/todosSlice";

function Todos() {
  const inputRef = useRef();

  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const activeTodos = useSelector(selectActiveTodos);

  const showTodos = useSelector(selectShowTodos);
  const showActiveTodos = useSelector(selectShowActiveTodos);
  const showCompletedTodos = useSelector(selectShowCompletedTodos);

  let todosToRender;
  let activeTodosNumber = 0;

  const submitTodo = (e) => {
    e.preventDefault();

    if (inputRef.current.value.trim()) {
      dispatch(
        addTodo({
          id: Math.random() * 1000,
          content: inputRef.current.value,
          completed: false,
        })
      );
    }

    inputRef.current.value = "";
  };

  const showCompletedHandler = () => {
    dispatch(showCompletedFunction());
  };

  const showAllHandler = () => {
    dispatch(showAllFunction());
  };

  const showActiveHandler = () => {
    dispatch(showActiveFunction());
  };

  const clearCompletedHandler = () => {
    dispatch(clearCompleted());
  };

  if (showActiveTodos) {
    todosToRender = activeTodos;
  } else if (showCompletedTodos) {
    todosToRender = completedTodos;
  } else {
    todosToRender = todos;
  }

  todos?.forEach((todo) => {
    if (!todo.completed) {
      activeTodosNumber++;
    }
  });

  return (
    <div className="todos">
      <div className="todosHeader">
        <h1>TODO</h1>
        {darkMode ? (
          <img src={sunIcon} alt="" onClick={() => dispatch(toggleTheme())} />
        ) : (
          <img src={moonIcon} alt="" onClick={() => dispatch(toggleTheme())} />
        )}
      </div>

      <div className="input_container">
        <div className="circle"></div>
        <form onSubmit={submitTodo}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Create a new todo..."
            className={!darkMode ? "whiteBg" : ""}
          />
          <button type="submit" hidden></button>
        </form>
      </div>

      <div className={`todos_container ${!darkMode ? "active" : ""}`}>
        {todosToRender.map((todo) => (
          <Todo
            content={todo.content}
            key={todo.id}
            id={todo.id}
            completed={todo.completed}
          />
        ))}

        <div className={`todos_footer ${!darkMode ? "whiteBg" : ""}`}>
          <p>{activeTodosNumber} items left</p>
          <div className="types">
            <p
              className={`clear ${showTodos ? "active" : ""}`}
              onClick={showAllHandler}
            >
              All
            </p>
            <p
              className={`clear ${showActiveTodos ? "active" : ""}`}
              onClick={showActiveHandler}
            >
              Active
            </p>
            <p
              className={`clear ${showCompletedTodos ? "active" : ""}`}
              onClick={showCompletedHandler}
            >
              Completed
            </p>
          </div>
          <p className="clear" onClick={clearCompletedHandler}>
            Clear Completed
          </p>
        </div>
      </div>
    </div>
  );
}

export default Todos;
