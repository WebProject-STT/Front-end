import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Words from '../common/Words';
import LogoWhite from '../icon/LogoWhite.png';
import LogoBlue from '../icon/LogoBlue.png';
import { useUserState } from '../contexts/UserContext';
import { useCategoryDispatch } from '../contexts/CategoryContext';
import { useComponentVisibilityState } from '../contexts/ComponentVisibilityContext';
import HeaderButton from './HeaderButton';
import '../styles/Header.scss';
import '../styles/Button.scss';

function Header() {
	const { userToken } = useUserState();
	const categoryDispatch = useCategoryDispatch();
	const { headerVisibility } = useComponentVisibilityState();
	const blue = '#1a3270';
	const white = '#ffffff';

	const setCategory = () => {
		categoryDispatch({ type: 'SET_CURRENT_CATEGORY', value: 0 });
	};

	return (
		<div className="header" style={{ background: userToken ? blue : white }}>
			<Link to={userToken ? '/postList/0' : '/'} onClick={setCategory}>
				<div className="logo-area">
					{userToken ? <img className="logo-image" src={LogoWhite} alt="logo" /> : <img className="logo-image" src={LogoBlue} alt="logo" />}
					<span className={classNames('logo-text')} style={{ color: userToken ? white : blue }}>
						{Words.PROJECT_NAME}
					</span>
				</div>
			</Link>
			{headerVisibility && <HeaderButton />}
		</div>
	);
}

export default Header;
