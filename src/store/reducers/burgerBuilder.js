import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 5,
    purchasable: false,
    building: false
}

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

const INIT_PRICE = 5;

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        purchasable: true,
        building: true
    };
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchasable: newPrice > INIT_PRICE,
        building: true
    };
    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    return updateObject(state, 
        { 
            ingredients: action.ingredients, 
            totalPrice: 5, 
            error: false,
            building: false
        })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_INGREDIENT: return addIngredient(state, action);
        case actions.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actions.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        case actions.SET_INGREDIENTS: return setIngredients(state, action);
        default: return state;
    }
};

export default reducer;