import { useReducer, useCallback } from 'react';
import Words from '../common/Words';
import { isCorrectLength } from '../common/CheckValue';

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
		(e, sum_id = 0, element_name = '', isFocus = false, isSpace = false) => {
			let { name, value } = e.target;
			let length = value.length;
			console.log(name, value);
			if (name === 'title' && !isCorrectLength(value, 0, 20)) {
				// console.log(isCorrectLength(value, 0, 20));
				// console.log(value);
				// alert(Words.LIMIT_TITLE_LENGTH);
			} else if (name === 'subjects') {
				dispatch({ type: 'CHANGE_SUBJECT', sum_id, element_name, value });
			} else if (name === 'keywords') {
				let attach = '';
				if (isSpace) {
					attach = '#';
				} else if (isFocus) {
					attach = length > 0 ? ' #' : '#';
				}
				dispatch({ type: 'CHANGE', name, value: value + attach });
			} else if (name !== 'description' || length <= 100) {
				console.log('didlaak');
				dispatch({ type: 'CHANGE', name, value });
			}
		},
		[dispatch]
	);

	return [form, onChange];
}

export default useInputs;
