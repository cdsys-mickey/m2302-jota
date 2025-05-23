const DEFAULT_OPTS = {
	always: false,
	prod: false,
};

const getMessage = (prompt, err, opts = DEFAULT_OPTS) => {
	let result = prompt;
	const { always, prod, firstLineOnly = true } = opts;

	if (err?.message && (!prod || always)) {
		result += `: ${
			firstLineOnly ? err.message.split("\n")[0] : err.message
		}`;
	} else if (err?.status) {
		result += `: HTTP ${err.status}`;
	}
	return result;
};

const Errors = {
	getMessage,
};

export default Errors;
