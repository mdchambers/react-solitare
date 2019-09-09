import React from "react";

import Deck from "../../components/BoardComponents/Deck/Deck";
import Foundation from "../../components/BoardComponents/Foundation/Foundation";
import Tableau from "../../components/BoardComponents/Tableau/Tableau";
import Waste from "../../components/BoardComponents/Waste/Waste";

import { CardSpec, CardHandlerFunc } from "../../constants";

import classes from "./Board.module.scss";

interface Props {
  onDeckClick: CardHandlerFunc;
  deck_empty: boolean;
  waste: CardSpec[];
  foundations: CardSpec[][];
  tableaus: CardSpec[][];
}

const Board = (props: Props) => {
  return (
    <div className={classes.board}>
      <Deck deck_empty={props.deck_empty} onDeckClick={props.onDeckClick} />
      <Waste cards={props.waste} />
      <Foundation foundations={props.foundations} />
      <Tableau tableaus={props.tableaus} />
    </div>
  );
};

export default Board;
