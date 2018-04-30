/**
 * Created by daniel on 29/04/2018.
 */
// import Vue from 'vue';
import * as Api from '@/api';
import * as types from '@/store/mutation-types';
import { defaultOutlets } from '@/store/mockData';

const state = {
	fetchingOutlets: false,
	outlets: [],
};

const getters = {
	fetchingOutlets: state => state.fetchingOutlets,

	outlets: state => state.outlets,
};

const mutations = {
	[types.FETCH_OUTLETS](state, payload) {
		state.fetchingOutlets = true;
		Api.getOutlets(payload)
			.then(response => {
				state.fetchingOutlets = false;

				console.log('get outlets response', response);

				state.outlets = [...response.body.data];
			})
			.catch(err => {
				state.fetchingOutlets = false;
				console.log('get outlets error', err);

				// Fake data on fail
				state.outlets = [...defaultOutlets];
			});
	},

	[types.SEARCH_OUTLETS](state, payload) {
		const s = payload.search;
		state.outlets = defaultOutlets.filter(
			o =>
				o.name.toString().includes(s) ||
				o.address.toString().includes(s) ||
				o.phone.toString().includes(s) ||
				o.email.toString().includes(s)
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
