import React from "react";

import TestCard from "./TestCard";

import { CardSpec } from "../constants";

import './test.scss';

interface Props {
  id: number;
  cards: CardSpec[];
}

const TestBin = (props: Props) => {
  return (
    <div className="column">
      {props.cards.map((c, idx) => {
        return <TestCard {...c} key={idx} />;
      })}
    </div>
  );
};

export default TestBin;
