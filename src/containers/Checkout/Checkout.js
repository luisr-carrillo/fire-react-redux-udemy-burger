import React from 'react';
import Summary from '../../components/Order/Summary/Summary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    let summary = <Redirect to="/" />;
    if (props.ings) {
        const purchaseRedirect = props.purchase ? (
            <Redirect to="/" />
        ) : null;
        summary = (
            <div>
                {purchaseRedirect}
                <Summary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
    return summary;
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchase: state.order.purchase
    };
};

export default connect(mapStateToProps)(Checkout);
