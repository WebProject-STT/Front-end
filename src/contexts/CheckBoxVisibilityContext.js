import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	checkBoxVisibility: false,
};

function checkBoxVisibilityReducer(state, action) {
	switch (action.type) {
		case 'CHECKBOX_VISIBLE':
			return {
				...state,
				checkBoxVisibility: true,
			};
		case 'CHECKBOX_INVISIBLE':
			return {
				...state,
				checkBoxVisibility: false,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const CheckBoxVisibilityStateContext = createContext(null);
const CheckBoxVisibilityDispatchContext = createContext(null);

export function CheckBoxVisibilityProvider({ children }) {
	const [state, dispatch] = useReducer(checkBoxVisibilityReducer, initialState);
	return (
		<CheckBoxVisibilityStateContext.Provider value={state}>
			<CheckBoxVisibilityDispatchContext.Provider value={dispatch}>{children}</CheckBoxVisibilityDispatchContext.Provider>
		</CheckBoxVisibilityStateContext.Provider>
	);
}

export function useCheckBoxVisibilityState() {
	const state = useContext(CheckBoxVisibilityStateContext);
	if (!state) {
		throw new Error('Cannot find CheckBoxVisibilityProvider');
	}
	return state;
}

export function useCheckBoxVisibilityDispatch() {
	const dispatch = useContext(CheckBoxVisibilityDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find CheckBoxVisibilityProvider');
	}
	return dispatch;
}
