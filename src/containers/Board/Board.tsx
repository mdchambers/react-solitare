import React from "react";

import Card from "../../components/Card/Card";

import classes from "./Board.module.scss";

interface Props {
  cards: number[][];
}

const Board = (props: Props) => {
  // console.log(props.cards);
  const cardComponents = props.cards.map((c, idx) => {
    return <Card key={idx} suite={c[0]} value={c[1]} />;
  });

  return <div className={classes.board}>{cardComponents}</div>;
};

export default Board;
