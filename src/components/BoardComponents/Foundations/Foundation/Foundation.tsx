import React from "react";

import { useDrop } from "react-dnd";
import { CardSpec } from "../../../../constants";
import Card from "../../../Card/Card";

interface Props {
  card: CardSpec;
  onClick: (e: any) => void;
  onDrop: (item: any) => void;
}

const Foundation = (props: Props) => {
  const { onDrop } = props;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "card",
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  return (
    <div ref={drop}>
      <Card card={props.card} selected={false} onClick={props.onClick} />
    </div>
  );
};

export default Foundation;
