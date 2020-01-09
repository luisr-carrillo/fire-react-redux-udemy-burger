import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updatedObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const {
        onAuth,
        onSetAuthRedirectPath,
        buildingBurger,
        authRedirectPath
    } = props;
    
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Please enter a valid e-mail'
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            errorMessage: 'Please enter a valid password'
        }
    });
    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(authForm, {
            [controlName]: updatedObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    authForm[controlName].validation
                ),
                touched: true
            })
        });

        setAuthForm(updatedControls);
    };

    const submitHandler = e => {
        e.preventDefault();
        onAuth(authForm.email.value, authForm.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    };

    const firebaseMessagesHandler = message => {
        switch (message) {
            case 'INVALID_EMAIL':
                return 'Enter a valid e-mail';
            case 'EMAIL_EXISTS':
                return 'The email is already in use';
            case 'EMAIL_NOT_FOUND':
                return 'There is no user record corresponding to this identifier';
            case 'INVALID_PASSWORD':
                return 'The password is invalid';
            default:
                return 'Firebase error';
        }
    };

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            errorMessage={formElement.config.errorMessage}
            changed={e => inputChangedHandler(e, formElement.id)}
        />
    ));

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p style={{ color: 'red' }}>
                {firebaseMessagesHandler(props.error.message)}
            </p>
        );
    }
    let authRedirect = null;
    if (props.isAuth) {
        authRedirect = <Redirect to={authRedirectPath} />;
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">
                    {isSignup ? ' Submit register' : ' Log-in'}
                </Button>
                <p
                    className={classes.LoginOption}
                    onClick={switchAuthModeHandler}
                >
                    {isSignup
                        ? ' Already have an account?'
                        : " I don't have an account"}
                </p>
            </form>
            {errorMessage}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
