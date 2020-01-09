import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuth = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();
    
    const onInitIngredients = useCallback(() => {
        dispatch(actions.initIngredients());
    }, [dispatch]);

    const onIngredientAdded = ingName =>
        dispatch(actions.addIngredient(ingName));
    
    const onIngredientRemoved = ingName =>
        dispatch(actions.removeIngredient(ingName));
    
    const onInitPurchase = () => 
        dispatch(actions.purchaseInit());

    const onSetAuthRedirectPath = path =>
        dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (isAuth) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>
            Ingredients can't be loaded!
        </p>
    ) : (
        <Spinner />
    );

    if (ings !== null) {
        burger = (
            <Auxiliary>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    price={price}
                    ordered={purchaseHandler}
                    purchasable={updatePurchaseState(ings)}
                    isAuth={isAuth}
                />
            </Auxiliary>
        );
        orderSummary = (
            <OrderSummary
                ingredients={ings}
                price={price}
                purchaseCancelHandler={purchaseCancelHandler}
                purchaseContinueHandler={purchaseContinueHandler}
            />
        );
    }

    return (
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
};

export default withErrorHandler(BurgerBuilder, axios);
