// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	env: {
		browser: true,
		builtin: true,
		jasmine: true,
		mocha: true,
		node: true,
	},
	extends: ['airbnb-base', 'prettier'],
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module', // es6 import/export
	},
	parser: 'babel-eslint', // class properties
	plugins: ['prettier', 'html'],
	// check if imports actually resolve
	settings: {
		'import/resolver': {
			'webpack': {
				'config': 'build/webpack.base.conf.js'
			}
		}
	},
	// add your custom rules here
	'rules': {
		'prettier/prettier': [
			"error",
			{
				"printWidth": 100,
				"useTabs": true,
				"tabWidth": 2,
				"semi": true,
				"trailingComma": "es5",
				"bracketSpacing": true,
				"singleQuote": true,
				// 'alignObjectProperties': true,
				// 'noSpaceEmptyFn': true,
			}
		],
		'global-require': 0,

		'import/first': 0,

		'no-param-reassign': 0,
		'no-multi-assign': 0,
		// indent using tabs
		'no-tabs': 0,
		'indent': [0, 'tab', {
			'SwitchCase': 1,
			}
		],
		'keyword-spacing': 2,
		'no-mixed-spaces-and-tabs': 2,
		// allow nameless functions
		'func-names': ["error", "never"],
		// allow console messages
		'no-console': ["error", { allow: ["log", "warn", "error"] }],
		// allow variable shadows for specified variables
		"no-shadow": ["error", { "allow": ["state", "getters", "rootState"] }],
		// allow unary operators in the afterthough
		"allowForLoopAfterthoughts": 0,
		// Arrow body style
		"arrow-body-style": ["error", "as-needed"],
		// allow + operator concatenation
		"prefer-template": 0,
		"camelcase": ["error", {properties: "never"}],
		"no-nested-ternary": 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
	}
};
