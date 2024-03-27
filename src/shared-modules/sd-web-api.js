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
	const overrideText = mapping[err.status];
	return {
		...err,
		...(overrideText && {
			statusText: overrideText,
		}),
	};
};

const WebApi = {
	getErrorFromPayload,
	mapStatusText,
};

export default WebApi;
