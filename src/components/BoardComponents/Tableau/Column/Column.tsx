import React from "react";
import Card from "../../../Card/Card";

import { useDrop } from "react-dnd";

import { CardSpec, CardHandlerFunc, cardStates } from "../../../../constants";

import classes from "./Column.module.scss";

interface Props {
  cards: CardSpec[];
  tableauID: number;
  onColumnClick: CardHandlerFunc;
  onColumnDblClick: CardHandlerFunc;
  selection: number | null;
  onDrop: (item: any) => void;
}

const Column = (props: Props) => {
  const num_cards = props.cards.length;
  const cardEle = [];

  const { onDrop } = props;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "card",
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  for (let i = 0; i < num_cards; i += 1) {
    const card = props.cards[i];
    card.location = cardStates.TABLEAU;
    card.column = props.tableauID;
    card.position = i;

    const renderHeight = 145 + 25 * (props.cards.length - i - 1);
    cardEle.push(
      <Card
        key={i}
        card={props.cards[i]}
        selected={props.selection === i}
        onClick={(e: any) => props.onColumnClick(card)}
        onDblClick={(e: any) => props.onColumnDblClick(card)}
        renderHeight={renderHeight}
      />
    );
  }

  return (
    <div ref={drop} className={classes.droptarget}>
      <div className={classes.column}>{cardEle}</div>
    </div>
  );
};

export default Column;
