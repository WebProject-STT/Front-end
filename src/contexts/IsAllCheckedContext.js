import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	isAllChecked: false,
};

function isAllCheckedReducer(state, action) {
	switch (action.type) {
		case 'CHECKED':
			return {
				...state,
				isAllChecked: true,
			};
		case 'NOT_CHECKED':
			return {
				...state,
				isAllChecked: false,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const IsAllCheckedStateContext = createContext(null);
const IsAllCheckedDispatchContext = createContext(null);

export function IsAllCheckedProvider({ children }) {
	const [state, dispatch] = useReducer(isAllCheckedReducer, initialState);
	return (
		<IsAllCheckedStateContext.Provider value={state}>
			<IsAllCheckedDispatchContext.Provider value={dispatch}>{children}</IsAllCheckedDispatchContext.Provider>
		</IsAllCheckedStateContext.Provider>
	);
}

export function useIsAllCheckedState() {
	const state = useContext(IsAllCheckedStateContext);
	if (!state) {
		throw new Error('Cannot find IsAllCheckedProvider');
	}
	return state;
}

export function useIsAllCheckedDispatch() {
	const dispatch = useContext(IsAllCheckedDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find IsAllCheckedProvider');
	}
	return dispatch;
}
