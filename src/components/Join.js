import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHeaderDispatch } from '../contexts/HeaderContext';
import useInputs from '../hooks/useInputs';
import useInputsCorrect from '../hooks/useInputsCorrect';
import Words from '../common/Words';
import '../styles/Auth.scss';

const idInformation = [Words.ENTER_ID, Words.ID_CONDITION, Words.ID_CONDITION];
const passwordInformation = [Words.ENTER_PASSWORD, Words.PASSWORD_CONDITION, Words.PASSWORD_CONDITION];
const emailInformation = [Words.ENTER_EMAIL, Words.EMAIL_CONDITION, Words.EMAIL_CONDITION];

function Join() {
	const dispatch = useHeaderDispatch();
	const [state, checkInput] = useInputsCorrect({ idCorrect: 1, passwordCorrect: 1, emailCorrect: 1 });
	const { idCorrect, passwordCorrect, emailCorrect } = state;
	const [form, onChange] = useInputs({ id: '', password: '', email: '' });
	const { id, password, email } = form;

	useEffect(() => {
		dispatch({ type: 'INVISIBLE' });
		return () => {
			dispatch({ type: 'VISIBLE' });
		};
	}, [dispatch]);

	return (
		<div>
			<b>{Words.JOIN}</b>
			<br />
			<span>{Words.ID}</span>
			<input name="id" value={id} onChange={onChange} onBlur={() => checkInput('idCorrect', id)} />
			{idCorrect < 3 && (
				<>
					<span style={{ color: idCorrect === 1 ? 'green' : 'red' }}>{idInformation[idCorrect]}</span>
					<br />
				</>
			)}
			<span>{Words.PASSWORD}</span>
			<input type="password" name="password" value={password} onChange={onChange} onBlur={() => checkInput('passwordCorrect', password)} />
			{passwordCorrect < 3 && (
				<>
					<span style={{ color: passwordCorrect === 1 ? 'green' : 'red' }}>{passwordInformation[passwordCorrect]}</span>
					<br />
				</>
			)}
			<span>{Words.EMAIL}</span>
			<input name="email" value={email} onChange={onChange} onBlur={() => checkInput('emailCorrect', email)} />
			{emailCorrect < 3 && (
				<>
					<span style={{ color: emailCorrect === 1 ? 'green' : 'red' }}>{emailInformation[emailCorrect]}</span>
					<br />
				</>
			)}
			<Link to="/login">
				<button disabled={idCorrect !== 3 || passwordCorrect !== 3 || emailCorrect !== 3}>회원가입</button>
			</Link>
		</div>
	);
}

export default Join;
