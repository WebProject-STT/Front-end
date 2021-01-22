import React, { useEffect } from 'react';
import Words from '../common/Words';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import useInputs from '../hooks/useInputs';
import useInputsCorrect from '../hooks/useInputsCorrect';
import { isEmpty } from '../common/CheckValue';
import GoogleLogo from '../common/icon/GoogleLogo.png';
import NaverLogo from '../common/icon/NaverLogo.png';
import KakaoLogo from '../common/icon/KakaoLogo.png';
import '../styles/Auth.scss';
import '../styles/Text.scss';
import { useUserDispatch } from '../contexts/UserContext';

function LogIn() {
	const visibilityDispatch = useComponentVisibilityDispatch();
	const userdispatch = useUserDispatch();
	const [form, onChange] = useInputs({ id: '', password: '' });
	const { id, password } = form;
	const [state, checkInput] = useInputsCorrect({ idCorrect: 1, passwordCorrect: 1 });
	const { idCorrect, passwordCorrect } = state;

	useEffect(() => {
		visibilityDispatch({ type: 'INVISIBLE', name: 'headerVisibility' });
		return () => {
			visibilityDispatch({ type: 'VISIBLE', name: 'headerVisibility' });
		};
	}, [visibilityDispatch]);

	// api호출해서 입력한 아이디, 비밀번호와 일치하는 유저 있는지 확인
	const checkUser = () => {
		localStorage.setItem('user', id);
		userdispatch({ type: 'CHECK_LOGIN' });
	};

	const confirmInputs = (e) => {
		checkInput('idCorrect', id);
		checkInput('passwordCorrect', password);
		if (isEmpty(id) || isEmpty(password)) {
			e.preventDefault();
		} else {
			checkUser();
		}
	};

	return (
		<div className="auth">
			<div className="auth-form">
				<input className="input" name="id" placeholder={Words.ENTER_ID} value={id} onChange={onChange} />
				{idCorrect === 0 && <div className={classNames('text', 'auth', 'error-message')}>{Words.ENTER_ID}</div>}
				<input className="input" type="password" name="password" placeholder={Words.ENTER_PASSWORD} value={password} onChange={onChange} />
				{passwordCorrect === 0 && <div className={classNames('text', 'auth', 'error-message')}>{Words.ENTER_PASSWORD}</div>}
				<Link to="/postList" onClick={confirmInputs}>
					<button className={classNames('button', 'auth', 'basic')}>{Words.LOGIN}</button>
				</Link>
				<button className={classNames('button', 'auth', 'social')}>
					<img className="social-image" src={GoogleLogo} alt="GoogleLogo" />
					<span className={classNames('text', 'auth', 'social')}>{Words.GOOGLE}</span>
				</button>
				<button className={classNames('button', 'auth', 'social')}>
					<img className="social-image" src={NaverLogo} alt="NaverLogo" />
					<span className={classNames('text', 'auth', 'social')}>{Words.NAVER}</span>
				</button>
				<button className={classNames('button', 'auth', 'social')}>
					<img className="social-image" src={KakaoLogo} alt="KakaoLogo" />
					<span className={classNames('text', 'auth', 'social')}>{Words.KAKAO}</span>
				</button>
				<span className={classNames('text', 'auth', 'go-signup')}>
					{Words.ASK_MEMBER}
					<Link to="/signup">{Words.SIGNUP}</Link>
					{Words.GO}
				</span>
			</div>
		</div>
	);
}

export default LogIn;
