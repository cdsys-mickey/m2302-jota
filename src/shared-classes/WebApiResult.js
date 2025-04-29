class WebApiResult {
	constructor({ status, payload, error, headers, stack, ...rest }) {
		this.status = status;
		this.payload = payload;
		this.error = error;
		this.headers = headers;
		this.stack = stack;
		this.extra = rest;

		Object.assign(this, rest);
	}

	toJSON() {
		return {
			status: this.status,
			...(this.payload && {
				payload: this.payload,
			}),
			...(this.error && {
				error: this.error,
			}),
			...(this.headers && {
				headers: this.headers,
			}),
			...(this.stack && {
				stack: this.stack,
			}),
			...this.extra,
		};
	}
}

export default WebApiResult;
