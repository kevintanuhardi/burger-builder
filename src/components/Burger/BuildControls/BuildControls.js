import React from 'react';

import classes from './BuildControls.module.css'

import BuildControl from './BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price:<span>{props.price.toFixed(2)}</span></p>
       {controls.map((el, i) => (
        <BuildControl
          key={i}
          label={el.label}
          added={() => props.ingredientAdded(el.type)}
          removed={() => props.ingredientRemoved(el.type)}
          disabled={props.disabledInfo[el.type]}/>)
       )}
       <button
        className={classes.OrderButton}
        disabled={props.purchasable}
        onClick={props.toggleShowOrderSummary}>
         ORDER NOW
        </button>
    </div>
  );
};

export default BuildControls;