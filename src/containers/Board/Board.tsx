import React from "react";

import Deck from "../../components/BoardComponents/Deck/Deck";
import Foundation from "../../components/BoardComponents/Foundation/Foundation";
import Tableau from "../../components/BoardComponents/Tableau/Tableau";
import Waste from "../../components/BoardComponents/Waste/Waste";

// import Card from "../../components/Card/Card";

import classes from "./Board.module.scss";

// Components to render:
// Deck
// Waste
// Foundations (4)
// Tableau (7)

// props:
// deck_empty
// waste_top
// foundations
// tableaus

interface Props {
  deck_empty: boolean;
  waste_top: number[];
  foundations: number[][];
  tableaus: number[][][];
}

const Board = (props: Props) => {
  return (
    <div className={classes.board}>
      <Deck deck_empty={props.deck_empty} />
      <Waste waste_top={props.waste_top} />
      <Foundation foundations={props.foundations} />
      <Tableau tableaus={props.tableaus} />
    </div>
  );
};

export default Board;
