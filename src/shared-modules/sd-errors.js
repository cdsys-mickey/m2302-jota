const getMessage = (message, err, options) => {
	let result = message;
	const { always } = options || { always: false };
	const prod = import.meta.env.VITE_PROFILE === "prod";
	if (err?.message && (!prod || always)) {
		result += `: ${err.message}`;
	} else if (err?.status) {
		result += `: ${err.status}`;
	}
	return result;
};

const Errors = {
	getMessage,
};

export default Errors;
