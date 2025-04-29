class HttpStatus {
	static #statusMap = {
		// 1XX
		100: "continue",
		// 2XX
		200: "ok",
		201: "created",
		// 3XX
		300: "multipleChoices",
		301: "movedPermanently",
		// 4XX
		400: "badRequest",
		401: "unauthorized",
		403: "forbidden",
		404: "notFound",
		// 5XX
		500: "internalServerError",
	};

	constructor(code) {
		if (!code) {
			throw new Error("http status is not specified ");
		}
		this.code = code;

		// Dynamically create getters
		for (const [status, name] of Object.entries(HttpStatus.#statusMap)) {
			Object.defineProperty(this, name, {
				get: () => this.code === parseInt(status),
			});
		}
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

	get redirectional() {
		return this.is3xx();
	}

	get clientError() {
		return this.is4xx();
	}

	get serverError() {
		return this.is5xx();
	}

	toString = () => {
		return this.code;
	};
}

export default HttpStatus;
