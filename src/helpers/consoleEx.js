const consoleEx = {
	// 預設樣式
	defaultStyles: {
		log: "color: black; background: #e0e0e0; padding: 2px 4px; border-radius: 3px;",
		info: "color: white; background: #2196F3; padding: 2px 4px; border-radius: 3px;",
		warn: "color: black; background: #FFCA28; padding: 2px 4px; border-radius: 3px;",
		error: "color: white; background: #D32F2F; padding: 2px 4px; border-radius: 3px;",
		debug: "color: white; background: #4CAF50; padding: 2px 4px; border-radius: 3px;",
	},

	// 核心方法：封裝 console 方法並加上樣式
	_formatMessage(type, message, ...args) {
		const style =
			typeof args[args.length - 1] === "string"
				? args.pop()
				: this.defaultStyles[type] || "";
		console[type](`%c${message}`, style, ...args);
	},

	// 支援的方法
	log(message, ...args) {
		this._formatMessage("log", message, ...args);
	},

	info(message, ...args) {
		this._formatMessage("info", message, ...args);
	},

	warn(message, ...args) {
		this._formatMessage("warn", message, ...args);
	},

	error(message, ...args) {
		this._formatMessage("error", message, ...args);
	},

	debug(message, ...args) {
		this._formatMessage("debug", message, ...args);
	},

	// 允許自訂樣式並傳遞多個參數（保持原有功能）
	styled(type, message, ...args) {
		const style =
			typeof args[args.length - 1] === "string"
				? args.pop()
				: this.defaultStyles[type] || "";
		console[type](`%c${message}`, style, ...args);
	},
};

export default consoleEx;
