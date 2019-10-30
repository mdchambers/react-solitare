import React from "react";

import classes from "./Header.module.scss";

interface Props {
  newGameHandler: (event: any) => void;
}

const Header = (props: Props) => {
  return (
    <div className={classes.headerWrapper}>
      <h2>React Solitare</h2>
      <button onClick={props.newGameHandler}>New Game</button>
    </div>
  );
};

export default Header;
