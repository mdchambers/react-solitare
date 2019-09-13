import React from "react";

import { useDrag } from "react-dnd";

import "test.scss";

const ItemTypes = {
  CARD: "card"
};

interface Props {}
const Card = (props: Props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  const imgURI = process.env.PUBLIC_URL + "/img/card_back.svg";
  return (
    <div ref={drag} className="card" style={{ opacity: isDragging ? 0 : 1 }}>
      <img src={imgURI}></img>
    </div>
  );
};

export default Card;
