import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	category: 1,
};

function categoryReducer(state, action) {
	switch (action.type) {
		case 'SET_CATEGORY':
			return {
				...state,
				category: action.value,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const CategoryStateContext = createContext(null);
const CategoryDispatchContext = createContext(null);

export function CategoryProvider({ children }) {
	const [state, dispatch] = useReducer(categoryReducer, initialState);
	return (
		<CategoryStateContext.Provider value={state}>
			<CategoryDispatchContext.Provider value={dispatch}>{children}</CategoryDispatchContext.Provider>
		</CategoryStateContext.Provider>
	);
}

export function useCategoryState() {
	const state = useContext(CategoryStateContext);
	if (!state) {
		throw new Error('Cannot find CategoryProvider');
	}
	return state;
}

export function useCategoryDispatch() {
	const dispatch = useContext(CategoryDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find CategoryProvider');
	}
	return dispatch;
}
