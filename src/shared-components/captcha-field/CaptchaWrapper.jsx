import { styled } from "@mui/material/styles";

const CaptchaWrapper = styled("div")(({ theme }) => ({
	".rnc": {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		maxWidth: 255,
		borderRadius: 4,
		padding: 4,
		boxSizing: "border-box",
		border: `1px solid ${theme.palette.divider}`,
	},
	// ".rnc:has(.rnc-input:focus)": {
	// 	padding: 3,
	// },
	".rnc-row": {
		display: "flex",
		alignItems: "stretch",
		marginBottom: 10,
	},

	".rnc-column": {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		marginLeft: 10,
	},

	".rnc-canvas": {
		boxSizing: "border-box",
		backgroundColor: "transparent",
		borderRadius: 4,
	},

	".rnc-button": {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 16,
		background: theme.palette.background.paper,
		color: "inherit",
		padding: 0,
		width: 25,
		height: 20,
		boxSizing: "border-box",
		borderRadius: 4,
		cursor: "pointer",
		border: `1px solid ${theme.palette.divider}`,
		"&:hover": {
			backgroundColor: theme.palette.action.hover,
		},
		"& svg": {
			width: "1em",
			height: "1em",
			fill: "currentColor",
		},
	},

	".rnc-input": {
		padding: "0 11px",
		height: 32,
		borderRadius: 4,
		fontSize: 14,
		color: theme.palette.text.primary,
		border: `1px solid ${theme.palette.divider}`,
	},
	".rnc-input:focus": {
		outline: `2px solid ${theme.palette.primary.main}`,
	}
}));

export default CaptchaWrapper;
