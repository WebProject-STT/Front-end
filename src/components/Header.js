import React from 'react';
import { Link } from 'react-router-dom';
import Words from '../common/Words';
import { useUserState } from '../common/UserContext';
import '../styles/Header.scss';

function Header() {
	const { userName } = useUserState();
	return (
		<div className="Header">
			{userName ? (
				<>
					<a>
						{userName}
						{Words.GREETING}
					</a>
					{/* 버튼 클릭시 App 리렌더링하는 방법밖에 모르겠음..그래도 되나? */}
					<button>{Words.SIGNOUT}</button>
				</>
			) : (
				<Link to="/login">{Words.SIGNIN}</Link>
			)}
		</div>
	);
}

export default Header;
