class WebApiError extends Error {
	constructor({
		code,
		message,
		status,
		statusText,
		stackTrace,
		type,
		data,
		...rest
	} = {}) {
		super(message);
		this.code = code;
		this.status = status;
		this.statusText = statusText;
		this.stackTrace = stackTrace;
		this.type = type;
		this.data = data;
		this.extra = rest;
		Object.assign(this, rest);
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
			...(this.code && {
				code: this.code,
			}),
			message: this.message,
			status: this.status,
			...(this.stackTrace && {
				stackTrace: this.stackTrace,
			}),
			...(this.type && {
				type: this.type,
			}),
			...(this.data && {
				data: this.data,
			}),
			...this.extra,
		};
	}
}

export default WebApiError;
