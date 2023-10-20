const getMessage = (s, err, options) => {
	let result = s;
	const { always } = options || { always: false };
	const prod = import.meta.env.VITE_PROFILE === "prod";
	if (err?.message && (!prod || always)) {
		result += `: ${err.message}`;
	}
	return result;
};

const Errors = {
	getMessage,
};

export default Errors;
