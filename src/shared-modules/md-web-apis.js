const getErrorFromPayload = (payload, options) => {
	const { stacktrace = false, status } = options || {};
	//try to parse axiosResponse.data as json
	let result = {};
	if (!payload) return result;
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
const WebApis = {
	getErrorFromPayload,
};

export default WebApis;
