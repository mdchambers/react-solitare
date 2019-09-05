import React from "react";
import Card from "../../Card/Card";

import classes from "./Foundation.module.scss";

interface Props {
  foundations: number[][];
}

const Foundation = (props: Props) => {
  const cards = props.foundations.map(c => {
    return (
      <div className={classes.foundation}>
        <Card suite={c[0]} value={c[1]} />
      </div>
    );
  });
  return <React.Fragment>{cards}</React.Fragment>;
};

export default Foundation;
