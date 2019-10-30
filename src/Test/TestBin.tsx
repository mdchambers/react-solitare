import React from "react";

import TestStack from "./TestStack";
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
    // <div>
    //   <TestStack root cards={props.cards} />
    // </div>

    <div
      className="column"
      ref={drop}
      style={{ backgroundColor: isOver ? "grey" : "green" }}
    >
      {props.cards.map((c, idx) => {
        return (
          <TestCard
            renderHeight={renderHeights[idx]}
            column={props.id}
            position={idx}
            card={c}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default TestBin;
