import Vue from 'vue';

export const computeApiScopes = (route, required) => {
	let returnValue = {
		scope: '',
		fingerprint: route.params.fingerprint,
	};

	switch (route.name.split('.')[0]) {
		case 'cases':
			returnValue = {
				scope: 'events',
				fingerprint: route.params.fingerprint,
			};
			break;
		case 'stakeholders':
			returnValue = {
				scope: 'stakeholders',
				fingerprint: route.params.stakeholder,
			};
			break;
		case 'profile':
			returnValue = {
				scope: Vue.store.state.auth.appTokens.type,
				fingerprint: Vue.store.state.auth.appTokens.attributes.fingerprint,
			};
			break;
		default:
			returnValue = { ...returnValue };
			break;
	}
	return required ? returnValue[required] : returnValue;
};

export default {
	computeApiScopes,
};
