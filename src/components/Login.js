import React, { useEffect } from 'react';
import Words from '../common/Words';
import { Link } from 'react-router-dom';
import { useHeaderDispatch } from '../contexts/HeaderContext';
import useInputs from '../hooks/useInputs';
import '../styles/Auth.scss';

function LogIn() {
	const dispatch = useHeaderDispatch();
	const [form, onChange] = useInputs({ id: '', password: '' });
	const { id, password } = form;
	useEffect(() => {
		dispatch({ type: 'INVISIBLE' });
		return () => {
			dispatch({ type: 'VISIBLE' });
		};
	}, [dispatch]);
	return (
		<div className="Auth">
			<b>{Words.LOGIN}</b>
			<input name="id" placeholder={Words.ENTER_ID} value={id} onChange={onChange}></input>
			<input type="password" name="password" placeholder={Words.ENTER_PASSWORD} value={password} onChange={onChange}></input>
			<button>{Words.LOGIN}</button>
			<button>{Words.SOCIAL_LOGIN}</button>
			<span>{Words.ASK_MEMBER}</span>
			<Link to="/join">{Words.JOIN}</Link>
		</div>
	);
}

export default LogIn;
