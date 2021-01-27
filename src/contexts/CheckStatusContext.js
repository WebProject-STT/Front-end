import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	checkBoxVisibility: false,
	isAllChecked: false,
};

function checkStatusReducer(state, action) {
	switch (action.type) {
		case 'SET_TRUE':
			return {
				...state,
				[action.name]: true,
			};
		case 'SET_FALSE':
			return {
				...state,
				[action.name]: false,
			};
		case 'RESET':
			return {
				...state,
				checkBoxVisibility: false,
				isAllChecked: false,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const CheckStatusStateContext = createContext(null);
const CheckStatusDispatchContext = createContext(null);

export function CheckStatusProvider({ children }) {
	const [state, dispatch] = useReducer(checkStatusReducer, initialState);
	return (
		<CheckStatusStateContext.Provider value={state}>
			<CheckStatusDispatchContext.Provider value={dispatch}>{children}</CheckStatusDispatchContext.Provider>
		</CheckStatusStateContext.Provider>
	);
}

export function useCheckStatusState() {
	const state = useContext(CheckStatusStateContext);
	if (!state) {
		throw new Error('Cannot find CheckStatusProvider');
	}
	return state;
}

export function useCheckStatusDispatch() {
	const dispatch = useContext(CheckStatusDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find CheckStatusProvider');
	}
	return dispatch;
}
