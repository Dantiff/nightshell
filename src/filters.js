import Vue from 'vue';
import { format, distanceInWordsStrict } from 'date-fns';

Vue.filter('capitalizeWord', value => {
	if (!value) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('capitalizePhrase', value => {
	if (!value) return '';
	value = value.toString();
	return value.replace(/\b[a-z]/g, f => f.toUpperCase());
});

Vue.filter('formatDateHuman', value => {
	if (!value) return '';
	return format(value, 'MMM DD, YYYY');
});

Vue.filter('formatDateHumanFull', value => {
	if (!value) return '';
	return format(value, 'MMMM DD, YYYY');
});

Vue.filter('formatDatePicker', value => {
	if (!value) return '';
	return format(value, 'YYYY-MM-DD');
});

Vue.filter('timeAgo', (value1, value2) => {
	if (!value1 || !value2) return '';
	return distanceInWordsStrict(value1, value2, { addSuffix: true });
});

Vue.filter('maskPhoneNumber', value => {
	if (!value) return '';
	return (
		'+' +
		value
			.toString()
			.match(/.{1,3}/g)
			.join('-')
	);
});
