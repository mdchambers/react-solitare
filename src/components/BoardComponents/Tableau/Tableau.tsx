import React from "react";

import { CardSpec } from "../../../constants";

import Column from "./Column/Column";

import classes from "./Tableau.module.scss";

interface Props {
  tableaus: CardSpec[][];
}
const Tableau = (props: Props) => {
  return (
    <React.Fragment>
      {props.tableaus.map((c, idx) => {
        return (
          <div className={classes.tableau}>
            <Column key={idx} cards={c} />
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Tableau;
