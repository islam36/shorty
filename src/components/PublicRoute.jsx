import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { tokenExists } from '../util';

const PublicRoute = (props) => {
    const history = useHistory();
    if(tokenExists()) {
        history.push('/app');
        return null;
    } else {
        return <Route {...props} />
    }
}

export default PublicRoute;