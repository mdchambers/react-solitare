import React from "react";

import { useDrag } from "react-dnd";


import classes from "./Card.module.scss";
import { CardSpec, cardStates } from "../../constants";

// Suite: 0-3
// Value: 1-13
interface Props {
  card: CardSpec;
  selected: boolean;
  onClick?: (event: any) => void;
  onDblClick?: (event: any) => void;
  renderHeight?: number;
}

const cardDir: string = process.env.PUBLIC_URL + "/img/cards";
const suiteMap: string[] = ["clubs", "diamonds", "hearts", "spades"];

const Card = (props: Props) => {
  const {suite, value, visible, column, position, location} = props.card;
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "card",
      location: location,
      position: position,
      column: column,
      suite: suite,
      value: value,
      visible: visible
    },
    isDragging: monitor => {
      if (position !== undefined && column !== undefined) {
        return (
          column === monitor.getItem().column &&
          position >= monitor.getItem().position
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

  let cardStyle;

  if(props.renderHeight){
    cardStyle = {height: props.renderHeight};
  }
  return (
    <React.Fragment>
      <div ref={drag} className={classes.card} style={cardStyle}>
        <div
          className={classes.overlay}
          style={{ opacity: props.selected ? 0.75 : 1 }}
        >
          <img
            onClick={props.onClick}
            onDoubleClick={props.onDblClick}
            style={{ opacity: isDragging ? 0 : 1 }}
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
