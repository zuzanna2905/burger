import React from 'react';
import classes from './Input.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
     
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }

    switch(props.elementType){
        case('input'):
            inputElement = <input 
                onChange = {props.changed}
                {...props.elementConfig} 
                value={props.value} 
                className={inputClasses.join(' ')}
                />
            break;
        case('textarea'):
            inputElement = <textarea 
                onChange = {props.changed}
                {...props.elementConfig} 
                value={props.value} 
                className={inputClasses.join(' ')}
                />
            break;
        case('select'):
            inputElement = <select
            onChange = {props.changed}
            value={props.value} 
            className={inputClasses.join(' ')}
            >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.value}</option>
                ))} 
            </select>
            break;
        default:
            inputElement = <input 
                onChange = {props.changed}
                {...props.elementConfig} 
                value={props.value} 
                className={inputClasses.join(' ')}
            />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
  )
}

export default input
