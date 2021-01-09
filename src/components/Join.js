import React, { useEffect } from 'react';
import Words from '../common/Words';
import { Link } from 'react-router-dom';
import { useHeaderDispatch } from '../contexts/HeaderContext';
import useInputs from '../hooks/useInputs';
import '../styles/Auth.scss';

function Join() {
	const dispatch = useHeaderDispatch();
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
			<input name="id" value={id} onChange={onChange} />
			<span>{Words.PASSWORD}</span>
			<input type="password" name="password" value={password} onChange={onChange} />
			<span>{Words.EMAIL}</span>
			<input name="email" value={email} onChange={onChange} />
			<Link to="/login">
				<button>회원가입</button>
			</Link>
		</div>
	);
}

export default Join;
