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
}

const Waste = (props: Props) => {
  // Render top card
  let card = null;
  if (props.cards.length > 0) {
    card = (
      <Card
        onClick={e =>
          props.onWasteClick(
            e,
            props.cards[0].suite,
            props.cards[0].value,
            cardStates.WASTE
          )
        }
        {...props.cards[0]}
      />
    );
  } else {
    card = <CardPlaceholder />;
  }
  return <div className={classes.waste}>{card}</div>;
};

export default Waste;
