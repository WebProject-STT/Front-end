import { useReducer, useCallback } from 'react';

function inputsReducer(state, action) {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				[action.name]: action.value,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

export function useInputs(initialForm) {
	const [form, dispatch] = useReducer(inputsReducer, initialForm);
	const onChange = useCallback((e) => {
		const { name, value } = e.target;
		dispatch({ type: 'CHANGE', name, value });
	}, []);
	return [form, onChange];
}

export default useInputs;
