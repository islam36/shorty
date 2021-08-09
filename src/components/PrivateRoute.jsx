import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { tokenExists } from '../util';

const PrivateRoute = (props) => {
    const history = useHistory();

    if(tokenExists()) {
        return <Route {...props} />
    } else {
        history.push('/login');
        return null;
    }
}

export default PrivateRoute;