import React from 'react';
import Logo from '../../Logo/Logo';
import Navbar from '../../Navigation/Navbar/Navbar';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <Navbar isAuth={props.isAuth} closeDrawer={props.closed} />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;
