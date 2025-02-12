function isJsonString(str) {
	try {
		JSON.parse(str); // 嘗試解析字串
		return true; // 解析成功，為有效的 JSON 字串
	} catch (e) {
		return false; // 解析失敗，非有效的 JSON 字串
	}
}

const getErrorFromPayload = (payload, opts) => {
	const { withStackTtrace = false } = opts || {};

	if (!payload) {
		const { status, statusText } = opts;

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
	const statusValue = status || Status || opts?.status;
	if (statusValue) {
		result["status"] = statusValue;
	}
	const statusTextValue = statusText || StatusText || opts?.statusText;
	if (statusValue) {
		result["statusText"] = statusTextValue;
	}
	return {
		...result,
		...rest,
	};
};

const getErrorFromStatus = (status, axiosResponse) => {
	return {
		status: status.code,
		message: axiosResponse.data || axiosResponse.statusText,
	};
};

const getErrorFromResponse = (status, axiosResponse, opts) => {
	const payload = axiosResponse.data;
	if (isJsonString(payload)) {
		return getErrorFromPayload(payload, opts);
	} else {
		return getErrorFromStatus(status, axiosResponse, opts);
	}
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
	getErrorFromResponse,
};

export default WebApi;
