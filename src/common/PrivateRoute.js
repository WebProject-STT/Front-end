import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserState } from '../contexts/UserContext';

function PrivateRoute({ component: Component, ...rest }) {
	const { userToken } = useUserState();
	return <Route {...rest} render={(props) => (userToken ? <Redirect to="/postList/1" /> : <Component {...props} />)} />;
}

export default PrivateRoute;
