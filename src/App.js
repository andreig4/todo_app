import "./App.scss";
import crossIcon from "./images/icon-cross.svg";
import darkBg from "./images/bg-desktop-dark.jpg";
import Todos from "./Todos";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./slices/themeSlice";

function App() {
  const darkMode = useSelector(selectDarkMode);

  return (
    <div className={`app ${!darkMode ? "whiteBg" : ""}`}>
      <div className={`header ${!darkMode ? "whiteBg" : ""}`}></div>

      <Todos />
    </div>
  );
}

export default App;
