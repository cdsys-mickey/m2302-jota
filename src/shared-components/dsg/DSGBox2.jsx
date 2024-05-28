import { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const DSGBox2 = memo((props) => {
	const {
		children,
		disableAddRow = false,
		sx = [],
		bgcolor,
		...rest
	} = props;
	return (
		<Box
			className="dsg-box"
			sx={[
				(theme) => ({
					"& .row-selected .dsg-cell-gutter": {
						backgroundColor: bgcolor || theme.palette.primary.main,
						color: theme.palette.getContrastText(
							bgcolor || theme.palette.primary.main
						),
					},
					"& .dsg-cell.line-through": {
						textDecoration: "line-through",
					},
					...(disableAddRow && {
						"& .dsg-add-row .add-control": {
							opacity: 0,
						},
					}),
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{children}
		</Box>
	);
});

DSGBox2.propTypes = {
	bgcolor: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	disableAddRow: PropTypes.bool,
};

DSGBox2.displayName = "DSGBox2";
export default DSGBox2;
