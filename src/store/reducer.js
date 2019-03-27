import * as actions from './action';

const initialState = {
    ingredients: {
        tomato: 0,
        onion: 0,
        cucumber: 0,
        salad: 0,
        cheese: 0,
        bacon: 0,
        tofu: 0,
        meat: 0
    },
    totalPrice: 5,
    purchasable: false
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

const INITIAL_PRICE = 5;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_INGREDIENT:
            let newPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: newPrice,
                purchasable: newPrice > INITIAL_PRICE
            }
        case actions.REMOVE_INGREDIENT:
            newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: newPrice,
                purchasable: newPrice > INITIAL_PRICE
            }
        default:
            return state;
    }

};

export default reducer;