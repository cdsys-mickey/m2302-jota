const getErrorFromPayload = (payload, options) => {
	const { withStackTtrace = false } = options || {};

	if (!payload) {
		const { status, statusText } = options;

		return {
			...(status && {
				status,
			}),
			...(statusText && {
				statusText,
			}),
		};
	}
	const {
		code,
		Code,
		message,
		Message,
		type,
		Type,
		stackTrace,
		StackTrace,
		status,
		statusText,
		Status,
		StatusText,
		...rest
	} = payload;

	let result = {};
	const codeValue = code || Code;
	if (codeValue) {
		result["code"] = codeValue;
	}
	result["message"] = message || Message;
	result["type"] = type || Type;

	const stacktraceValue = stackTrace || StackTrace;
	if (withStackTtrace && stacktraceValue) {
		result["stackTrace"] = stacktraceValue;
	}
	const statusValue = status || Status || options?.status;
	if (statusValue) {
		result["status"] = statusValue;
	}
	const statusTextValue = statusText || StatusText || options?.statusText;
	if (statusValue) {
		result["statusText"] = statusTextValue;
	}
	return {
		...result,
		...rest,
	};
};

const mapStatusText = (err, mapping) => {
	if (err instanceof Error) {
		const { name, message, stack } = err;
		return {
			name,
			message,
			stack,
		};
	}

	const overrideText = mapping[err.status];
	const result = {
		...err,
		...(overrideText && {
			statusText: overrideText,
		}),
	};
	console.log("result", result);
	return result;
};

const WebApi = {
	getErrorFromPayload,
	mapStatusText,
};

export default WebApi;
