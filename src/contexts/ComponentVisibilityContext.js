import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	headerVisibility: true,
	categoryVisibility: false,
};

function componentVisibilityReducer(state, action) {
	switch (action.type) {
		case 'VISIBLE':
			return {
				...state,
				[action.name]: true,
			};
		case 'INVISIBLE':
			return {
				...state,
				[action.name]: false,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const ComponentVisibilityStateContext = createContext(null);
const ComponentVisibilityDispatchContext = createContext(null);

export function ComponentVisibilityProvider({ children }) {
	const [state, dispatch] = useReducer(componentVisibilityReducer, initialState);
	return (
		<ComponentVisibilityStateContext.Provider value={state}>
			<ComponentVisibilityDispatchContext.Provider value={dispatch}>{children}</ComponentVisibilityDispatchContext.Provider>
		</ComponentVisibilityStateContext.Provider>
	);
}

export function useComponentVisibilityState() {
	const state = useContext(ComponentVisibilityStateContext);
	if (!state) {
		throw new Error('Cannot find ComponentVisibilityProvider');
	}
	return state;
}

export function useComponentVisibilityDispatch() {
	const dispatch = useContext(ComponentVisibilityDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find ComponentVisibilityProvider');
	}
	return dispatch;
}
