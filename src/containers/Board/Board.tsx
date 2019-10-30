import React from "react";

import Deck from "../../components/BoardComponents/Deck/Deck";
import Foundations from "../../components/BoardComponents/Foundations/Foundations";
import Tableau from "../../components/BoardComponents/Tableau/Tableau";
import Waste from "../../components/BoardComponents/Waste/Waste";

import { CardSpec, CardHandlerFunc, cardStates } from "../../constants";

import classes from "./Board.module.scss";

interface Props {
  cardClickHandler: CardHandlerFunc;
  cardDblClickHandler: CardHandlerFunc;
  cardDropHandler: (item: any, target: string, id: number) => void;
  deckReloadHandler: () => void;
  deck_empty: boolean;
  waste: CardSpec[];
  foundations: CardSpec[][];
  tableaus: CardSpec[][];
  selectedCard: any;
}

const Board = (props: Props) => {
  return (
    <div className={classes.board}>
      <Deck
        deck_empty={props.deck_empty}
        onDeckClick={props.cardClickHandler}
        deckReloadHandler={props.deckReloadHandler}
      />
      <Waste
        cards={props.waste}
        onWasteClick={props.cardClickHandler}
        onWasteDblClick={props.cardDblClickHandler}
        selected={
          props.selectedCard && props.selectedCard.position === cardStates.WASTE
            ? true
            : false
        }
      />
      <Foundations
        foundations={props.foundations}
        onFoundationClick={props.cardClickHandler}
        onFoundationDrop={props.cardDropHandler}
        selection={
          props.selectedCard &&
          props.selectedCard.position === cardStates.FOUNDATION
            ? props.selectedCard.column
            : null
        }
      />
      <Tableau
        tableaus={props.tableaus}
        onTableauClick={props.cardClickHandler}
        onTableauDblClick={props.cardDblClickHandler}
        onTableauDrop={props.cardDropHandler}
        selection={
          props.selectedCard &&
          props.selectedCard.position === cardStates.TABLEAU
            ? {
                tableau: props.selectedCard.tableau,
                column: props.selectedCard.column
              }
            : null
        }
      />
    </div>
  );
};

export default Board;
