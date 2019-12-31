import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4.0,
    error: false
};

const INGREDIENT_PRICES = {
    bacon: 1,
    cheese: 0.5,
    meat: 1.5,
    salad: 0.5
};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };

    const updatedIngredients = updatedObject(
        state.ingredients,
        updatedIngredient
    );

    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updatedObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngt = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngs = updatedObject(state.ingredients, updatedIngt);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
    return updatedObject(state, updatedSt);
};

const setIngredients = (state, action) => {
    const initialPrice =
        4.0 +
        Object.keys(action.ingredients)
            .map(
                ingredientKey =>
                    action.ingredients[ingredientKey] *
                    INGREDIENT_PRICES[ingredientKey]
            )
            .reduce((acumulator, element) => acumulator + element, 0);
    // const initialPrice = state.totalPrice + initPrice;

    return updatedObject(state, {
        ingredients: action.ingredients,
        totalPrice: initialPrice,
        error: false
    });
};

const fetchIngredientsFailed = state => updatedObject(state, { error: true });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);

        default:
            return state;
    }
};

export default reducer;
