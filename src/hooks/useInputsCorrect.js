import { useReducer } from 'react';
import { isEmpty, isCorrectLength } from '../common/CheckValue';

function inputsCorrectReducer(state, action) {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				[action.inputType]: action.value,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function useInputsCorrect(initialState) {
	const [state, dispatch] = useReducer(inputsCorrectReducer, initialState);
	const checkInput = (inputType, inputValue) => {
		let value = 3;
		if (isEmpty(inputValue)) {
			value = 0;
		}
		if (value !== 0) {
			let isCorrect = false;
			switch (inputType) {
				case 'idCorrect':
					const reg = /^[a-zA-z0-9]+$/;
					isCorrect = reg.test(inputValue) && isCorrectLength(inputValue, 5, 20);
					break;
				case 'passwordCorrect':
					isCorrect = isCorrectLength(inputValue, 8);
					break;
				case 'emailCorrect':
					isCorrect = inputValue.search('@') >= 0;
					break;
				default:
					throw new Error(`Unhandled input type: ${inputType}`);
			}
			if (!isCorrect) {
				value = 2;
			}
		}
		dispatch({ type: 'CHANGE', inputType, value });
	};

	return [state, checkInput];
}

export default useInputsCorrect;
