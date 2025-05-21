const CSS = Object.freeze({
	ELLIPSIS:
		"white-space: nowrap;overflow: hidden;text-overflow: ellipsis;word-break: break-all",
	ELLIPSIS_BOX: "overflow: hidden",
	ONE_LINER: "overflow: hidden;text-overflow: ellipsis;white-space: nowrap",
	CONSOLE_SUCCESS: "color:rgb(31, 192, 39); font-weight: bold",
	CONSOLE_INFO: "color: #33daff; font-weight: bold",
	CONSOLE_WARN: "color:rgb(255, 201, 51); font-weight: bold",
	CONSOLE_ERROR:
		"background-color:rgb(255, 51, 102); color: white; font-weight: bold",
});
const CommonCSS = {
	...CSS,
};

export default CommonCSS;
