/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// Modules
import shared from '@/modules/shared/store';
import auth from '@/modules/auth/store';
import dashboard from '@/modules/dashboard/store';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {};
const getters = {};
const mutations = {};
const actions = {};

export default new Vuex.Store({
	debug: true,
	state,
	getters,
	mutations,
	actions,
	/**
	 * Assign the modules to the store
	 */
	modules: {
		shared,
		auth,
		dashboard,
	},

	/**
	 * If strict mode should be enabled
	 */
	strict: debug,

	/**
	 * Plugins used in the store
	 */
	plugins: debug ? [createLogger()] : [],
});
