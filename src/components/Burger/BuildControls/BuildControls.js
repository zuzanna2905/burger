import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Tomato', type: 'tomato'},
    {label: 'Onion', type: 'onion'},
    {label: 'Cucumber', type: 'cucumber'},
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Tofu', type: 'tofu'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctr => {
            return <BuildControl 
            key={ctr.label} 
            label={ctr.label} 
            added = {() => props.ingredientAdded(ctr.type)}
            removed = {() => props.ingredientRemove(ctr.type)}
            disabled={props.disabled[ctr.type]}/>
      })}
      <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  )
}

export default buildControls;