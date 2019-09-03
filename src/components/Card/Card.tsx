import React from "react";

import classes from "./Card.module.scss";

// var context = require.context("../../assets/cards", true, /\.(svg)$/);
// var files = {};

// context.keys().forEach(filename => {
//   files[filename] = context(filename);
// });
// console.log(files);

interface Props {
  suite: number;
  value: number;
}

const cardDir: string = process.env.PUBLIC_URL + "/img/cards";
const suiteMap: string[] = ["clubs", "diamonds", "hearts", "spades"];
const valueMap: string[] = ["jack", "queen", "king"];

const Card = (props: Props) => {
  const fetchImgUrl = (suite: number, value: number) => {
    let uri = cardDir + "/";
    if (value > 9) {
      uri += valueMap[value - 10];
    } else {
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
