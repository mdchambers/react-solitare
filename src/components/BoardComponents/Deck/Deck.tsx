import React from "react";

import Card from "../../Card/Card";

import { CardHandlerFunc } from "../../../constants";

import classes from "./Deck.module.scss";

interface Props {
  deck_empty: boolean;
  onDeckClick: CardHandlerFunc;
}

const Deck = (props: Props) => {
  const card = props.deck_empty ? (
    <div />
  ) : (
    <Card
      onClick={(e: any) => props.onDeckClick(e, 0, 0, "deck")}
      suite={0}
      value={0}
      visible={false}
    />
  );
  return <div className={classes.deck}>{card}</div>;
};

export default Deck;
