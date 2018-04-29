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

	// Outlets
	{
		path: '/outlets',
		name: 'outlets.index',
		component: require('@/modules/outlet/components/index.vue'),
		meta: { auth: true },
	},

	// Categories
	{
		path: '/:outlet/categories',
		name: 'categories.index',
		component: require('@/modules/category/components/index.vue'),
		meta: { auth: true },
	},

	// Products
	{
		path: '/:outlet/:category/products',
		name: 'products.index',
		component: require('@/modules/product/components/index.vue'),
		meta: { auth: true },
	},

	// Make sales
	// {
	// 	path: '/sales',
	// 	name: 'sales.index',
	// 	component: require('@/modules/sale/components/index.vue'),
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
