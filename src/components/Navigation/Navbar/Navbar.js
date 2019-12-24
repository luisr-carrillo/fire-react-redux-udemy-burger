import React from 'react';
import classes from './Navbar.module.css';
import NavbarItem from './NavbarItem/NavbarItem';

const navbar = props => (
    <ul className={classes.Navbar}>
        <NavbarItem link="/" exact>
            Burger Builder
        </NavbarItem>
        <NavbarItem link="/orders">Orders</NavbarItem>
    </ul>
);

export default navbar;
