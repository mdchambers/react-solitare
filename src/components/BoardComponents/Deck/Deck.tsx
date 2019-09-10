import React from "react";

import Card from "../../Card/Card";
import CardPlaceholder from "../../CardPlaceholder/CardPlaceholder";

import { CardHandlerFunc, cardStates } from "../../../constants";

import classes from "./Deck.module.scss";

interface Props {
  deck_empty: boolean;
  onDeckClick: CardHandlerFunc;
}

const Deck = (props: Props) => {
  const card = props.deck_empty ? (
    <CardPlaceholder solid />
  ) : (
    <Card
      onClick={(e: any) => props.onDeckClick(null)}
      suite={0}
      value={0}
      selected={false}
      visible={false}
    />
  );
  return <div className={classes.deck}>{card}</div>;
};

export default Deck;
