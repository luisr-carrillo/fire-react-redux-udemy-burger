import React, { Component } from 'react';
import Summary from '../../components/Order/Summary/Summary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchase ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <Summary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchase: state.order.purchase
    };
};

export default connect(mapStateToProps)(Checkout);
