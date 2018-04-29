/**
 * Created by daniel on 29/04/2018.
 */
// import Vue from 'vue';
import * as Api from '@/api';
import * as types from '@/store/mutation-types';

const state = {
	fetchingProducts: false,
	products: [],
};

const getters = {
	fetchingProducts: state => state.fetchingProducts,

	products: state => state.products,
};

const mutations = {
	[types.FETCH_PRODUCTS](state, payload) {
		state.fetchingProducts = true;
		Api.getProducts(payload)
			.then(response => {
				state.fetchingProducts = false;

				console.log('get products response', response);

				state.products = [...response.body.data];
			})
			.catch(err => {
				state.fetchingProducts = false;
				console.log('get products error', err);
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
