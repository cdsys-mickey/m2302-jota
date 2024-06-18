import { Box, styled } from "@mui/material";
import DSG from "@/shared-modules/sd-dsg";
import { cyan, lightBlue } from "@mui/material/colors";

const DSGBox = styled(Box, {
	// self props
	shouldForwardProp: (prop) => !["bgcolor", "disableAddRow"].includes(prop),
})(({ theme, groupColor = cyan[700], disableAddRows }) => ({
	[`& .${DSG.CssClasses.ROW_SELECTED} .dsg-cell-gutter`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.getContrastText(theme.palette.primary.main),
	},
	[`& .dsg-row.${DSG.CssClasses.GROUP_ROW} .dsg-cell`]: {
		backgroundColor: groupColor,
		color: theme.palette.getContrastText(groupColor),
	},
	[`& .dsg-row.${DSG.CssClasses.GROUP_ROW} .dsg-cell input`]: {
		color: theme.palette.getContrastText(groupColor),
	},
	[`& .dsg-cell.${DSG.CssClasses.LINE_THROUGH} *`]: {
		textDecoration: "line-through",
	},
	[`& .dsg-cell.${DSG.CssClasses.RED} *`]: {
		color: "red",
	},
	[`& .dsg-cell.${DSG.CssClasses.STAR} input`]: {
		padding: "0 12px",
		fontSize: "xx-large",
		marginTop: "12px",
		color: theme.palette.secondary.main,
	},
	...(disableAddRows && {
		"& .dsg-add-row .add-control": {
			opacity: 0,
		},
	}),
}));

export default DSGBox;
