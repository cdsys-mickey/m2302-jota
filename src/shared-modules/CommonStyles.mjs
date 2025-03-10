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
});

const CommonStyles = {
	...STYLES,
};

export default CommonStyles;
