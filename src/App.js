import React, { Component } from 'react';
import './App.css';
import Person from './components/Person/Person';


class App extends Component {
  state = {
    persons: [
      {id: '1', name: "Max", age: 23},
      {id: '2', name: "Manu", age: 30},
      {id: '3', name: "Ela", age: 67}
    ],
    showPersons: false
  }
  
  togglePersonsHandler = (e) => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  nameChangeHandler = (e, id) => {
    let personIndex = this.state.persons.findIndex(p => {return p.id === id});
    const person = {
      ...this.state.persons[personIndex],
      name: e.target.value
    }
    let persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons})
  }

  render() {
    const style = {
      color : "pink",
      backgroundColor : "green",
      padding: "10px", 
      cursor: "pointer"
    }

    let persons = null;
    if(this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person, i) => {
            return <Person 
              key = {person.id}
              person = {person}
              click = {() => this.deletePersonHandler(i)}
              changed = {(event) => this.nameChangeHandler(event, person.id)}
              />
          })}
        </div>
      )
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1 className={classes.join(' ')}>Hi there!</h1>
        <button style={style} onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}   
      </div>
    );
  }
}

export default App;