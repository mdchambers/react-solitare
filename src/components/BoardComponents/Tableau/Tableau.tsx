import React from "react";

import { CardSpec, CardHandlerFunc, cardStates } from "../../../constants";

import TableauBase from "./TableauBase/TableauBase";
import Column from "./Column/Column";

interface Props {
  tableaus: CardSpec[][];
  onTableauClick: CardHandlerFunc;
  onTableauDblClick: CardHandlerFunc;
  onTableauDrop: (item: any, id: number) => void;
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
                  visible: false,
                  column: idx,
                  position: 0,
                  location: cardStates.TABLEAU_BASE
                })
              }
            />
          );
        }
        return (
          <Column
            key={idx}
            tableauID={idx}
            onDrop={item => props.onTableauDrop(item, idx)}
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
