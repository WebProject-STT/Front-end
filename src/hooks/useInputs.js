import { useReducer, useCallback } from 'react';
import Words from '../common/Words';

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
		if (name === 'title' && value.length > 20) {
			alert(Words.LIMIT_TITLE_LENGTH);
		} else {
			dispatch({ type: 'CHANGE', name, value });
		}
	}, []);
	return [form, onChange];
}

export default useInputs;
