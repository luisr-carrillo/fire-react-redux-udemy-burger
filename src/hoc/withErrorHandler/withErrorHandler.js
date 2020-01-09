import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Auxiliary>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        );
    };
};

export default withErrorHandler;
