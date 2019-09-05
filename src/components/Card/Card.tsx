import React from "react";

import classes from "./Card.module.scss";

// Suite: 0-4
// Value: 1-12
// Value: (special case) 0 => card back
interface Props {
  suite: number;
  value: number;
}

const cardDir: string = process.env.PUBLIC_URL + "/img/cards";
const suiteMap: string[] = ["clubs", "diamonds", "hearts", "spades"];
const valueMap: string[] = ["jack", "queen", "king"];

const Card = (props: Props) => {
  const fetchImgUrl = (suite: number, value: number) => {
    if (value === 0) {
      return process.env.PUBLIC_URL + "/img/card_back.svg";
    }
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

  const imgURI = fetchImgUrl(props.suite, props.value);
  return (
    <div className={classes.card}>
      <img src={imgURI}></img>
    </div>
  );
};

export default Card;
