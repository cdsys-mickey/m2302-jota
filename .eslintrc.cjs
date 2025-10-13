module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	settings: {
		react: { version: "18.2" },
		"import/resolver": {
			typescript: {
				project: "./tsconfig.json",
			},
		},
	},
	plugins: ["react-refresh", "@typescript-eslint", "import"],
	rules: {
		"react-refresh/only-export-components": "warn",
		"@typescript-eslint/no-var-requires": "off",
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
			],
			parserOptions: {
				project: "./tsconfig.json",
			},
			rules: {
				"react/prop-types": "off",
				"@typescript-eslint/no-unused-vars": "error",
			},
		},
		{
			files: ["*.jsx"],
			parser: "espree",
			extends: [
				"eslint:recommended",
				"plugin:react/recommended",
				"plugin:react/jsx-runtime",
				"plugin:react-hooks/recommended",
			],
			rules: {
				"react/prop-types": "off",
				"@typescript-eslint/*": "off",
			},
		},
	],
};
