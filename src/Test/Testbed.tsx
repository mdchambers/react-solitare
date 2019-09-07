import React, { useState } from "react";

import Tableau from "../components/BoardComponents/Tableau/Tableau";

import classes from "./Testbed.module.scss";

// Cards are draggable (useDrag)
// Columns are droppable (useDrop)
// On drop:
//  Remove card from origin array
//  Add card to destination array
//  Rerender

// Creates 7 stacks of ten cards
const populateTableau = () => {
  const tableau = [];
  for (let i = 1; i <= 7; i += 1) {
    const column = [];
    for (let j = 1; j <= i; j += 1) {
      column.push([i % 4, j]);
    }
    tableau.push(column);
  }
  return tableau;
};
// const populateTableau = () => {
//   return [
//     [[1, 1], [1,2]],
//     [[1, 1]],
//     [[1, 1]],
//     [[1, 1]],
//     [[1, 1]],
//     [[1, 1]],
//     [[1, 1]],
//     [[1, 1]],
//     [[1, 1]]
//   ];
// };




const Testbed = () => {

  return (
    <React.Fragment>
      <p>testbed</p>
      <div className={classes.board}>
        <Tableau tableaus={cards} />
      </div>
    </React.Fragment>
  );
};

export default Testbed;
