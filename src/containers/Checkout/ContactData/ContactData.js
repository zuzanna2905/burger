import React, { useState } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType:'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType:'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType:'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5, 
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country:{
            elementType:'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType:'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType:'select',
            elementConfig: {
                options: [
                    {value: 'fastest'},
                    {value: 'cheapest'}
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const orderSubmitHandler = (e) => {
        e.preventDefault();
        setFormIsValid(true)
        const formData = {};
        for(let elem in orderForm){
            formData[elem] = orderForm[elem].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const inputHandler = (e, inputID) => {
        const element = updateObject(orderForm[inputID], {
            value: e.target.value, 
            valid: checkValidity(e.target.value, orderForm[inputID].validation),
            touched: true
        })
        const newOrderForm = updateObject(orderForm, {
            [inputID] : element
        })
        
        let formIsValid = true;
        for(let i in newOrderForm){
            formIsValid = newOrderForm[i].valid && formIsValid;
        }
        setOrderForm(newOrderForm);
        setFormIsValid(formIsValid);
    }

    const formElementsArray = [];
    for (let key in orderForm){
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    } 
    let form = (
        <form className={classes.Form} onSubmit={orderSubmitHandler}>
            {
                formElementsArray.map(elem => {
                    return <Input 
                        key={elem.id}
                        elementType={elem.config.elementType}
                        elementConfig={elem.config.elementConfig}
                        value={elem.config.value}
                        invalid={!elem.config.valid}
                        shouldValidate={elem.config.validation}
                        touched={elem.config.touched}
                        changed={(e) => inputHandler(e, elem.id)}
                    />
                })
            }
            <Button btnType='Success' disabled={!formIsValid}>ORDER</Button>
        </form>);
    if(props.loading){
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data!</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state =>{
    return{
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));