import React from "react";
import Card from "../../../Card/Card";

import classes from "./Column.module.scss";

interface Props {
  cards: number[][];
}

const Column = (props: Props) => {
  const num_cards = props.cards.length;
  const cardEle = [];
  if (num_cards === 0) {
    return (
      <div>
        <p>empty</p>
      </div>
    );
  }
  const top_card = props.cards[props.cards.length - 1];
  if (num_cards > 1) {
    for (let i = 0; i < num_cards; i += 1) {
      cardEle.push(<Card suite={0} value={0} />);
    }
  }
  cardEle.push(<Card suite={top_card[0]} value={top_card[1]} />);

  return <div className={classes.column}>{cardEle}</div>;
};

export default Column;
