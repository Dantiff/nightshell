/**
 * Created by daniel on 11/01/2018.
 */
import Vue from 'vue';

export const verifyUser = creds => {
	const req = Vue.http.post('/auth/verify', creds);
	return req;
};

export const login = creds => {
	const req = Vue.http.post('api/sessions', { session: creds });
	return req;
};

export const requestSMS = creds => {
	const req = Vue.http.post('/api/sessions', creds);
	return req;
};

export const forgotPassword = payload => {
	const req = Vue.http.post('api/password/forgot', payload);
	return req;
};

export const resetPassword = payload => {
	const req = Vue.http.patch('api/password/reset', { session: payload });
	return req;
};

export const changePassword = payload => {
	const req = Vue.http.post('api/passwords', payload);
	return req;
};

export const confirmUserAccount = payload => {
	const req = Vue.http.patch('api/users/confirm', payload);
	return req;
};

export const checkToken = () => {
	const auth = JSON.parse(localStorage.getItem('auth_user'));
	const req = Vue.http.post('api/sessions/check_token', {
		jwt: { token: auth.attributes.jwt_token },
	});
	return req;
};

export default {
	verifyUser,
	login,
	requestSMS,
	forgotPassword,
	resetPassword,
	changePassword,
	confirmUserAccount,
	checkToken,
};
