import React from 'react';
import './Person.css'

const person = (props) => {
    return (
        <div className="Person">    
            <input type='text' value={props.person.name} onChange={props.changed}/>
            <p onClick={props.click}>I am a {props.person.name} and I am {props.person.age} years old!</p>
            <p>{props.children}</p>
        </div>
    )
}

export default person;