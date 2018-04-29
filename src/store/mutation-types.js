/**
 * Created by daniel on 29/04/2018.
 */
/* ============
 * Mutation types for the app
 * ============
 *
 * The mutation types that are available
 * on the app.
 */

/**
 * Universal mutation types
 */
export const FETCH_PERMISSIONS = 'FETCH_PERMISSIONS';

/**
 * Auth module mutation types
 */
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const CONFIRM_USER_ACCOUNT = 'CONFIRM_USER_ACCOUNT';
export const UPDATED_AUTH_USER = 'UPDATED_AUTH_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const AUTH_DIALOG_EVENT = 'AUTH_DIALOG_EVENT';

/**
 * Dashboard module mutation types
 */
export const FETCH_SITE_DATA = 'FETCH_SITE_DATA';
