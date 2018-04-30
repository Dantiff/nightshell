/**
 * Created by daniel on 29/04/2018.
 */
// import Vue from 'vue';
import * as Api from '@/api';
import * as types from '@/store/mutation-types';
import { defaultCategories } from '@/store/mockData';

const state = {
	fetchingCategories: false,
	categories: [],
};

const getters = {
	fetchingCategories: state => state.fetchingCategories,

	categories: state => (state.categories.length ? state.categories : defaultCategories),
};

const mutations = {
	[types.FETCH_CATEGORIES](state, payload) {
		state.fetchingCategories = true;
		Api.getCategories(payload)
			.then(response => {
				state.fetchingCategories = false;

				console.log('get categories response', response);

				state.categories = [...response.body.data];
			})
			.catch(err => {
				state.fetchingCategories = false;
				console.log('get categories error', err);

				// Fail: assign store categories to default categories
				state.categories = [...defaultCategories];
			});
	},

	[types.SEARCH_CATEGORIES](state, payload) {
		const s = payload.search;
		state.categories = defaultCategories.filter(
			c =>
				c.name.toString().includes(s) ||
				c.address.toString().includes(s) ||
				c.phone.toString().includes(s) ||
				c.email.toString().includes(s)
		);
	},
};

const actions = {};

export default {
	state,
	getters,
	actions,
	mutations,
};
