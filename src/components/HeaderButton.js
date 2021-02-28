import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import { useUserState, useUserDispatch } from '../contexts/UserContext';
import Words from '../common/Words';
import '../styles/Header.scss';
import '../styles/Button.scss';

function HeaderButton() {
	const { userToken, userName } = useUserState();
	const userDispatch = useUserDispatch();

	const handleLogout = async (e) => {
		localStorage.clear();
		userDispatch({ type: 'LOGOUT' });
		try {
			await axios
				.get('http://52.78.77.73:8080/user/logout', {
					header: {
						'X-AUTH-TOKEN': userToken,
					},
				})
				.then((response) => {
					alert(Words.SUCCESS_LOGOUT);
				});
		} catch (error) {
			alert(`${error}${Words.REPORT_ERROR}`);
			e.preventDefault();
		}
	};

	return (
		<div className="button-area">
			{userName ? (
				<>
					<span className={classNames('text', 'white', 'user')}>
						{userName}
						{Words.GREETING}
					</span>
					<Link to="/">
						<button className={classNames('button', 'header', 'white')} onClick={handleLogout}>
							<span className={classNames('button-text', 'logout')}>{Words.LOGOUT}</span>
						</button>
					</Link>
				</>
			) : (
				<>
					<Link className={classNames('button', 'header', 'white')} role="button" to="/login">
						<div className={classNames('button-text', 'login')}>{Words.LOGIN}</div>
					</Link>
					<Link className={classNames('button', 'header', 'blue')} role="button" to="/signup">
						<div className={classNames('button-text', 'signup')}>{Words.SIGNUP}</div>
					</Link>
				</>
			)}
		</div>
	);
}

export default HeaderButton;
