import React from 'react';
import classes from './Navbar.module.css';
import NavbarItem from './NavbarItem/NavbarItem';

const navbar = props => (
    <ul className={classes.Navbar}>
        <NavbarItem link="/" exact>
            Burger Builder
        </NavbarItem>

        {props.isAuth ? <NavbarItem link="/orders">Orders</NavbarItem> : null}

        {!props.isAuth ? (
            <NavbarItem link="/auth">Authenticate</NavbarItem>
        ) : (
            <NavbarItem link="/logout">Logout</NavbarItem>
        )}
    </ul>
);

export default navbar;
