import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = e => {
        e.preventDefault();

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Luis Carrillo',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '64000',
                    country: 'Mexico'
                },
                email: 'luis@email.mx'
            },
            deliveryMethod: 'fastest'
        };
        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }));
    };

    render() {
        let form = (
            <form className={classes.Form}>
                <input
                    className={classes.Input}
                    tpye="text"
                    name="name"
                    placeholder="Your name"
                />
                <input
                    className={classes.Input}
                    tpye="email"
                    name="email"
                    placeholder="Your email"
                />
                <input
                    className={classes.Input}
                    tpye="text"
                    name="street"
                    placeholder="Street"
                />
                <input
                    className={classes.Input}
                    tpye="text"
                    name="postal"
                    placeholder="Postal Code"
                />
                <Button btnType="Success" clicked={this.orderHandler}>
                    Order
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
