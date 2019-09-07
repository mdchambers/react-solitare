import React, { ReactElement } from "react";
import Card from "../../Card/Card";

import { CardSpec } from "../../../constants";

import classes from "./Foundation.module.scss";

interface Props {
  foundations: CardSpec[][];
}

const Foundation = (props: Props) => {
  let topcards: (ReactElement | null)[] = [];
  props.foundations.forEach(f => {
    if (f.length > 0) {
      topcards.push(<Card {...f[f.length - 1]} visible={true} />);
    } else {
      topcards.push(null);
    }
  });
  return <React.Fragment>{topcards}</React.Fragment>;
};

export default Foundation;
