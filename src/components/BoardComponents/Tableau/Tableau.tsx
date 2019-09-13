import React from "react";

import { CardSpec, CardHandlerFunc, cardStates } from "../../../constants";

import TableauBase from "./TableauBase/TableauBase";
import Column from "./Column/Column";

import classes from "./Tableau.module.scss";

interface Props {
  tableaus: CardSpec[][];
  onTableauClick: CardHandlerFunc;
  onTableauDblClick: CardHandlerFunc;
  selection: { tableau: number; column: number } | null;
}
const Tableau = (props: Props) => {
  return (
    <React.Fragment>
      {props.tableaus.map((c, idx) => {
        if (c.length === 0) {
          console.log("tableau empty");
          return (
            <TableauBase
              clickHandler={e =>
                props.onTableauClick({
                  suite: 0,
                  value: 0,
                  tableau: idx,
                  column: 0,
                  position: cardStates.TABLEAU_BASE
                })
              }
            />
          );
        }
        return (
          <Column
            key={idx}
            tableauID={idx}
            selection={
              props.selection && props.selection.tableau === idx
                ? props.selection.column
                : null
            }
            cards={c}
            onColumnClick={props.onTableauClick}
            onColumnDblClick={props.onTableauDblClick}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Tableau;
