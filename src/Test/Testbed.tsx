import React, { useState } from "react";

import { CardSpec } from "../constants";

import TestBin from "./TestBin";

import "./test.scss";

// Cards are draggable (useDrag)
// Columns are droppable (useDrop)
// On drop:
//  Remove card from origin array
//  Add card to destination array
//  Rerender

// Creates 7 stacks of ten cards
// const populateTableau = () => {
//   const tableau = [];
//   for (let i = 1; i <= 7; i += 1) {
//     const column = [];
//     for (let j = 1; j <= i; j += 1) {
//       column.push([i % 4, j]);
//     }
//     tableau.push(column);
//   }
//   return tableau;
// };

const Testbed = () => {
  const [stacks, setStacks] = useState<CardSpec[][]>([]);

  const bins = stacks.map((stack, idx) => {
    return <TestBin key={idx} id={idx} cards={stack} />;
  });
  return (
    <React.Fragment>
      <p>testbed</p>
      <div className="board">{bins}</div>
    </React.Fragment>
  );
};

export default Testbed;
