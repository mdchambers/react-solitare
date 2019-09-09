import React from "react";

import Deck from "../../components/BoardComponents/Deck/Deck";
import Foundation from "../../components/BoardComponents/Foundation/Foundation";
import Tableau from "../../components/BoardComponents/Tableau/Tableau";
import Waste from "../../components/BoardComponents/Waste/Waste";

import { CardSpec, CardHandlerFunc } from "../../constants";

import classes from "./Board.module.scss";

interface Props {
  cardClickHandler: CardHandlerFunc;
  cardDblClickHandler: CardHandlerFunc;
  deck_empty: boolean;
  waste: CardSpec[];
  foundations: CardSpec[][];
  tableaus: CardSpec[][];
}

const Board = (props: Props) => {
  return (
    <div className={classes.board}>
      <Deck
        deck_empty={props.deck_empty}
        onDeckClick={props.cardClickHandler}
      />
      <Waste
        cards={props.waste}
        onWasteClick={props.cardClickHandler}
        onWasteDblClick={props.cardDblClickHandler}
      />
      <Foundation foundations={props.foundations} />
      <Tableau
        tableaus={props.tableaus}
        onTableauClick={props.cardClickHandler}
        onTableauDblClick={props.cardDblClickHandler}
      />
    </div>
  );
};

export default Board;
