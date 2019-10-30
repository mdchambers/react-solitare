import React from "react";
import { useDrag } from "react-dnd";

import TestCard from "./TestCard";
import { CardSpec, cardStates } from "../constants";

interface Props {
  cards: CardSpec[];
  root: boolean;
}

const TestStack = (props: Props) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "card"
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const currCard = props.cards.pop();
  console.log(currCard);

  let childStyle;
  if (!props.root) {
    childStyle = { transform: "translateY(-125px" };
  }
  return (
    <div style={childStyle}>
      {currCard ? <TestCard card={currCard} /> : null}
      {props.cards.length > 0 ? (
        <TestStack root={false} cards={props.cards} />
      ) : null}
    </div>
  );
};

export default TestStack;
