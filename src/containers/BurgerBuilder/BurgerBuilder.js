import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/action';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('https://burger-a2c1c.firebaseio.com/ingredients.json')
        //     .then(resp => {
        //         this.setState({ingredients: resp.data})
        //     })
        //     .catch(error => this.setState({error: true}))
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let ordersummary =  null;
        let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner/>;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemove = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        purchasable = {this.props.purchasable}
                        price = {this.props.price}
                        ordered = {this.purchaseHandler}    
                    />
                </Aux>
            );
            ordersummary =  <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled = {this.purchaseCancelHandler} 
                purchaseContinued = {this.purchaseContinueHandler}
                price={this.props.price}
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

const mapDispatchToProps = dispatch  => {
    return {
        onIngredientAdded: (name) => dispatch({type: actions.ADD_INGREDIENT, ingredientName: name}),
        onIngredientRemoved: (name) => dispatch({type: actions.REMOVE_INGREDIENT, ingredientName: name})
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        purchasable: state.purchasable
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));