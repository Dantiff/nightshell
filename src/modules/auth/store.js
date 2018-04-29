/**
 * Created by daniel on 10/01/2017.
 */
import Vue from 'vue';
import * as AuthApi from '@/api/AuthApi';
import * as types from '@/store/mutation-types';
import * as ErrorActions from '@/modules/shared/services/errorActions';
import VueNotifications from 'vue-notifications';

const state = {
	loggingIn: true,
	submitLogin: false,
	authUser: JSON.parse(localStorage.getItem('auth_user')),
	changedUser: JSON.parse(localStorage.getItem('changed_user')),
	token: localStorage.getItem('id_token'),
	isAuthenticated: !!localStorage.getItem('id_token'),
	submitForgotPassword: false,
	submitResetPassword: false,
	submitChangePassword: false,
	sessionExpired: false,

	submitUpdateUser: false,
	updateUserErrors: {},

	userAccountConfirmed: false,
	submitConfirmUser: false,
	confirmUserMessage: '',
	authDialog: { open: false, event: '' },
};

const getters = {
	loggingIn: state => state.loggingIn,

	submitLogin: state => state.submitLogin,

	authUser: state => state.authUser,

	changedUser: state => state.changedUser,

	isAuthenticated: state => state.isAuthenticated,

	token: state => state.token,

	submitForgotPassword: state => state.submitForgotPassword,

	submitResetPassword: state => state.submitResetPassword,

	submitChangePassword: state => state.submitChangePassword,

	sessionExpired: state => state.sessionExpired,

	submitUpdateUser: state => state.submitUpdateUser,

	updateUserErrors: state => state.updateUserErrors,

	userAccountConfirmed: state => state.userAccountConfirmed,

	submitConfirmUser: state => state.submitConfirmUser,

	confirmUserMessage: state => state.confirmUserMessage,

	authDialog: state => state.authDialog,
};

const mutations = {
	[types.AUTH_DIALOG_EVENT](state, dialog) {
		state.authDialog = { ...dialog };
	},

	[types.LOGIN](state, creds) {
		state.submitLogin = true;
		state.loginError = '';
		AuthApi.login(creds)
			.then(response => {
				state.submitLogin = false;

				state.isAuthenticated = true;

				state.authUser = { ...response.body.data };

				localStorage.setItem('auth_user', JSON.stringify(response.body.data));

				localStorage.setItem('id_token', state.authUser.attributes.jwt_token);

				if (!state.sessionExpired) {
					VueNotifications.success({ title: 'Login Success!' });
					Vue.router.push({ name: 'dashboard.index' });
				} else {
					VueNotifications.success({ message: 'You have successfully resumed your session' });
					location.reload();
				}

				state.sessionExpired = false;
			})
			.catch(err => {
				if (!state.sessionExpired) {
					state.isAuthenticated = false;
				}
				state.submitLogin = false;
				VueNotifications.error({ title: 'Login Error!', message: err.body.error.message });
			});
	},

	[types.UPDATED_AUTH_USER](state, user) {
		state.authUser = { ...user };

		localStorage.removeItem('auth_user');

		localStorage.setItem('auth_user', JSON.stringify({ ...user }));
	},

	[types.LOGOUT]() {
		localStorage.removeItem('auth_user');
		localStorage.removeItem('id_token');
		localStorage.removeItem('changed_user');
		state.isAuthenticated = false;
		VueNotifications.success({ title: 'Logout successful!' });
		Vue.router.push({ name: 'login.index' });
	},

	[types.FORGOT_PASSWORD](state, payload) {
		state.submitForgotPassword = true;
		state.forgotPasswordError = '';
		AuthApi.forgotPassword(payload)
			.then(() => {
				state.submitForgotPassword = false;
				VueNotifications.success({
					title: 'Request successful!',
					message: 'Password reset instructions sent to email.',
				});
			})
			.catch(err => {
				state.submitForgotPassword = false;
				VueNotifications.error({ title: 'Request failed!', message: err.body.error });
			});
	},

	[types.RESET_PASSWORD](state, payload) {
		state.submitResetPassword = true;
		state.resetPasswordError = '';
		AuthApi.resetPassword(payload)
			.then(() => {
				state.submitResetPassword = false;
				VueNotifications.success({
					title: 'Request successful!',
					message: 'Your new password has been successfully activated',
				});
				Vue.router.push({ name: 'login.index' });
			})
			.catch(err => {
				state.submitResetPassword = false;
				VueNotifications.error({
					title: 'Request failed',
					message: ErrorActions.cleanFormErrors(err.body.errors).reset_password_token,
				});
			});
	},

	[types.CHANGE_PASSWORD](state, payload) {
		state.submitChangePassword = true;
		state.changePasswordError = '';
		AuthApi.changePassword(payload)
			.then(response => {
				state.submitChangePassword = false;
				VueNotifications.success({
					title: 'Request successful!',
					message: 'Your new password has been successfully activated',
				});
				Vue.store.commit('AUTH_DIALOG_EVENT', { open: false, event: '' });
				state.changedUser = response.body.data;
				localStorage.removeItem('changed_user');
				localStorage.setItem('changed_user', JSON.stringify(state.changedUser));
			})
			.catch(err => {
				state.submitChangePassword = false;
				VueNotifications.error({ title: 'Request failed!', message: err.body.error });
			});
	},

	[types.CONFIRM_USER_ACCOUNT](state, payload) {
		state.submitConfirmUser = true;
		state.confirmUserMessage = '';
		state.userAccountConfirmed = false;
		AuthApi.confirmUserAccount(payload)
			.then(() => {
				state.submitConfirmUser = false;
				state.userAccountConfirmed = true;
				state.confirmUserMessage = 'Your account has been successfully confirmed';
				VueNotifications.success({
					title: 'Request successful!',
					message: 'Your account has been successfully confirmed',
				});
			})
			.catch(err => {
				state.submitConfirmUser = false;
				state.userAccountConfirmed = false;
				state.confirmUserMessage = ErrorActions.cleanFormErrors(err.body.errors).confirmation_token;
				VueNotifications.error({
					title: 'Request failed!',
					message: 'Failed to confirm user account',
				});
			});
	},

	[types.CHECK_TOKEN](state) {
		AuthApi.checkToken()
			.then(response => {
				state.sessionExpired = true;
				console.log('Check token success response', response);
			})
			.catch(() => {});
	},

	[types.INVALID_TOKEN](state) {
		state.sessionExpired = true;
		state.isAuthenticated = false;
		Vue.router.push({ name: 'logout.index' });
	},
};

const actions = {
	verifyUser({ commit }, creds) {
		commit('VERIFY_USER', creds);
	},
	login({ commit }, creds) {
		commit('LOGIN', creds);
	},
	checkToken({ commit }) {
		commit('CHECK_TOKEN');
	},
	invalidToken({ commit }) {
		commit('INVALID_TOKEN');
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
