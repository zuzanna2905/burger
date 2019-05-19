import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients()
    }, [])

    const purchaseHandler = () => {
        if(props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout')
    }

    const disabledInfo = {
        ...props.ings
    }
    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    let ordersummary =  null;
    let burger = props.error ? <p>Ingredients can not be loaded!</p> : <Spinner/>;
    if(props.ings){
        burger = (
            <Aux>
                <Burger ingredients={props.ings}/>
                <BuildControls 
                    ingredientAdded = {props.onIngredientAdded}
                    ingredientRemove = {props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    purchasable = {props.purchasable}
                    price = {props.price}
                    ordered = {purchaseHandler}    
                    isAuth = {props.isAuthenticated}
                />
            </Aux>
        );
        ordersummary =  <OrderSummary 
            ingredients={props.ings}
            purchaseCancelled = {purchaseCancelHandler} 
            purchaseContinued = {purchaseContinueHandler}
            price={props.price}
        />
    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {ordersummary}
            </Modal>
            {burger}
        </Aux>
    )
}

const mapDispatchToProps = dispatch  => {
    return {
        onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        purchasable: state.burger.purchasable,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));