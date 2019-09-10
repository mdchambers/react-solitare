import React from "react";

import { useDrag } from "react-dnd";

import { CardHandlerFunc } from "../../constants";

import classes from "./Card.module.scss";

// Suite: 0-3
// Value: 1-12
interface Props {
  suite: number;
  value: number;
  visible?: boolean;
  selected: boolean;

  onClick?: (event: any) => void;
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
    <React.Fragment>
      <div ref={drag} className={classes.card}>
        <div
          className={classes.overlay}
          style={{ opacity: props.selected ? 0.75 : 1 }}
        >
          <img
            onClick={props.onClick}
            style={{ opacity: isDragging ? 0.1 : 1 }}
            src={imgURI}
            alt="card face"
          ></img>
        </div>
      </div>
      {/* {props.selected ? <div className={classes.overlay}></div> : null} */}
    </React.Fragment>
  );
};

export default Card;
