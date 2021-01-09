import React, { useEffect } from 'react';
import Words from '../common/Words';
import { Link } from 'react-router-dom';
import { useHeaderDispatch } from '../contexts/HeaderContext';
import { useInputsState, useInputsDispatch } from '../contexts/InputsContext';
import useInputs from '../hooks/useInputs';
import { isEmpty } from '../common/CheckValue';
import '../styles/Auth.scss';

function LogIn() {
	const headerDispatch = useHeaderDispatch();
	const inputsState = useInputsState();
	const inputsDispatch = useInputsDispatch();
	const { idCorrect, passwordCorrect } = inputsState;
	const [form, onChange] = useInputs({ id: '', password: '' });
	const { id, password } = form;

	useEffect(() => {
		headerDispatch({ type: 'INVISIBLE' });
		return () => {
			headerDispatch({ type: 'VISIBLE' });
		};
	}, [headerDispatch]);

	const confirmInputs = (e) => {
		const idEmpty = isEmpty(id);
		const passwordEmpty = isEmpty(password);
		inputsDispatch({ type: 'CHANGE_ID', value: !idEmpty });
		inputsDispatch({ type: 'CHANGE_PASSWORD', value: !passwordEmpty });
		if (idEmpty || passwordEmpty) {
			e.preventDefault();
		}
	};

	return (
		<div className="Auth">
			<b>{Words.LOGIN}</b>
			<input name="id" placeholder={Words.ENTER_ID} value={id} onChange={onChange} />
			{!idCorrect && <span>{Words.ENTER_ID}</span>}
			<input type="password" name="password" placeholder={Words.ENTER_PASSWORD} value={password} onChange={onChange} />
			{!passwordCorrect && <span>{Words.ENTER_PASSWORD}</span>}
			<Link to="/category" onClick={confirmInputs}>
				<button>{Words.LOGIN}</button>
			</Link>
			<button>{Words.SOCIAL_LOGIN}</button>
			<span>{Words.ASK_MEMBER}</span>
			<Link to="/join">{Words.JOIN}</Link>
		</div>
	);
}

export default LogIn;
