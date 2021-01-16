import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Words from '../common/Words';
import LogoWhite from '../common/icon/LogoWhite.png';
import LogoBlue from '../common/icon/LogoBlue.png';
import { useUserState } from '../contexts/UserContext';
import { useHeaderState } from '../contexts/HeaderContext';
import HeaderButton from './HeaderButton';
import '../styles/Header.scss';
import '../styles/Button.scss';

function Header() {
	const { userName } = useUserState();
	const { headerVisibility } = useHeaderState();
	const blue = '#1a3270';
	const white = '#ffffff';

	return (
		<div className="header" style={{ background: userName ? blue : white }}>
			<Link to={userName ? '/category' : '/'}>
				<div className="logo-area">
					{userName ? <img className="logo-image" src={LogoWhite} /> : <img className="logo-image" src={LogoBlue} />}
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
