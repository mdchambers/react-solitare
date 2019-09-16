import React from "react";

import { useDrag } from "react-dnd";

import { CardSpec, cardStates } from "../constants";

import "./test.scss";

const ItemTypes = {
  CARD: "card"
};

interface Props {
  card: CardSpec;
  column?: number;
  position?: number;
  renderHeight?: number;
}

const cardDir: string = process.env.PUBLIC_URL + "/img/cards";
const suiteMap: string[] = ["clubs", "diamonds", "hearts", "spades"];

const Card = (props: Props) => {
  const { suite, value, visible } = props.card;

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "card",
      position: props.position,
      column: props.column,
      suite: suite,
      value: value,
      visible: visible
    },
    isDragging: monitor => {
      if (props.column !== undefined && props.position !== undefined) {
        return (
          props.column === monitor.getItem().column &&
          props.position >= monitor.getItem().position
        );
      } else {
        return false;
      }
    },
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
      case 11:
        uri += "jack";
        break;
      case 12:
        uri += "queen";
        break;
      case 13:
        uri += "king";
        break;
      default:
        uri += value;
    }

    uri += "_of_" + suiteMap[suite] + ".svg";
    return uri;
  };

  let imgURI;
  if (visible) {
    imgURI = fetchImgUrl(suite, value);
  } else {
    imgURI = process.env.PUBLIC_URL + "/img/card_back.svg";
  }

  let cardStyle = {};
  if (props.renderHeight) {
    cardStyle = { height: props.renderHeight };
  }
  return (
    <React.Fragment>
      <div ref={drag} className="card" style={cardStyle}>
        <img
          style={{ opacity: isDragging ? 0 : 1 }}
          src={imgURI}
          alt="card face"
        ></img>
      </div>
    </React.Fragment>
  );
};

export default Card;
