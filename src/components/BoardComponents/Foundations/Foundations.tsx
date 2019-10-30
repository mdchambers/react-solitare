import React, { ReactElement } from "react";
import { useDrop } from "react-dnd";

import Foundation from "./Foundation/Foundation";
import Card from "../../Card/Card";
import CardPlaceholder from "../../CardPlaceholder/CardPlaceholder";

import { CardSpec, CardHandlerFunc, cardStates } from "../../../constants";

interface Props {
  foundations: CardSpec[][];
  onFoundationClick: CardHandlerFunc;
  onFoundationDrop: (item: any, target: string, idx: number) => void;
  selection?: number;
}

const Foundations = (props: Props) => {
  let topcards: (ReactElement | null)[] = [];

  props.foundations.forEach((f, idx) => {
    if (f.length > 0) {
      topcards.push(
        <Foundation
          onClick={(e: any) => props.onFoundationClick(f[0])}
          onDrop={(item: any) =>
            props.onFoundationDrop(item, cardStates.FOUNDATION, idx)
          }
          key={idx}
          card={f[f.length - 1]}
        />
      );
    } else {
      topcards.push(<CardPlaceholder key={idx} />);
    }
  });
  return <React.Fragment>{topcards}</React.Fragment>;
};

export default Foundations;
