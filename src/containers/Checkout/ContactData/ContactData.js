import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }, 
        loading: false
    }

    orderSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Test 123",
                address: {
                    street: "Teststreet",
                    zipCode: "1222"
                },
                email: "test@test.com"
            },
            deliveryMethod: 'fastest'
        }   
        axios.post('/orders.json', order)
            .then(r => {
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(r => { this.setState({loading: false})})
    }

    render() {
        let form = (
            <form className={classes.Form}>
                <input className={classes.Input} type='text' name='name' placeholder='Your name'/>
                <input className={classes.Input} type='email' name='email' placeholder='Your email'/>
                <input className={classes.Input} type='text' name='street' placeholder='Your street'/>
                <input className={classes.Input} type='text' name='postal' placeholder='Your postal code'/>
                <Button btnType='Success' clicked={this.orderSubmitHandler}>ORDER</Button>
            </form>);
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;