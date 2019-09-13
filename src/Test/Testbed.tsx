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

const genStacks = (): CardSpec[][] => {
  const tabSuites = [[0, 1, 0, 2, 3], [1, 1, 2]];
  const tabValues = [[1, 13, 3, 5, 6], [1, 11, 8]];
  // const tabSuites = [[0]];
  // const tabValues = [[1]];

  const newStacks: CardSpec[][] = [];
  for (let i = 0; i < tabSuites.length; i += 1) {
    newStacks.push([]);
    for (let j = 0; j < tabSuites[i].length; j += 1) {
      newStacks[i].push({
        suite: tabSuites[i][j],
        value: tabValues[i][j],
        visible: true
      });
    }
  }

  while (newStacks.length < 7) {
    newStacks.push([]);
  }

  return newStacks;
};

const Testbed = () => {
  const [stacks, setStacks] = useState<CardSpec[][]>(genStacks());

  const handleDrop = (item: any, idx: number): void => {
    console.log(`dropped on column ${idx}`);
    console.log(item);


  };

  const bins = stacks.map((stack, idx) => {
    return (
      <TestBin
        key={idx}
        id={idx}
        cards={stack}
        onDrop={i => handleDrop(i, idx)}
      />
    );
  });
  return (
    <React.Fragment>
      <p>testbed</p>
      <div className="board">{bins}</div>
    </React.Fragment>
  );
};

export default Testbed;
