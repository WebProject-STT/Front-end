import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import useInputs from '../hooks/useInputs';
import useInputsCorrect from '../hooks/useInputsCorrect';
import Words from '../common/Words';
import '../styles/Auth.scss';

const idInformation = [Words.ENTER_ID, Words.ID_CONDITION, Words.ID_CONDITION];
const passwordInformation = [Words.ENTER_PASSWORD, Words.PASSWORD_CONDITION, Words.PASSWORD_CONDITION];
const emailInformation = [Words.ENTER_EMAIL, Words.EMAIL_CONDITION, Words.EMAIL_CONDITION];

function Signup() {
	const dispatch = useComponentVisibilityDispatch();
	const [state, checkInput] = useInputsCorrect({ idCorrect: 1, passwordCorrect: 1, emailCorrect: 1 });
	const { idCorrect, passwordCorrect, emailCorrect } = state;
	const [form, onChange] = useInputs({ id: '', password: '', email: '' });
	const { id, password, email } = form;

	useEffect(() => {
		dispatch({ type: 'INVISIBLE', name: 'headerVisibility' });
		return () => {
			dispatch({ type: 'VISIBLE', name: 'headerVisibility' });
		};
	}, [dispatch]);

	return (
		<div className="auth">
			<div className="auth-form">
				<input className="input" name="id" placeholder={Words.ENTER_ID} value={id} onChange={onChange} onBlur={() => checkInput('idCorrect', id)} />
				{idCorrect < 3 && (
					<>
						<div className={classNames('text', 'auth', 'error-message')} style={{ color: idCorrect === 1 ? 'green' : 'red' }}>
							{idInformation[idCorrect]}
						</div>
					</>
				)}
				<input className="input" type="password" name="password" placeholder={Words.ENTER_PASSWORD} value={password} onChange={onChange} onBlur={() => checkInput('passwordCorrect', password)} />
				{passwordCorrect < 3 && (
					<>
						<div className={classNames('text', 'auth', 'error-message')} style={{ color: passwordCorrect === 1 ? 'green' : 'red' }}>
							{passwordInformation[passwordCorrect]}
						</div>
					</>
				)}
				<input className="input" name="email" value={email} placeholder={Words.ENTER_EMAIL} onChange={onChange} onBlur={() => checkInput('emailCorrect', email)} />
				{emailCorrect < 3 && (
					<>
						<div className={classNames('text', 'auth', 'error-message')} style={{ color: emailCorrect === 1 ? 'green' : 'red' }}>
							{emailInformation[emailCorrect]}
						</div>
					</>
				)}
				<Link to="/login">
					<button className={classNames('button', 'auth', 'basic')} disabled={idCorrect !== 3 || passwordCorrect !== 3 || emailCorrect !== 3}>
						{Words.SIGNUP}
					</button>
				</Link>
			</div>
		</div>
	);
}

export default Signup;
