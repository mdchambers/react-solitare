import React from "react";

import Card from "../../Card/Card";
import CardPlaceholder from "../../CardPlaceholder/CardPlaceholder";

import { CardHandlerFunc, cardStates } from "../../../constants";

import classes from "./Deck.module.scss";

interface Props {
  deck_empty: boolean;
  onDeckClick: CardHandlerFunc;
  deckReloadHandler: () => void;
}

const Deck = (props: Props) => {
  const card = props.deck_empty ? (
    <CardPlaceholder onClick={props.deckReloadHandler} solid />
  ) : (
    <Card
      onClick={(e: any) =>
        props.onDeckClick({ suite: 0, value: 0, visible: false, location: cardStates.DECK })
      }
      card={{suite: 0, value: 0, visible: false}}
      selected={false}
    />
  );
  return <div className={classes.deck}>{card}</div>;
};

export default Deck;
