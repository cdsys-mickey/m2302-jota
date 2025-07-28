import DSG from "@/shared-modules/sd-dsg";
import { Box, styled } from "@mui/material";
import { cyan, grey } from "@mui/material/colors";
import PropTypes from "prop-types";

const DSGBoxBase = styled(Box, {
	shouldForwardProp: (prop) => !["bgcolor", "disableAddRow", "dense"].includes(prop),
})(({ theme, groupColor = cyan[700], disableAddRows, dense = true }) => ({
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
	[`& .dsg-add-row *`]: {
		// marginRight: 0,
		// gap: 1
	},
	[`& .dsg-add-row > button`]: {
		// gap: theme.spacing(1)
	},
	...(disableAddRows && {
		"& .dsg-add-row .add-control": {
			opacity: 0,
		},
	}),
	borderTop: "1px solid rgba(0,0,0,0.1)",
	borderLeft: "1px solid rgba(0,0,0,0.1)",
	borderRight: "1px solid rgba(0,0,0,0.25)",
	borderBottom: "1px solid rgba(0,0,0,0.25)",
	...(dense && {
		"& .dsg-add-row": {
			padding: "1px 1px 0 1px"
		},
		"& .dsg-add-row-btn": {
			padding: "4px 10px",
			marginRight: "2px",
			backgroundColor: grey[200]
		}
	})
}));

const DSGBox = (props) => {
	const { ...rest } = props;
	return <DSGBoxBase className="DSGBox" {...rest} />;
}
DSGBox.propTypes = {
	className: PropTypes.string
}
export default DSGBox;
