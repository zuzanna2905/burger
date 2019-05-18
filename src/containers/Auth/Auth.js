import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css'
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

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

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputHandler = (e, inputID) => {
        const element = updateObject(this.state.controls[inputID], {
            value: e.target.value, 
            valid: checkValidity(e.target.value, this.state.controls[inputID].validation),
            touched: true
        })
        const controls = updateObject(this.state.controls, {
            [inputID] : element
        })

        let formIsValid = true;
        for(let i in controls){
            formIsValid = controls[i].valid && formIsValid;
        }
        this.setState({controls: controls, formIsValid: formIsValid});
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

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
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