import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	headerVisibility: true,
	categoryVisibility: false,
};

function visibilityReducer(state, action) {
	switch (action.type) {
		case 'HEADER_VISIBLE':
			return {
				...state,
				headerVisibility: true,
			};
		case 'HEADER_INVISIBLE':
			return {
				...state,
				headerVisibility: false,
			};
		case 'CATEGORY_VISIBLE':
			return {
				...state,
				categoryVisibility: true,
			};
		case 'CATEGORY_INVISIBLE':
			return {
				...state,
				categoryVisibility: false,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const VisibilityStateContext = createContext(null);
const VisibilityDispatchContext = createContext(null);

export function VisibilityProvider({ children }) {
	const [state, dispatch] = useReducer(visibilityReducer, initialState);
	return (
		<VisibilityStateContext.Provider value={state}>
			<VisibilityDispatchContext.Provider value={dispatch}>{children}</VisibilityDispatchContext.Provider>
		</VisibilityStateContext.Provider>
	);
}

export function useVisibilityState() {
	const state = useContext(VisibilityStateContext);
	if (!state) {
		throw new Error('Cannot find VisibilityProvider');
	}
	return state;
}

export function useVisibilityDispatch() {
	const dispatch = useContext(VisibilityDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find VisibilityProvider');
	}
	return dispatch;
}
