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
	const { userName } = useUserState();
	const categoryDispatch = useCategoryDispatch();
	const { headerVisibility } = useComponentVisibilityState();
	const blue = '#1a3270';
	const white = '#ffffff';

	const setCategory = () => {
		categoryDispatch({ type: 'SET_CATEGORY', value: 1 });
	};

	return (
		<div className="header" style={{ background: userName ? blue : white }}>
			<Link to={userName ? '/postList/1' : '/'} onClick={setCategory}>
				<div className="logo-area">
					{userName ? <img className="logo-image" src={LogoWhite} alt="logo" /> : <img className="logo-image" src={LogoBlue} alt="logo" />}
					<span className={classNames('logo-text')} style={{ color: userName ? white : blue }}>
						{Words.PROJECT_NAME}
					</span>
				</div>
			</Link>
			{headerVisibility && <HeaderButton />}
		</div>
	);
}

export default Header;
