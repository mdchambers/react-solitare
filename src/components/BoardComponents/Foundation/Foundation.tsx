import React, { ReactElement } from "react";
import Card from "../../Card/Card";
import CardPlaceholder from "../../CardPlaceholder/CardPlaceholder";

import { CardSpec, CardHandlerFunc, cardStates } from "../../../constants";

import classes from "./Foundation.module.scss";

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
          onClick={e =>
            props.onFoundationClick(
              e,
              f[0].suite,
              f[0].value,
              cardStates.FOUNDATION,
              { tableauID: 0, columnID: idx }
            )
          }
          key={idx}
          selected={props.selection === idx}
          {...f[f.length - 1]}
          visible={true}
        />
      );
    } else {
      topcards.push(<CardPlaceholder key={idx} />);
    }
  });
  return <React.Fragment>{topcards}</React.Fragment>;
};

export default Foundation;
