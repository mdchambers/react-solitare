import React from "react";

import TestCard from "./TestCard";

import { CardSpec } from "../constants";

import { useDrop } from "react-dnd";
import "./test.scss";

interface Props {
  id: number;
  cards: CardSpec[];
  onDrop: (item: any) => void;
}

const TestBin = (props: Props) => {
  const { onDrop } = props;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "card",
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  // console.log(drop);

  const renderHeights = props.cards.map((c, idx) => {
    return 145 + 25 * (props.cards.length - idx - 1);
  });

  return (
    <div
      ref={drop}
      className="column"
      style={{ backgroundColor: isOver ? "grey" : "green" }}
    >
      {props.cards.map((c, idx) => {
        return (
          <TestCard
            {...c}
            key={idx}
            column={props.id}
            position={idx}
            renderHeight={renderHeights[idx]}
          />
        );
      })}
    </div>
  );
};

export default TestBin;
