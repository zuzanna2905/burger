import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false})
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId}) 
    return updateObject(state, { loading: false, purchased: true, orders: state.orders.concat(newOrder)})
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {loading: false})
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {loading: false})    
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders, loading: false})
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.PURCHASE_INIT: return purchaseInit(state, action);
        case actions.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actions.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actions.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actions.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        case actions.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actions.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        default: return state;
    }
};

export default reducer;