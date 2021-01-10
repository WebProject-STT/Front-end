import React, { useEffect } from 'react';
import Words from '../common/Words';
import { Link } from 'react-router-dom';
import { useHeaderDispatch } from '../contexts/HeaderContext';
import useInputs from '../hooks/useInputs';
import useInputsCorrect from '../hooks/useInputsCorrect';
import { isEmpty } from '../common/CheckValue';
import '../styles/Auth.scss';

function LogIn() {
	const headerDispatch = useHeaderDispatch();
	const [form, onChange] = useInputs({ id: '', password: '' });
	const { id, password } = form;
	const [state, checkInput] = useInputsCorrect({ idCorrect: 1, passwordCorrect: 1 });
	const { idCorrect, passwordCorrect } = state;

	useEffect(() => {
		headerDispatch({ type: 'INVISIBLE' });
		return () => {
			headerDispatch({ type: 'VISIBLE' });
		};
	}, [headerDispatch]);

	const confirmInputs = (e) => {
		checkInput('idCorrect', id);
		checkInput('passwordCorrect', password);
		if (isEmpty(id) || isEmpty(password)) {
			e.preventDefault();
		}
	};

	return (
		<div className="Auth">
			<b>{Words.LOGIN}</b>
			<input name="id" placeholder={Words.ENTER_ID} value={id} onChange={onChange} />
			{idCorrect === 0 && <span style={{ color: 'red' }}>{Words.ENTER_ID}</span>}
			<input type="password" name="password" placeholder={Words.ENTER_PASSWORD} value={password} onChange={onChange} />
			{passwordCorrect === 0 && <span style={{ color: 'red' }}>{Words.ENTER_PASSWORD}</span>}
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
