import React, { ReactElement } from "react";
import Card from "../../Card/Card";
import CardPlaceholder from "../../CardPlaceholder/CardPlaceholder";

import { CardSpec, CardHandlerFunc } from "../../../constants";

interface Props {
  foundations: CardSpec[][];
  onFoundationClick: CardHandlerFunc;
  selection?: number;
}

const Foundation = (props: Props) => {
  let topcards: (ReactElement | null)[] = [];
  props.foundations.forEach((f, idx) => {
    if (f.length > 0) {
      topcards.push(
        <Card
          onClick={e => props.onFoundationClick(f[0])}
          key={idx}
          selected={props.selection === idx}
          card={f[f.length - 1]}
        />
      );
    } else {
      topcards.push(<CardPlaceholder key={idx} />);
    }
  });
  return <React.Fragment>{topcards}</React.Fragment>;
};

export default Foundation;
