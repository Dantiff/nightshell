/**
 * Created by daniel on 29/04/2018.
 */
import Vue from 'vue';
import * as Api from '@/api';
import * as types from '@/store/mutation-types';
import VueNotifications from 'vue-notifications';

const state = {
	loggingIn: true,
	submitLogin: false,
	authUser: JSON.parse(localStorage.getItem('auth_user')),
	isAuthenticated: !!localStorage.getItem('auth_user'),
	submitForgotPassword: false,
	sessionExpired: false,
};

const getters = {
	loggingIn: state => state.loggingIn,

	submitLogin: state => state.submitLogin,

	authUser: state => state.authUser,

	isAuthenticated: state => state.isAuthenticated,

	submitForgotPassword: state => state.submitForgotPassword,

	sessionExpired: state => state.sessionExpired,
};

const mutations = {
	[types.LOGIN](state, payload) {
		state.submitLogin = true;
		Api.registerApp(payload)
			.then(response => {
				state.submitLogin = false;

				state.isAuthenticated = true;

				state.authUser = { ...response.body.data };

				console.log('login success response', response);

				localStorage.setItem('auth_user', JSON.stringify(response.body.data));

				VueNotifications.success({ title: 'Login Success!' });
				Vue.router.push({ name: 'outlet.index' });
			})
			.catch(err => {
				state.isAuthenticated = false;
				state.submitLogin = false;
				console.log('the logon error message', err);
				// VueNotifications.error({ title: 'Login Error!', message: err.body.error.message });
			});
	},

	[types.LOGOUT]() {
		localStorage.removeItem('auth_user');
		state.isAuthenticated = false;
		VueNotifications.success({ title: 'Logout successful!' });
		Vue.router.push({ name: 'login.index' });
	},

	[types.FORGOT_PASSWORD](state) {
		state.submitForgotPassword = true;
		setTimeout(() => {
			state.submitForgotPassword = true;
		}, 2000);
	},
};

const actions = {};

export default {
	state,
	getters,
	actions,
	mutations,
};
