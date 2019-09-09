import React from "react";

import { CardSpec, CardHandlerFunc } from "../../../constants";

import Column from "./Column/Column";

import classes from "./Tableau.module.scss";

interface Props {
  tableaus: CardSpec[][];
  onTableauClick: CardHandlerFunc;
  onTableauDblClick: CardHandlerFunc;
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
