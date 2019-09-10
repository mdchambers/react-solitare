import React from "react";

import { CardSpec, CardHandlerFunc } from "../../../constants";

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
        return (
          // <div key={idx} className={classes.tableau}>
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
          // </div>
        );
      })}
    </React.Fragment>
  );
};

export default Tableau;
