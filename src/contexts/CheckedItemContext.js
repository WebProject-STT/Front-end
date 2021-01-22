import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
	checkedItems: [],
};

function checkedItemsReducer(state, action) {
	switch (action.type) {
		case 'ADD_ITEM':
			return {
				checkedItems: state.checkedItems.concat(action.item),
			};
		case 'DELETE_ITEM':
			return {
				...state,
				checkedItems: state.checkedItems.filter((checkedItem) => checkedItem !== action.item),
			};
		case 'RESET_ITEM':
			return {
				checkedItems: [],
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const CheckedItemsStateContext = createContext(null);
const CheckedItemsDispatchContext = createContext(null);

export function CheckedItemsProvider({ children }) {
	const [state, dispatch] = useReducer(checkedItemsReducer, initialState);
	return (
		<CheckedItemsStateContext.Provider value={state}>
			<CheckedItemsDispatchContext.Provider value={dispatch}>{children}</CheckedItemsDispatchContext.Provider>
		</CheckedItemsStateContext.Provider>
	);
}

export function useCheckedItemsState() {
	const state = useContext(CheckedItemsStateContext);
	if (!state) {
		throw new Error('Cannot find CheckedItemsProvider');
	}
	return state;
}

export function useCheckedItemsDispatch() {
	const dispatch = useContext(CheckedItemsDispatchContext);
	if (!dispatch) {
		throw new Error('Cannot find CheckedItemsProvider');
	}
	return dispatch;
}
