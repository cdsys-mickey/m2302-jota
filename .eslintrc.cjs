module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended", // 這會啟用 react/prop-types: 'error' 作為預設
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json",
	},
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": "warn",
		"@typescript-eslint/no-var-requires": "off",
		// 移除 'react/prop-types': 'off'，讓它用 React 預設（對 JS 啟用）
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"], // 只針對 TS/TSX 檔案
			rules: {
				"react/prop-types": "off", // 在 TS/TSX 中關閉，避免與 TS 類型重複
				"@typescript-eslint/no-unused-vars": "error",
				// 可以添加其他 TS 專屬規則
			},
		},
	],
};
