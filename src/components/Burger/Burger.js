import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    // Create an array of the keys of ingredients object ["meat", "cheese", "salad", "bacon"]
    // Loop over names
    const transformedIngredients = Object.keys(props.ingredients).map(
        ingredientName => {
            // Return an array
            // That array contains an empty "placeholder" equal to the int value we have set on that ingredient

            /* Example :
             *    cheese: 2, meat: 1, salad: 1, bacon: 3
             *    Would create: Array of undefined -> [ ["", ""], [""], [""], ["", "", ""] ]
             */

            return [...Array(props.ingredients[ingredientName])].map(
                (_, index) => {
                    // We then map over each of those empty placeholders, and for each we return the ingredient component that is "ingredient-name"
                    return (
                        <BurgerIngredient
                            key={ingredientName + index}
                            type={ingredientName}
                        />
                    );
                }
            );
        }
    );

    const arr = [...["","",""]].map((_, i) => i);
    console.log(arr); // true

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
