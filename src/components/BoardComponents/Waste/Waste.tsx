import React from "react";
import Card from "../../Card/Card";
import CardPlaceholder from "../../CardPlaceholder/CardPlaceholder";

import { CardSpec, gameStates } from "../../../constants";

import classes from "./Waste.module.scss";

interface Props {
  cards: CardSpec[];
}

const Waste = (props: Props) => {
  // Render top card
  let cardEle = [];
  if (props.cards.length > 0) {
    cardEle.push(<Card {...props.cards[0]} />);
  } else {
    cardEle.push(<CardPlaceholder />);
  }
  return <div className={classes.waste}>{cardEle}</div>;
};

export default Waste;
