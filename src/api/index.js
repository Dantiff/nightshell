/**
 * Created by daniel on 29/04/2018.
 */
import Vue from 'vue';

export const registerApp = payload => {
	const req = Vue.http.post('registerApp', payload);
	return req;
};

export const getProducts = payload => {
	const req = Vue.http.post('office/products/get', payload);
	return req;
};

export const getCategories = payload => {
	const req = Vue.http.post('office/categories/get', payload);
	return req;
};

export const getOutlets = payload => {
	const req = Vue.http.post('office/branches/get', payload);
	return req;
};

export const makeSale = payload => {
	const req = Vue.http.post('office/branches/closesale', payload);
	return req;
};

export default {
	registerApp,
	getProducts,
	getCategories,
	getOutlets,
	makeSale,
};
