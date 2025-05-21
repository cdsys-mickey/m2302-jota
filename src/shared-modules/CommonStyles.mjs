const STYLES = Object.freeze({
	ELLIPSIS: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		wordBreak: "break-all",
	},
	ELLIPSIS_BOX: {
		overflow: "hidden",
	},
	ONE_LINER: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	MSG_WARN: {
		color: "orange",
		fontWeight: "bold",
	},
	MSG_ERROR: {
		backgroundColor: "red",
		color: "white",
		fontWeight: "bold",
	},
	CONSOLE_SUCCESS: "color:rgb(31, 192, 39); font-weight: bold",
	CONSOLE_INFO: "color: #33daff; font-weight: bold",
	CONSOLE_WARN: "color:rgb(255, 201, 51); font-weight: bold",
	CONSOLE_ERROR:
		"background-color:rgb(255, 51, 102); color: white; font-weight: bold",
});

const CommonStyles = {
	...STYLES,
};

export default CommonStyles;
