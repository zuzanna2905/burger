import React from 'react';
import classes from './Order.css';

const order = (props) => {
  let ingredients = <h2>No order!</h2>
  if(props.ingredients){
    ingredients = Object.keys(props.ingredients).map(key => {
      return <p key={key}>{key} ({props.ingredients[key]}) </p>
    })
  }
  return (
    <div className={classes.Order}>
      <p>Ingredients:</p>
      <ul className={classes.List}>{ingredients}</ul>
      <p>Price: <strong>${props.price}</strong></p>
    </div>
  )
}

export default order
