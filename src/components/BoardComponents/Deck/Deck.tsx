import React from "react";

import Card from "../../Card/Card";

import classes from "./Deck.module.scss";

interface Props {
  deck_empty: boolean;
}

const Deck = (props: Props) => {
  const card = props.deck_empty ? (
    <div />
  ) : (
    <Card suite={0} value={0} visible={false} />
  );
  return <div className={classes.deck}>{card}</div>;
};

export default Deck;
