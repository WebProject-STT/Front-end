import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useUserState, useUserDispatch } from '../contexts/UserContext';
import { getLogout } from '../api/MemberAPI';
import useAsync from '../hooks/useAsync';
import Words from '../common/Words';
import '../styles/Header.scss';
import '../styles/Button.scss';

function HeaderButton() {
	const { userToken, userName } = useUserState();
	const userDispatch = useUserDispatch();
	const [getLogoutState, getLogoutRefetch, getLogoutChangeFetchEnd] = useAsync(() => getLogout(userToken), [], true);
	const { loading, data, error, fetchEnd } = getLogoutState;

	const handleLogout = () => {
		localStorage.clear();
		userDispatch({ type: 'LOGOUT' });
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
