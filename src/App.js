import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Category from './components/Category';
import { UserProvider } from './contexts/UserContext';
import { HeaderProvider } from './contexts/HeaderContext';
// App에서 유저정보 찾아서 다른 컴포넌트들에게 전달하는게 나을까
// 각 컴포넌트에서 유저정보 찾는게 나을까
const AppProvider = ({ contexts, children }) =>
	contexts.reduce(
		(prev, context) =>
			React.createElement(context, {
				children: prev,
			}),
		children
	);

function App() {
	return (
		<AppProvider contexts={[UserProvider, HeaderProvider]}>
			<Header />
			<PrivateRoute path="/" exact component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/signup" component={Signup} />
			<Route path="/category" component={Category} />
		</AppProvider>
	);
}

export default App;
