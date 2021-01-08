import React from 'react';
import { Link } from 'react-router-dom';
import Words from '../common/Words';
import { useUserState } from '../contexts/UserContext';
import { useHeaderState } from '../contexts/HeaderContext';
import '../styles/Header.scss';

function Header() {
	const { userName } = useUserState();
	const { headerVisibility } = useHeaderState();
	if (!headerVisibility) return null;
	return (
		<div className="Header">
			{userName ? (
				<>
					<a>
						{userName}
						{Words.GREETING}
					</a>
					{/* 메인페이지로 이동하고 로그인정보 없애면 됨 */}
					<button>{Words.LOGOUT}</button>
				</>
			) : (
				<Link to="/login">{Words.LOGIN}</Link>
			)}
		</div>
	);
}

export default Header;
