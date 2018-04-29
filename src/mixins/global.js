import Vue from 'vue';
import { format } from 'date-fns';

Vue.mixin({
	methods: {
		capitalizePhrase(string) {
			return string.length ? string.replace(/\b[a-z]/g, f => f.toUpperCase()) : '';
		},
		formatDatePicker(date) {
			if (!date) return '';
			return format(date, 'YYYY-MM-DD');
		},
	},
});
