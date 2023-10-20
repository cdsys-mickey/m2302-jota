const STYLES = Object.freeze({
	ELLIPSIS: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	ELLIPSIS_BOX: {
		overflow: "hidden",
	},
	LISTVIEW_OFFTOP_SHADOW: {
		boxShadow: "inset 0px 8px 8px -5px rgb(0 0 0 / 30%)",
	},
	PAPER_OFFTOP_SHADOW: {
		boxShadow:
			"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12), inset 0px 8px 8px -5px rgb(0 0 0 / 30%)",
	},
	BOX_SHADOW_TRANSITION: {
		transition: "box-shadow 0.3s",
	},
	ONE_LINER: {
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
});

const MuiStyles = {
	STYLES,
	...STYLES,
};

export default MuiStyles;
