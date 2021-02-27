import React, { useEffect } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import useInputs from '../hooks/useInputs';
import useInputsCorrect from '../hooks/useInputsCorrect';
import Words from '../common/Words';
import '../styles/Auth.scss';

const idInformation = [Words.ENTER_ID, Words.ID_CONDITION, Words.ID_CONDITION];
const passwordInformation = [Words.ENTER_PASSWORD, Words.PASSWORD_CONDITION, Words.PASSWORD_CONDITION];
const emailInformation = [Words.ENTER_EMAIL, Words.EMAIL_CONDITION, Words.EMAIL_CONDITION];

function Signup({ history }) {
	const dispatch = useComponentVisibilityDispatch();
	const [state, checkInput] = useInputsCorrect({ idCorrect: 1, passwordCorrect: 1, emailCorrect: 1 });
	const { idCorrect, passwordCorrect, emailCorrect } = state;
	const [form, onChange] = useInputs({ signId: '', pwd: '', email: '', name: '' });
	const { signId, pwd, email, name } = form;
	const availableSignup = idCorrect !== 3 || passwordCorrect !== 3 || emailCorrect !== 3;

	useEffect(() => {
		dispatch({ type: 'INVISIBLE', name: 'headerVisibility' });
		return () => {
			dispatch({ type: 'VISIBLE', name: 'headerVisibility' });
		};
	}, [dispatch]);

	const handleSignUp = () => {
		const signupDt = new Date().toISOString();
		form.signupDt = signupDt;
		axios
			.post('http://52.78.77.73:8080/user/signup', form)
			.then((response) => {
				if (response.data === -1) {
					alert(Words.DUPLICATE_ID);
				} else {
					alert(Words.SUCCESS_SIGNUP);
					history.push('/login');
				}
			})
			.catch((error) => {
				alert(`${error}${Words.REPORT_ERROR}`);
			});
	};

	return (
		<div className="auth-form">
			<input className="input" name="signId" placeholder={Words.ENTER_ID} value={signId} maxLength="20" onChange={onChange} onBlur={() => checkInput('idCorrect', signId)} />
			{idCorrect < 3 && (
				<>
					<div className={classNames('text', 'auth', 'error-message')} style={{ color: idCorrect === 1 ? 'green' : 'red' }}>
						{idInformation[idCorrect]}
					</div>
				</>
			)}
			<input className="input" type="password" name="pwd" placeholder={Words.ENTER_PASSWORD} value={pwd} onChange={onChange} onBlur={(e) => checkInput('passwordCorrect', e.target.value)} />
			{passwordCorrect < 3 && (
				<>
					<div className={classNames('text', 'auth', 'error-message')} style={{ color: passwordCorrect === 1 ? 'green' : 'red' }}>
						{passwordInformation[passwordCorrect]}
					</div>
				</>
			)}
			<input className="input" name="email" value={email} placeholder={Words.ENTER_EMAIL} onChange={onChange} onBlur={(e) => checkInput('emailCorrect', e.target.value)} />
			{emailCorrect < 3 && (
				<>
					<div className={classNames('text', 'auth', 'error-message')} style={{ color: emailCorrect === 1 ? 'green' : 'red' }}>
						{emailInformation[emailCorrect]}
					</div>
				</>
			)}
			<input className="input" name="name" value={name} placeholder={Words.ENTER_NICKNAME} onChange={onChange} />

			<button className={classNames('button', 'auth', 'basic')} disabled={availableSignup || !name} onClick={handleSignUp}>
				<span className={classNames('text', 'auth')} style={{ color: availableSignup ? '#d9e3ff' : 'white' }}>
					{Words.SIGNUP}
				</span>
			</button>
		</div>
	);
}

export default Signup;
