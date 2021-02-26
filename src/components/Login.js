import React, { useState, useEffect } from 'react';
import Words from '../common/Words';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import useInputs from '../hooks/useInputs';
import useAsync from '../hooks/useAsync';
import useInputsCorrect from '../hooks/useInputsCorrect';
import { postLogin } from '../api/MemberAPI';
import { isEmpty } from '../common/CheckValue';
import GoogleLogo from '../icon/GoogleLogo.png';
import NaverLogo from '../icon/NaverLogo.png';
import KakaoLogo from '../icon/KakaoLogo.png';
import '../styles/Auth.scss';
import '../styles/Text.scss';
import { useUserDispatch } from '../contexts/UserContext';

function LogIn({ history }) {
	const visibilityDispatch = useComponentVisibilityDispatch();
	const userdispatch = useUserDispatch();
	const [form, onChange] = useInputs({ id: '', password: '' });
	const { id, password } = form;
	const [inputState, checkInput] = useInputsCorrect({ idCorrect: 1, passwordCorrect: 1 });
	const { idCorrect, passwordCorrect } = inputState;
	const [postLoginState, postLoginRefetch, postLoginChangeFetchEnd] = useAsync(() => postLogin(id, password), [id], true);
	const { loading, data, error, fetchEnd } = postLoginState;
	const [loginErrorState, setLoginError] = useState({ loginSuccess: true });
	const { loginSuccess } = loginErrorState;

	useEffect(() => {
		visibilityDispatch({ type: 'INVISIBLE', name: 'headerVisibility' });
		return () => {
			visibilityDispatch({ type: 'VISIBLE', name: 'headerVisibility' });
		};
	}, [visibilityDispatch]);

	if (fetchEnd) {
		if (!data) {
			setLoginError({ ...loginErrorState, loginSuccess: data });
		} else {
			const { id, name } = data;
			localStorage.setItem('userToken', id);
			localStorage.setItem('userName', name);
			userdispatch({ type: 'LOGIN', userToken: id, userName: name });
			history.push('/postlist/0');
		}
		postLoginChangeFetchEnd();
	}

	const confirmInputs = () => {
		checkInput('idCorrect', id);
		checkInput('passwordCorrect', password);
		if (!isEmpty(id) && !isEmpty(password)) {
			postLoginRefetch();
		}
	};

	const getErrorText = () => {
		if (passwordCorrect === 0) {
			return <div className={classNames('text', 'auth', 'error-message')}>{Words.ENTER_PASSWORD}</div>;
		} else if (!loginSuccess) {
			return <div className={classNames('text', 'auth', 'error-message')}>{Words.REPORT_ID_PASSWORD_ERROR}</div>;
		}
	};

	return (
		<div className="auth">
			<div className="auth-form">
				<input className="input" name="id" placeholder={Words.ENTER_ID} value={id} maxLength="20" onChange={onChange} />
				{idCorrect === 0 && <div className={classNames('text', 'auth', 'error-message')}>{Words.ENTER_ID}</div>}
				<input className="input" type="password" name="password" placeholder={Words.ENTER_PASSWORD} value={password} onChange={onChange} />
				{getErrorText()}
				<button className={classNames('button', 'auth', 'basic')} onClick={confirmInputs}>
					<span className={classNames('text', 'white', 'auth')}>{Words.LOGIN}</span>
				</button>

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
					<Link to="/signup" style={{ color: 'purple' }}>
						{Words.SIGNUP}
					</Link>
					{Words.GO}
				</span>
			</div>
		</div>
	);
}

export default LogIn;
