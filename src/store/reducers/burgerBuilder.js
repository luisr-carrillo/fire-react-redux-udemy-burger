import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    bacon: 1,
    cheese: 0.5,
    meat: 1.5,
    salad: 0.5
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1
                },
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1
                },
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            const initialPrice =
                state.totalPrice +
                Object.keys(action.ingredients)
                    .map(
                        ingredientKey =>
                            action.ingredients[ingredientKey] *
                            INGREDIENT_PRICES[ingredientKey]
                    )
                    .reduce((acumulator, element) => acumulator + element, 0);
            // const initialPrice = state.totalPrice + initPrice;

            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: initialPrice,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
