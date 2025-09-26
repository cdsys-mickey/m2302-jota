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
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": "warn",
		"@typescript-eslint/no-var-requires": "off",
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"], // 針對 TS/TSX 檔案
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
			],
			parserOptions: {
				project: "./tsconfig.json", // 僅在 TS/TSX 中啟用類型檢查
			},
			rules: {
				"react/prop-types": "off",
				"@typescript-eslint/no-unused-vars": "error",
			},
		},
		{
			files: ["*.jsx"], // 針對 JSX 檔案
			parser: "espree", // 使用 JavaScript 解析器
			extends: [
				"eslint:recommended",
				"plugin:react/recommended",
				"plugin:react/jsx-runtime",
				"plugin:react-hooks/recommended",
			],
			rules: {
				"react/prop-types": "off", // 禁用 prop-types
				"@typescript-eslint/*": "off", // 禁用所有 TypeScript 規則
			},
		},
	],
};
