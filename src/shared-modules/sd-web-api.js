const getErrorFromPayload = (payload, options) => {
	const { stacktrace = false, status } = options || {};
	//try to parse axiosResponse.data as json
	if (!payload && !status) {
		return null;
	}
	let result = {};
	const code = payload?.code || payload?.Code;
	if (code) {
		result["code"] = code;
	}
	result["message"] = payload?.Message || payload?.message;
	result["type"] = payload?.Type || payload?.type;
	if (stacktrace) {
		result["stacktrace"] = payload?.StackTrace || payload?.stacktrace;
	}
	if (status) {
		result["status"] = status;
	}
	return result;
};
const WebApi = {
	getErrorFromPayload,
};

export default WebApi;
