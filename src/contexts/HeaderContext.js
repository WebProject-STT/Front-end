import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	headerVisibility: true,
};

function headerReducer(state, action) {
	switch (action.type) {
		case 'VISIBLE':
			return {
				...state,
				headerVisibility: true,
			};
		case 'INVISIBLE':
			return {
				...state,
				headerVisibility: false,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const HeaderStateContext = createContext(null);
const HeaderDispatchContext = createContext(null);

export function HeaderProvider({ children }) {
	const [state, dispatch] = useReducer(headerReducer, initialState);
	return (
		<HeaderStateContext.Provider value={state}>
			<HeaderDispatchContext.Provider value={dispatch}>{children}</HeaderDispatchContext.Provider>
		</HeaderStateContext.Provider>
	);
}

export function useHeaderState() {
	const state = useContext(HeaderStateContext);
	if (!state) {
		throw new Error('Cannot find HeaderProvider');
	}
	return state;
}

export function useHeaderDispatch() {
	const dispatch = useContext(HeaderDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find HeaderProvider');
	}
	return dispatch;
}
