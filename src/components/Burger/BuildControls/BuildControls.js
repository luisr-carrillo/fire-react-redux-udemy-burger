import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' }
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        <div>
            Current Price: <strong>$ {props.price.toFixed(2)}</strong>
        </div>

        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}

        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>Order now</button>
    </div>
);

export default buildControls;
