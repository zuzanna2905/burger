import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    tomato: 0.3,
    onion: 0.3,
    cucumber: 0.5,
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.8,
    tofu: 1,
    meat: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burger-a2c1c.firebaseio.com/ingredients.json')
            .then(resp => {
                this.setState({ingredients: resp.data})
            })
            .catch(error => this.setState({error: true}))
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0})
    }

    addingIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddintion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddintion;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients);
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let ordersummary =  null;
        let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner/>;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addingIngredientHandler}
                        ingredientRemove = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        purchasable = {this.state.purchasable}
                        price = {this.state.totalPrice}
                        ordered = {this.purchaseHandler}    
                    />
                </Aux>
            );
            ordersummary =  <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancelled = {this.purchaseCancelHandler} 
                purchaseContinued = {this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />
        }
        if(this.state.loading){
            ordersummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);