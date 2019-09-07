import React from "react";
import Card from "../../../Card/Card";

import { CardSpec } from "../../../../constants";

import classes from "./Column.module.scss";

interface Props {
  cards: CardSpec[];
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
  for (let i = 0; i < num_cards; i += 1) {
    cardEle.push(<Card {...props.cards[i]} />);
  }

  return <div className={classes.column}>{cardEle}</div>;
};

export default Column;
