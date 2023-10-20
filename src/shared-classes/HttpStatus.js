class HttpStatus {
	constructor(code) {
		if (!code) {
			throw new Error("http status is not specified ");
		}
		this.code = code;
	}

	static from(statusCode) {
		return new HttpStatus(statusCode);
	}

	is2xx() {
		return 2 === Math.floor(this.code / 100);
	}
	is3xx() {
		return 3 === Math.floor(this.code / 100);
	}
	is4xx() {
		return 4 === Math.floor(this.code / 100);
	}
	is5xx() {
		return 5 === Math.floor(this.code / 100);
	}

	get success() {
		return this.is2xx();
	}

	toString = () => {
		return this.code;
	};
}

export default HttpStatus;
