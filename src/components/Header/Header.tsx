import React from "react";

import classes from "./Header.module.scss";

interface Props {
  rerollHandler: (event: any) => void;
  addHandler: (event: any) => void;
  resetHandler: (event: any) => void;
  fullSetHandler: (event: any) => void;
}

const Header = (props: Props) => {
  return (
    <div className={classes.headerWrapper}>
      <h2>React Solitare</h2>
      <button onClick={props.rerollHandler}>Reroll</button>
      <button onClick={props.addHandler}>Add Card</button>
      <button onClick={props.resetHandler}>Reset</button>
      <button onClick={props.fullSetHandler}>Full Deck</button>
    </div>
  );
};

export default Header;
