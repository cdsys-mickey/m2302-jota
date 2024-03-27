import { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const DSGBox = memo((props) => {
	const { children, sx = [], bgcolor, ...rest } = props;
	return (
		<Box
			sx={[
				(theme) => ({
					"& .row-selected .dsg-cell-gutter": {
						backgroundColor: bgcolor || theme.palette.primary.main,
						color: theme.palette.getContrastText(
							bgcolor || theme.palette.primary.main
						),
					},
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{children}
		</Box>
	);
});

DSGBox.propTypes = {
	bgcolor: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

DSGBox.displayName = "DSGBox";
export default DSGBox;
