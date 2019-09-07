import React from "react";

import { useDrag } from "react-dnd";

import classes from "./Card.module.scss";

// Suite: 0-4
// Value: 1-12
interface Props {
  suite: number;
  value: number;
  visible: boolean;
}

const cardDir: string = process.env.PUBLIC_URL + "/img/cards";
const suiteMap: string[] = ["clubs", "diamonds", "hearts", "spades"];
const valueMap: string[] = ["jack", "queen", "king"];

const Card = (props: Props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card" },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  const fetchImgUrl = (suite: number, value: number) => {
    let uri = cardDir + "/";
    switch (value) {
      case 1:
        uri += "ace";
        break;
      case 10:
        uri += "jack";
        break;
      case 11:
        uri += "queen";
        break;
      case 12:
        uri += "king";
        break;
      default:
        uri += value;
    }

    uri += "_of_" + suiteMap[suite] + ".svg";
    return uri;
  };

  let imgURI;
  if (props.visible) {
    imgURI = fetchImgUrl(props.suite, props.value);
  } else {
    imgURI = process.env.PUBLIC_URL + "/img/card_back.svg";
  }
  return (
    <div ref={drag} className={classes.card}>
      <img style={{ opacity: isDragging ? 0.1 : 1 }} src={imgURI}></img>
    </div>
  );
};

export default Card;
