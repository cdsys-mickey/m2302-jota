class WebApiError extends Error {
	constructor({
		code,
		message,
		status,
		statusText,
		stack,
		type,
		data,
		...rest
	} = {}) {
		super(message);
		this.name = "WebApiError";

		this.code = code;
		this.status = status;
		this.statusText = statusText;
		this.stack = stack;
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
			...(this.stack && {
				stack: this.stack,
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
