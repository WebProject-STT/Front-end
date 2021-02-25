import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import CategoryList from './components/CategoryList';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import ViewPost from './components/ViewPost';
import UpdatePost from './components/UpdatePost';
import { UserProvider } from './contexts/UserContext';
import { ComponentVisibilityProvider } from './contexts/ComponentVisibilityContext';
import { CheckStatusProvider } from './contexts/CheckStatusContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { CheckedItemsProvider } from './contexts/CheckedItemContext';
import './styles/App.scss';

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
		<AppProvider contexts={[UserProvider, ComponentVisibilityProvider, CheckStatusProvider, CategoryProvider, CheckedItemsProvider]}>
			<Header />
			<PrivateRoute path="/" exact component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/signup" component={Signup} />
			<div className="app">
				<CategoryList />
				<Route path="/postList/:categoryId" component={PostList} />
				<Route path="/addPost" component={AddPost} />
				<Route path="/viewPost/:postId/" component={ViewPost} />
				<Route path="/updatePost/:postId" component={UpdatePost} />
			</div>
		</AppProvider>
	);
}

export default App;
