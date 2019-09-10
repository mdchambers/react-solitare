import React from "react";
import Card from "../../Card/Card";
import CardPlaceholder from "../../CardPlaceholder/CardPlaceholder";

import {
  CardSpec,
  gameStates,
  CardHandlerFunc,
  cardStates
} from "../../../constants";

import classes from "./Waste.module.scss";

interface Props {
  cards: CardSpec[];
  onWasteClick: CardHandlerFunc;
  onWasteDblClick: CardHandlerFunc;
  selected: boolean;
}

const Waste = (props: Props) => {
  // Render top card
  let card = null;
  if (props.cards.length > 0) {
    props.cards[0].position = cardStates.WASTE;
    card = (
      <Card
        onClick={e => props.onWasteClick(props.cards[0])}
        selected={props.selected}
        {...props.cards[0]}
      />
    );
  } else {
    card = <CardPlaceholder />;
  }
  return <div className={classes.waste}>{card}</div>;
};

export default Waste;
