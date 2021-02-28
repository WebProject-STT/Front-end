import { useReducer, useEffect } from 'react';

let dataInitialState;

function reducer(state, action) {
	switch (action.type) {
		case 'LOADING':
			return {
				loading: true,
				data: dataInitialState,
				error: null,
				fetchEnd: false,
			};
		case 'SUCCESS':
			return {
				loading: false,
				data: action.data,
				error: null,
				fetchEnd: true,
			};
		case 'ERROR':
			return {
				loading: false,
				data: dataInitialState,
				error: action.error,
				fetchEnd: true,
			};
		case 'FETCH_END':
			return {
				...state,
				fetchEnd: false,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function useAsync(callback, deps = null, skip = false, isGetPostList = false) {
	dataInitialState = isGetPostList ? null : [];
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		data: dataInitialState,
		error: false,
		fetchEnd: false,
	});

	const fetchData = async () => {
		dispatch({ type: 'LOADING' });
		try {
			const data = await callback();
			dispatch({ type: 'SUCCESS', data });
		} catch (e) {
			dispatch({ type: 'ERROR', error: e });
		}
	};

	const changeFetchEnd = () => {
		dispatch({ type: 'FETCH_END' });
	};

	useEffect(() => {
		if (skip) return;
		fetchData();
	}, [skip, deps]);

	return [state, fetchData, changeFetchEnd];
}

export default useAsync;
