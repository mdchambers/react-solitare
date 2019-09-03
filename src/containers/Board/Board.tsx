import React from "react";

import Card from "../../components/Card/Card";

import classes from "./Board.module.scss";

const Board = () => {
  return (
    <div className={classes.board}>
      <Card suite={0} value={5} />
      <Card suite={1} value={6} />
    </div>
  );
};

export default Board;
