import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './common/PrivateRoute';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Category from './components/Category';
import { UserProvider } from './common/UserContext';
// App에서 유저정보 찾아서 다른 컴포넌트들에게 전달하는게 나을까
// 각 컴포넌트에서 유저정보 찾는게 나을까
function App() {
	return (
		<UserProvider>
			<Header />
			<PrivateRoute path="/" exact component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/category" component={Category} />
		</UserProvider>
	);
}

export default App;
