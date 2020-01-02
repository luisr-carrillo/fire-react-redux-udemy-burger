import React from 'react';
import classes from './NavbarItem.module.css';
import { NavLink } from 'react-router-dom';

const navbarItem = props => (
    <li className={classes.NavbarItem}>
        <NavLink to={props.link} exact={props.exact} activeClassName={classes.active} onClick={props.closeDrawer}>
            {props.children}
        </NavLink>
    </li>
);

export default navbarItem;
