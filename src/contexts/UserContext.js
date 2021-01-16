import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	userName: localStorage.getItem('user'),
};

function userReducer(state, action) {
	switch (action.type) {
		case 'CHECK_LOGIN':
			return {
				...state,
				userName: localStorage.getItem('user'),
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
