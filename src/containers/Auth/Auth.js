import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css'
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [controls, setControls] = useState({
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
            }
        });
    const [isSignup, setIsSignup] = useState(true);

    useEffect(()=> {
        if(!props.buildingBurger && props.authRedirectPath !== '/'){
            props.onSetAuthRedirectPath();
        }
    }, [])

    const inputHandler = (e, inputID) => {
        const element = updateObject(controls[inputID], {
            value: e.target.value, 
            valid: checkValidity(e.target.value, controls[inputID].validation),
            touched: true
        })
        const newControls = updateObject(controls, {
            [inputID] : element
        })

        setControls(newControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

    const formElementsArray = [];
    for (let key in controls){
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    } 
    let form = (
        <form className={classes.Form} onSubmit={submitHandler}>
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
            <Button btnType='Success'>SUBMIT</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if(props.error){
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            {form}
            <Button 
                clicked = {switchAuthModeHandler}
                btnType='Danger'> SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);