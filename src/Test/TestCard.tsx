import React from "react";

import { useDrag } from "react-dnd";

import "./test.scss";

const ItemTypes = {
  CARD: "card"
};

interface Props {
  suite: number;
  value: number;
  visible?: boolean;
}

const cardDir: string = process.env.PUBLIC_URL + "/img/cards";
const suiteMap: string[] = ["clubs", "diamonds", "hearts", "spades"];

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
  if (props.visible) {
    imgURI = fetchImgUrl(props.suite, props.value);
  } else {
    imgURI = process.env.PUBLIC_URL + "/img/card_back.svg";
  }
  return (
    <React.Fragment>
      <div ref={drag} className="card">
        <div
          className="cardOverlay"
          // style={{ opacity: props.selected ? 0.75 : 1 }}
        >
          <img
            // onClick={props.onClick}
            // onDoubleClick={props.onDblClick}
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
