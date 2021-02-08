import { useReducer, useCallback } from 'react';
import Words from '../common/Words';

function inputsReducer(state, action) {
	switch (action.type) {
		case 'CHANGE_SUBJECT':
			return {
				...state,
				subjects: state.subjects.map((subject) => (subject.sum_id === action.sum_id ? { ...subject, [action.element_name]: action.value } : subject)),
			};
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
	const onChange = useCallback(
		(e, sum_id = 0, element_name = '') => {
			const { name, value } = e.target;
			const length = value.length;
			console.log(value);
			if (name === 'title' && length > 20) {
				alert(Words.LIMIT_TITLE_LENGTH);
			} else if (name === 'subjects') {
				dispatch({ type: 'CHANGE_SUBJECT', sum_id, element_name, value });
			} else if (name === 'keywords' && e.nativeEvent.data === ' ') {
				dispatch({ type: 'CHANGE', name, value: value + '#' });
			} else if (name !== 'description' || length <= 100) {
				dispatch({ type: 'CHANGE', name, value });
			}
		},
		[dispatch]
	);

	return [form, onChange];
}

export default useInputs;
