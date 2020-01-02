import React from 'react';
import classes from './Navbar.module.css';
import NavbarItem from './NavbarItem/NavbarItem';

const navbar = props => (
    <ul className={classes.Navbar}>
        <NavbarItem link="/" exact closeDrawer={props.closeDrawer}>
            Burger Builder
        </NavbarItem>

        {props.isAuth ? <NavbarItem link="/orders" closeDrawer={props.closeDrawer}>Orders</NavbarItem> : null}

        {!props.isAuth ? (
            <NavbarItem link="/auth" closeDrawer={props.closeDrawer}>Authenticate</NavbarItem>
        ) : (
            <NavbarItem link="/logout" closeDrawer={props.closeDrawer}>Logout</NavbarItem>
        )}
    </ul>
);

export default navbar;
