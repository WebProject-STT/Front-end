import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	userToken: localStorage.getItem('userToken'),
	userName: localStorage.getItem('userName'),
};

function userReducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				userToken: action.userToken,
				userName: action.userName,
			};
		case 'LOGOUT':
			return {
				...state,
				userToken: null,
				userName: null,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
	const [state, dispatch] = useReducer(userReducer, initialState);
	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	);
}

export function useUserState() {
	const state = useContext(UserStateContext);
	if (!state) {
		throw new Error('Cannot find UserProvider');
	}
	return state;
}

export function useUserDispatch() {
	const dispatch = useContext(UserDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find UserProvider');
	}
	return dispatch;
}
