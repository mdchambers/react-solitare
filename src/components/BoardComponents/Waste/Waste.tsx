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
    let topcard = props.cards[0]
    topcard.position = cardStates.WASTE;
    topcard.visible = true;
    console.log(topcard);
    card = (
      <Card
        onClick={e => props.onWasteClick(topcard)}
        onDblClick={e => props.onWasteDblClick(topcard)}
        selected={props.selected}
        {...topcard}
      />
    );
  } else {
    card = <CardPlaceholder />;
  }
  return <div className={classes.waste}>{card}</div>;
};

export default Waste;
