/**
 * Created by daniel on 26/08/2017.
 */
// import Vue from 'vue';
import * as DashboardApi from '@/api/AuthApi';
import * as types from '@/store/mutation-types';

const state = {
	fetchingSiteData: false,
	siteData1: [],
	siteData2: {
		phone_call: [],
		meeting: [],
		email: [],
		news: [],
	},
	siteData3: [],
	siteData4: [],
};

const getters = {
	fetchingSiteData: state => state.fetchingSiteData,

	siteData1: state => state.siteData1,

	siteData2: state => state.siteData2,

	siteData3: state => state.siteData3,

	siteData4: state => state.siteData4,
};

const mutations = {
	[types.FETCH_SITE_DATA](state, payload) {
		state.fetchingSiteData = true;
		DashboardApi.fetchSiteData(payload)
			.then(response => {
				state.fetchingSiteData = false;

				// Data for chartOne
				state.siteData1 = Object.keys({ ...response.body.tag_cloud }).map(i => ({
					name: i,
					weight: response.body.tag_cloud[i],
				}));

				// Data for chart 2
				state.siteData2 = { ...response.body.engagements };

				// Data for chart 3
				state.siteData3 = Object.entries({ ...response.body.metrics });

				// Data for chart 4
				state.siteData4 = [...response.body.activities].map(d => ({
					name: d.event,
					y: d.activities,
				}));
			})
			.catch(() => {
				state.fetchingSiteData = false;
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
