import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css'
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {    
            email: {
                elementType:'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true, 
                    isEmail: true
                },
                valid: false,
                touched: false
            }, 
            password: {
                elementType:'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true, 
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    inputHandler = (e, inputID) => {
        let controls = { ...this.state.controls};
        let element = { ...controls[inputID]};
        element.value = e.target.value;
        element.valid = this.checkValidity(element.value, element.validation)
        element.touched = true;
        controls[inputID] = element;
        
        let formIsValid = true;
        for(let i in controls){
            formIsValid = controls[i].valid && formIsValid;
        }
        this.setState({controls: controls, formIsValid: formIsValid});
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
        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {return { isSignup: !prevState.isSignup }})
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        } 
        let form = (
            <form className={classes.Form} onSubmit={this.submitHandler}>
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
                <Button btnType='Success' disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                {form}
                <Button 
                    clicked = {this.switchAuthModeHandler}
                    btnType='Danger'> SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);