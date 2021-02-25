import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	contentsList: [],
};

function contentsListReducer(state, action) {
	switch (action.type) {
		case 'SET_CONTENTS_LIST':
			return {
				...state,
				contentsList: action.value,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const ContentsListStateContext = createContext(null);
const ContentsListDispatchContext = createContext(null);

export function ContentsListProvider({ children }) {
	const [state, dispatch] = useReducer(contentsListReducer, initialState);
	return (
		<ContentsListStateContext.Provider value={state}>
			<ContentsListDispatchContext.Provider value={dispatch}>{children}</ContentsListDispatchContext.Provider>
		</ContentsListStateContext.Provider>
	);
}

export function useContentsListState() {
	const state = useContext(ContentsListStateContext);
	if (!state) {
		throw new Error('Cannot find ContentsListProvider');
	}
	return state;
}

export function useContentsListDispatch() {
	const dispatch = useContext(ContentsListDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find ContentsListProvider');
	}
	return dispatch;
}
