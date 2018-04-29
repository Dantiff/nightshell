import Vue from 'vue';
import App from './App.vue';
import miniToastr from 'mini-toastr';

require('./bootstrap');
require('./components');
require('./filters');
require('./mixins/global');

// eslint-disable-next-line
new Vue({
	el: '#app',
	mounted() {
		miniToastr.init({ timeout: 6000 });
	},
	render: h => h(App),
});
