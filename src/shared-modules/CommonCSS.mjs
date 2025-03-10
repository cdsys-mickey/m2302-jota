const CSS = Object.freeze({
	ELLIPSIS:
		"white-space: nowrap;overflow: hidden;text-overflow: ellipsis;word-break: break-all",
	ELLIPSIS_BOX: "overflow: hidden",
	ONE_LINER: "overflow: hidden;text-overflow: ellipsis;white-space: nowrap",
	MSG_SUCCESS: "color: green; font-weight: bold",
	MSG_INFO: "color: blue; font-weight: bold",
	MSG_WARN: "color: orange; font-weight: bold",
	MSG_ERROR: "background-color: red; color: white; font-weight: bold",
});
const CommonCSS = {
	...CSS,
};

export default CommonCSS;
