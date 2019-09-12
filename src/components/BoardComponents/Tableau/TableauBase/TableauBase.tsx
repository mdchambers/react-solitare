import React from "react";

import classes from "./TableauBase.module.scss";

interface Props {
  clickHandler: (e: any) => void;
}

const TableauBase = (props: Props) => {
  return <div className={classes.base} onClick={props.clickHandler}></div>;
};

export default TableauBase;
