import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserState } from '../contexts/UserContext';

function PrivateRoute({ component: Component, ...rest }) {
	const { userName } = useUserState();
	return <Route {...rest} render={(props) => (userName ? <Redirect to="/category" /> : <Component {...props} />)} />;
}

export default PrivateRoute;
