import React from "react";

import classes from "./CardPlaceholder.module.scss";

const CardPlaceholder = () => {
  const imgURI = process.env.PUBLIC_URL + "/img/empty_card2.svg";
  return (
    <div className={classes.card}>
      <img src={imgURI}></img>
    </div>
  );
};

export default CardPlaceholder;
