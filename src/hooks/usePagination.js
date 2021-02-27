import { useReducer, useCallback } from 'react';

function paginationReducer(state, action) {
	switch (action.type) {
		case 'UPDATE_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.value,
			};
		case 'UPDATE_START_END_PAGE':
			return {
				...state,
				start: state.start + action.value,
				end: state.end + action.value,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function usePagination(initialPage = 1) {
	const initialStart = Math.floor(initialPage / 10);
	const initialState = {
		currentPage: initialPage,
		start: initialStart * 10,
		end: (initialStart + 1) * 10,
	};
	const [pagination, dispatch] = useReducer(paginationReducer, initialState);

	const updateCurrentPage = (value) => {
		dispatch({ type: 'UPDATE_CURRENT_PAGE', value });
	};

	const updateStartEndPage = (isUpIndex) => {
		isUpIndex ? dispatch({ type: 'UPDATE_START_END_PAGE', value: 10 }) : dispatch({ type: 'UPDATE_START_END_PAGE', value: -10 });
	};

	return [pagination, updateCurrentPage, updateStartEndPage];
}

export default usePagination;
