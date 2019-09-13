import React from "react";

import classes from "./CardPlaceholder.module.scss";

interface Props {
  solid?: boolean;
  onClick?: () => void;
}

const CardPlaceholder = (props: Props) => {
  let imgURI = process.env.PUBLIC_URL + "/img/empty_card2.svg";
  if (props.solid) {
    imgURI = process.env.PUBLIC_URL + "/img/deck_bottom.svg";
  }

  return (
    <div
      onClick={
        props.onClick
          ? props.onClick
          : () => {
              return;
            }
      }
      className={classes.card}
    >
      <img src={imgURI}></img>
    </div>
  );
};

export default CardPlaceholder;
