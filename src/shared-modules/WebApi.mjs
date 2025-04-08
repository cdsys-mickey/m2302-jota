import WebApiError from "@/shared-classes/WebApiError";

function isJsonString(str) {
	try {
		JSON.parse(str); // 嘗試解析字串
		return true; // 解析成功，為有效的 JSON 字串
	} catch (e) {
		return false; // 解析失敗，非有效的 JSON 字串
	}
}

const getErrorFromAxiosError = (axiosError) => {
	const webApiError = new WebApiError(axiosError.message);
	webApiError.status = axiosError.response?.status;
	webApiError.statusText = axiosError.response?.statusText;
	webApiError.type = axiosError.name;
	webApiError.stack = axiosError.stack;
	console.log("getErrorFromAxiosError", webApiError);
	return webApiError;
};

const getErrorFromPayload = (payload, opts) => {
	const { withStackTtrace: withStack = false } = opts || {};

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
		stack,
		Stack,
		status,
		statusText,
		Status,
		StatusText,
		data,
		// ...rest
	} = payload;

	// let result = {};
	const error = new WebApiError();

	const _code = code || Code;
	if (_code) {
		error.code = _code;
	}
	const _message = message || Message;
	if (_message) {
		error.message = _message;
	}

	const _type = type || Type;
	if (_type) {
		error.type = _type;
	}

	const _stack = stack || Stack;
	if (withStack && _stack) {
		error.stack = _stack;
	}

	const _status = status || Status || opts?.status;
	if (_status) {
		error.status = _status;
	}
	const _statusText = statusText || StatusText || opts?.statusText;
	if (_statusText) {
		error.statusText = _statusText;
	}

	if (data) {
		error.data = data;
	}

	console.log("getErrorFromPayload", error);
	return error;
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
	const overrideText = mapping[err.status];

	if (err instanceof Error) {
		const { name, message, stack } = err;
		return {
			name,
			message,
			stack,
			...(overrideText && {
				statusText: overrideText,
			}),
		};
	}

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
	getErrorFromAxiosError,
};

export default WebApi;
