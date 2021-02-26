import axios from 'axios';

export async function postLogin(id, password) {
	const response = await axios.post('http://52.78.77.73:8080/user/login', {
		signId: id,
		pwd: password,
	});
	return response.data;
}

export async function getLogout(userToken) {
	const response = await axios.get('http://52.78.77.73:8080/user/logout', {
		header: {
			'X-AUTH-TOKEN': userToken,
		},
	});
	return response.data;
}

export async function postSignup(memberInfo) {
	const signupDt = new Date().toISOString();
	memberInfo.signupDt = signupDt;
	const response = await axios.post('http://52.78.77.73:8080/user/signup', memberInfo);
	return response.data;
}
