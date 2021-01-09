import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	idCorrect: true,
	passwordCorrect: true,
	emailCorrect: true,
};

function inputsReducer(state, action) {
	switch (action.type) {
		case 'CHANGE_ID':
			return {
				...state,
				idCorrect: action.value,
			};
		case 'CHANGE_PASSWORD':
			return {
				...state,
				passwordCorrect: action.value,
			};
		case 'CHANGE_EMAIL':
			return {
				...state,
				emailCorrect: action.value,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const InputsStateContext = createContext(null);
const InputsDispatchContext = createContext(null);

export function InputsProvider({ children }) {
	const [state, dispatch] = useReducer(inputsReducer, initialState);
	return (
		<InputsStateContext.Provider value={state}>
			<InputsDispatchContext.Provider value={dispatch}>{children}</InputsDispatchContext.Provider>
		</InputsStateContext.Provider>
	);
}

export function useInputsState() {
	const state = useContext(InputsStateContext);
	if (!state) {
		throw new Error('Cannot find InputsProvider');
	}
	return state;
}

export function useInputsDispatch() {
	const dispatch = useContext(InputsDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find InputsProvider');
	}
	return dispatch;
}
