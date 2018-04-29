/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
	// Home
	{
		path: '/home',
		name: 'home.index',
		component: require('@/modules/shared/components/home.vue'),
		meta: { guest: true },
	},

	// Auth
	{
		path: '/login',
		name: 'login.index',
		component: require('@/modules/auth/components/login.vue'),
		meta: { guest: true },
	},
	{
		path: '/logout',
		name: 'logout.index',
		component: require('@/modules/auth/components/logout.vue'),
		meta: { auth: true },
	},
	{
		path: '/forgot-password',
		name: 'forgot.index',
		component: require('@/modules/auth/components/forgotPassword.vue'),
		meta: { guest: true },
	},
	{
		path: '/:tokenId/reset-password',
		name: 'reset.index',
		component: require('@/modules/auth/components/resetPassword.vue'),
		meta: { guest: true },
	},

	// Dashboard
	// {
	// 	path: '/dashboard',
	// 	name: 'dashboard.index',
	// 	component: require('@/modules/dashboard/components/index.vue'),
	// 	meta: { auth: true },
	// },

	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/*',
		redirect: '/login',
	},
];
