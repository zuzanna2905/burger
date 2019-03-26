import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm: {
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
        },
        formIsValid: false,
        loading: false
    }

    orderSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true})
        const formData = {};
        for(let elem in this.state.orderForm){
            formData[elem] = this.state.orderForm[elem].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }   
        axios.post('/orders.json', order)
            .then(r => {
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(r => { this.setState({loading: false})})
    }

    inputHandler = (e, inputID) => {
        let orderForm = { ...this.state.orderForm};
        let element = { ...orderForm[inputID]};
        element.value = e.target.value;
        element.valid = this.checkValidity(element.value, element.validation)
        element.touched = true;
        orderForm[inputID] = element;
        
        let formIsValid = true;
        for(let i in orderForm){
            formIsValid = orderForm[i].valid && formIsValid;
        }
        this.setState({orderForm: orderForm, formIsValid: formIsValid});
    }

    checkValidity = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        } 
        let form = (
            <form className={classes.Form} onSubmit={this.orderSubmitHandler}>
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
                            changed={(e) => this.inputHandler(e, elem.id)}
                        />
                    })
                }
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
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