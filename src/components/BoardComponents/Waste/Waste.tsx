import React from 'react'
import Card from "../../Card/Card";

import classes from './Waste.module.scss';

interface Props {
  waste_top: number[];
}

const Waste = (props: Props) => {
  return (
    <div className={classes.waste}>
      <Card suite={props.waste_top[0]} value={props.waste_top[1]} />
    </div>
  )
}

export default Waste
