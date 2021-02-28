import { useReducer, useCallback } from 'react';

function inputsReducer(state, action) {
	switch (action.type) {
		case 'SET_UPDATE_POST_FORM':
			return {
				title: action.value.title,
				description: action.value.desc,
				tags: action.value.tagList
					.map((tag) => {
						return `#${tag.name}`;
					})
					.join(' '),
				summaries: action.value.summaryList,
			};
		case 'CHANGE_SUMMARY':
			return {
				...state,
				summaries: state.summaries.map((summary) => (summary.id === action.sum_id ? { ...summary, [action.element_name]: action.value } : summary)),
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

function useInputs(initialForm) {
	const [form, dispatch] = useReducer(inputsReducer, initialForm);
	const onChange = useCallback(
		(e, sum_id = 0, element_name = '', isFocus = false, isSpace = false) => {
			let { name, value } = e.target;
			let length = value.length;
			if (name === 'summaries') {
				dispatch({ type: 'CHANGE_SUMMARY', sum_id, element_name, value });
			} else if (name === 'tags') {
				let attach = '';
				if (isSpace) {
					attach = '#';
				} else if (isFocus) {
					attach = length > 0 ? ' #' : '#';
				}
				dispatch({ type: 'CHANGE', name, value: value + attach });
			} else if ((name !== 'description' || length <= 100) && (name !== 'title' || length <= 20)) {
				dispatch({ type: 'CHANGE', name, value });
			}
		},
		[dispatch]
	);
	const setUpdatePostForm = (contents) => {
		dispatch({ type: 'SET_UPDATE_POST_FORM', value: contents });
	};

	return [form, onChange, setUpdatePostForm];
}

export default useInputs;
