import React from "react";
import Card from "../../../Card/Card";

import { CardSpec, CardHandlerFunc, cardStates } from "../../../../constants";

import classes from "./Column.module.scss";

interface Props {
  cards: CardSpec[];
  tableauID: number;
  onColumnClick: CardHandlerFunc;
  onColumnDblClick: CardHandlerFunc;
  selection: number | null;
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
    // console.log(props.cards[i]);
    const card = props.cards[i];
    card.position = cardStates.TABLEAU;
    card.tableau = props.tableauID;
    card.column = i;
    cardEle.push(
      <Card
        key={i}
        {...props.cards[i]}
        selected={props.selection === i}
        onClick={(e: any) => props.onColumnClick(card)}
      />
    );
  }

  return <div className={classes.column}>{cardEle}</div>;
};

export default Column;
