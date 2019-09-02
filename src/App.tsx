import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Board from "./containers/Board/Board";

const App: React.FC = () => {
  return (
    <div className="App">
      <p>Solitare</p>
      <Board />
    </div>
  );
};

export default App;
