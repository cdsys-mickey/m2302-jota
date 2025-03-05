class WebApiError extends Error {
	constructor({ code, message, status, statusText, stackTrace, type } = {}) {
		super(message);
		this.code = code;
		this.status = status;
		this.statusText = statusText;
		this.stackTrace = stackTrace;
		this.type = type;
	}

	transform(mapping) {
		const overrideText = mapping[this.status];
		if (overrideText) {
			this.statusText = overrideText;
		}
		return this;
	}

	toJSON() {
		return {
			code: this.code,
			message: this.message,
			status: this.status,
			stackTrace: this.stackTrace,
			type: this.type,
		};
	}
}

export default WebApiError;
