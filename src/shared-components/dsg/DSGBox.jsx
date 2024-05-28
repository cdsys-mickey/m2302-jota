import { Box, styled } from "@mui/material";

const DSGBox = styled(Box, {
	// self props
	shouldForwardProp: (prop) => !["bgcolor", "disableAddRow"].includes(prop),
})(({ theme, bgcolor, disableAddRows }) => ({
	"& .row-selected .dsg-cell-gutter": {
		backgroundColor: bgcolor || theme.palette.primary.main,
		color: theme.palette.getContrastText(
			bgcolor || theme.palette.primary.main
		),
	},
	"& .dsg-cell.line-through": {
		textDecoration: "line-through",
	},
	...(disableAddRows && {
		"& .dsg-add-row .add-control": {
			opacity: 0,
		},
	}),
}));

export default DSGBox;
