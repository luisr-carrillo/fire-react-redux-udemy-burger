import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 2,
            meat: 1,
            salad: 1,
            bacon: 3
        }
    };

    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
