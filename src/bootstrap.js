/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application.
 */

/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue';

window.Vue = Vue;

Vue.config.debug = process.env.NODE_ENV !== 'production';

/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-Router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
import VuexRouterSync from 'vuex-router-sync';
import store from '@/store';

Vue.store = store;

/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

export const router = new VueRouter({
	mode: 'history',
	hashbang: false,
	linkActiveClass: 'active',
	routes,
});

router.mode = 'html5';

router.beforeEach((to, from, next) => {
	if (to.matched.some(m => m.meta.auth) && !store.state.auth.isAuthenticated) {
		/*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
		next({
			name: 'login.index',
		});
	} else if (to.matched.some(m => m.meta.guest) && store.state.auth.isAuthenticated) {
		/*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
		next({
			name: 'dashboard.index',
		});
	} else {
		next();
	}
});
VuexRouterSync.sync(store, router);

Vue.router = router;

/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js.
 *
 * https://kazupon.github.io/vue-i18n/
 */
import VueI18n from 'vue-i18n';
import messages from '@/modules/shared/locale';

Vue.use(VueI18n);

export const i18n = new VueI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages,
});

/* ============
 * jQuery
 * ============
 *
 * Require jQuery
 *
 * http://jquery.com/
 */
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

/* ============
 * Material UI Form Validation: VeeValidate
 * ============
 *
 * Require VeeValidate.
 *
 * https://www.npmjs.com/package/vee-validate
 */
import VeeValidate, { Validator } from 'vee-validate';

const config = {
	errorBagName: 'errors', // change if property conflicts.
	fieldsBagName: 'fields',
	delay: 0,
	locale: 'en',
	dictionary: null,
	strict: true,
	enableAutoClasses: false,
	classNames: {
		touched: 'touched', // the control has been blurred
		untouched: 'untouched', // the control hasn't been blurred
		valid: 'valid', // model is valid
		invalid: 'invalid', // model is invalid
		pristine: 'pristine', // control has not been interacted with
		dirty: 'dirty', // control has been interacted with
	},
	events: 'input|blur',
	inject: true,
};

Vue.use(VeeValidate, config);

Validator.extend('passwordConfirmation', {
	getMessage(field, [password, value]) {
		return value === password || 'Passwords do not match';
	},
	validate(value, [password]) {
		if (value === undefined || value === null) {
			return false;
		}
		return value === password;
	},
});

/* ============
 * Styling
 * ============
 *
 * Require the application styling.
 * Stylus is used for this boilerplate.
 *
 * If you don't want to use Stylus, that's fine!
 * Replace the stylus directory with the CSS preprocessor you want.
 * Require the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://stylus-lang.com/
 */
require('./app.styl');

/* ============
 * Material UI: Vuetify
 * ============
 *
 * Require vuetify.
 *
 * https://vuetifyjs.com/
 */
import Vuetify from 'vuetify';

Vue.use(Vuetify);

/* ============
 * Lodash
 * ============
 *
 * Require Lodash globally.
 */
import lodash from 'lodash';

window._ = lodash;

// Include Plugin in project
import VueNotifications from 'vue-notifications';

// Include mini-toaster (or any other UI-notification library
import miniToastr from 'mini-toastr';

// If using mini-toastr, provide additional configuration
const toastTypes = {
	success: 'success',
	error: 'error',
	info: 'info',
	warn: 'warn',
};
miniToastr.setIcon('error', 'i', { class: 'fa fa-warning' });
miniToastr.setIcon('info', 'i', { class: 'fa fa-info-circle' });
miniToastr.setIcon('success', 'i', { class: 'fa fa-check-circle-o' });
miniToastr.setIcon('warn', 'i', { class: 'fa fa-warning' });
miniToastr.init({ types: toastTypes });

// Here we setup messages output to `mini-toastr`
function toast({ title, message, type, timeout, cb }) {
	return miniToastr[type](title, message, timeout, cb);
}

// Binding for methods .success(), .error() and etc. You can specify and map your own methods here.
// Required to pipe our output to UI library (mini-toastr in example here)
// All not-specified events (types) would be piped to output in console.
const options = {
	success: toast,
	error: toast,
	info: toast,
	warn: toast,
};
VueNotifications.config.timeout = 8000;
// Activate plugin
Vue.use(VueNotifications, options);

/**
 * Setup vue-highcharts
 */
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';

// load these modules as your need
import loadStock from 'highcharts/modules/stock';
import loadMap from 'highcharts/modules/map';
import loadDrilldown from 'highcharts/modules/drilldown';
// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import loadHighchartsMore from 'highcharts/highcharts-more';
import loadSolidGauge from 'highcharts/modules/solid-gauge';
import wordCloud from 'highcharts/modules/wordcloud';
import variablePie from 'highcharts/modules/variable-pie';

loadStock(Highcharts);
loadMap(Highcharts);
loadDrilldown(Highcharts);
loadHighchartsMore(Highcharts);
loadSolidGauge(Highcharts);
variablePie(Highcharts);
wordCloud(Highcharts);

// Now you can use Highstock, Highmaps, drilldown and solid gauge.
Vue.use(VueHighcharts, { Highcharts });

/**
 * Setup vue-google-maps
 */
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBD-HS_7rOrfHc3O6hgTyBk31rUAnwD78o',
		libraries: 'places,drawing,visualization', // This is required if you use the Autocomplete plugin
		// OR: libraries: 'places,drawing'
		// OR: libraries: 'places,drawing,visualization'
		// (as you require)
	},
});

/**
 * Setup VueScrollTo
 */
const VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo);
// You can also pass in the default options
Vue.use(VueScrollTo, {
	container: 'body',
	duration: 500,
	easing: 'ease',
	offset: 0,
	cancelable: true,
	onDone: false,
	onCancel: false,
	x: false,
	y: true,
});

/**
 * Setup vue-resource
 */
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
	// eslint-disable-next-line
  request.headers.set('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));
	request.headers.set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
	next();
});
Vue.http.options.root = process.env.API_LOCATION;
// Logout of token has error
Vue.http.interceptors.push((request, next) => {
	next(response => {
		if (response.status === 419) {
			VueNotifications.warn({
				message: 'Your session is Expired. Please enter password to proceed',
			});
			store.dispatch('invalidToken');
		}
		if (response.status === 403) {
			VueNotifications.warn({
				title: 'Request failed!',
				message: 'You do not have permission to perform this action',
			});
		}
		if (response.status === 401) {
			try {
				localStorage.removeItem('auth_user');
				localStorage.removeItem('id_token');
				store.state.isAuthenticated = false;
			} catch (err) {
				console.log(err);
			}
		}
	});
});

/**
 * Check token validity
 */
// store.dispatch('checkToken');

export default {
	router,
	i18n,
};
