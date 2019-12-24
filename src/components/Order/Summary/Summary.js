import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './Summary.module.css';

const summary = props => {
    return (
        <div className={classes.Summary}>
            <h1>We hope it tastes well!</h1>
            <div
                style={{
                    width: '100%',
                    margin: '16px auto 32px'
                }}
            >
                <Burger ingredients={props.ingredients} />
            </div>

            <Button btnType="Danger" clicked={props.checkoutCancelled}>
                Cancel
            </Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>
                Continue
            </Button>
        </div>
    );
};

export default summary;
