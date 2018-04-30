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

	outlets: state => (state.outlets.length ? state.outlets : defaultOutlets),
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
			});
	},
};

const actions = {};

export default {
	state,
	getters,
	actions,
	mutations,
};
