module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			// jsx: true,
		},
	},
	settings: {
		react: {
			version: "detect", // 自動偵測 React 版本（推薦）
		},
	},
	plugins: ["react-refresh"],
	rules: {
		// React Fast Refresh（Vite 專案常用）
		"react-refresh/only-export-components": ["warn"],

		// 常用且合理的規則（可依專案喜好調整）
		// "react/prop-types": "off", // JS 專案通常不用 PropTypes
		"react/react-in-jsx-scope": "off", // React 17+ 不用 import React
		"no-unused-vars": "warn",
		"no-console": "off",
	},

	// 只針對 .jsx 檔案額外調整（可選）
	overrides: [
		{
			files: ["*.jsx"],
			rules: {
				// .jsx 檔案某些規則可以更寬鬆或特別調整
			},
		},
	],
};
