import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Tofu', type: 'tofu'},
    {label: 'Cucumber', type: 'cucumber'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Tomato', type: 'tomato'},
    {label: 'Onion', type: 'onion'},
    {label: 'Cheese', type: 'cheese'}
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
    </div>
  )
}

export default buildControls;