import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        console.log('[componentDidMount] BurgerBuilder.js');
        /*         axios
            .get('ingredients.json')
            .then(response => {
                const addPrice = this.calculateInitialPrice(response.data);

                this.setState(prevState => {
                    return {
                        ingredients: response.data,
                        totalPrice: prevState.totalPrice + addPrice
                    };
                });
            })
            .catch(error => {
                this.setState({ error: true });
            }); */
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    /* calculateInitialPrice = ingredients =>
        Object.keys(ingredients)
            .map(
                ingredientKey =>
                    ingredients[ingredientKey] *
                    INGREDIENT_PRICES[ingredientKey]
            )
            .reduce((acumulator, element) => acumulator + element, 0); */
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? (
            <p style={{ textAlign: 'center', color: 'red' }}>
                Ingredients can't be loaded!
            </p>
        ) : (
            <Spinner />
        );

        if (this.props.ings !== null) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                    />
                </Auxiliary>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCancelHandler={this.purchaseCancelHandler}
                    purchaseContinueHandler={this.purchaseContinueHandler}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingName
            }),
        onIngredientRemoved: ingName =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: ingName
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
