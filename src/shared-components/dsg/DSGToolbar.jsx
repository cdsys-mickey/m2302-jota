import { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

const DSGToolbar = memo((props) => {
	const { children, sx = [], ...rest } = props;
	return (
		<Box
			sx={[
				(theme) => ({
					"& > *": {
						marginLeft: theme.spacing(3)
					}
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}
		>
			{children}
		</Box>
	);
})

DSGToolbar.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}

DSGToolbar.displayName = "DSGToolbar";
export default DSGToolbar;